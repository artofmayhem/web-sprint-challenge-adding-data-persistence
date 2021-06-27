exports.up = function (knex) {
    return knex.schema
      .createTable("projects", (table) => {
        table.increments("project_id").primary();
        table.string("project_name", 128).notNullable();
        table.string("project_description", 255);
        table.integer("project_completed").defaultTo(false);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table.timestamp("updated_at").defaultTo(knex.fn.now());
      })
      .createTable("resources", (table) => {
        table.increments("resource_id").primary();
        table.string("resource_name", 128).notNullable().unique();
        table.string("resource_description");
      })
      .createTable("tasks", (table) => {
        table.increments("task_id").primary();
        table.string("task_description", 128).notNullable();
        table.string("task_notes", 255);
        table.integer("task_completed").defaultTo(0);
        table
          .integer("project_id")
          .unsigned()
          .notNullable()
          .references("project_id")
          .inTable("projects")
          .onDelete("RESTRICT")
          .onUpdate("RESTRICT");
      })
    //   .createTable("project_resources", (table) => {
    //     table.increments("project_resources_id");
    //     table
    //       .integer("project_id")
    //       .unsigned()
    //       .notNullable()
    //       .references("project_id")
    //       .inTable("projects")
    //       .onDelete("RESTRICT");
    //     table
    //       .integer("resource_id")
    //       .unsigned()
    //       .notNullable()
    //       .references("resource_id")
    //       .inTable("resources")
    //       .onDelete("RESTRICT");
    //   });
  };
  
  exports.down = function (knex) {
    return knex.schema
      .dropTableIfExists('projects_resources')
      .dropTableIfExists("tasks")
      .dropTableIfExists("resources")
      .dropTableIfExists("projects");
  };
  