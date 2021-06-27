// build your `Project` model here
const db = require("../../data/dbConfig");

//unsure whether to attempt boolean converter here or in router !!!!
const booleanConverterDown = (project) => {
  console.log(
    "incoming task state prior to conversion",
    project.project_completed
  );
  project.project_completed = project.project_completed ? true : false; // FIXES #4 Issue
  console.log(
    "task completed state post conversion",
    project.project_completed
  );
  return project;
};

const booleanConverterUp = (project) => {
    console.log("incoming project state prior to conversion", project.project_completed)
    project.project_completed = (project.project_completed ? 1 : 0 )
    console.log("project completed state post conversion", project.project_completed)
    return project
}

//TEST FAIL ISSUE LOG
// × [2] each project contains project_name, project_description and project_completed (as a boolean) (118 ms)


function getAll() {
  return db("projects").then((projects) => {
    projects.forEach((project) => {
      booleanConverterDown(project);
    });
    return projects;
  });
}

const getById = (id) => {
  const projects = db("projects") //Provide promise
    .where("project_id", id)
    .first();
  return projects.then((project) => {
    //converts singular project into integer value
    console.log("incoming project state value", project);
    return booleanConverterDown(project);
  });
};

//TEST FAIL ISSUE LOG
// × [4] responds with the newly created project with its project_completed as a boolean (86 ms)   
const create = async (newProject) => {
    newProject = booleanConverterUp(newProject)
  const [id] = await db("projects") //Provide promise
  .insert(newProject);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
};

// NOW WORKING BOOLEAN CONVERTER

//Location: https://stackoverflow.com/questions/7820683/convert-boolean-result-into-number-integer

//Logic: Best answer. Why? This works on truthiness which is more general and accepts any type (string, number, etcetera.) The unary answer is clever indeed, but if I pass it a string it returns NaN. So if you want L33T and guarantee the input, go urary, otherwise methinks the ternary + truthy test is best.

//Logical Conclusion: 

// const booleanConverterDown = (task) => {
//     console.log("incoming task state prior to conversion", task.task_completed)
//     task.task_completed = (task.task_completed ? 1 : 0)
//     console.log("task completed state post conversion", task.task_completed)
//     return task

// }

// const booleanConverterUp = (task) => {
//     console.log("incoming task state prior to conversion", task.task_completed)
//     task.task_completed = (task.project_completed ? 1 : 0 )
//     console.log("task completed state post conversion", task.task_completed)
//     return task
// }


//TEST DEBUG RESULTS

// ● server.js › projects endpoints › [GET] /api/projects › [2] each project contains project_name, project_description and project_completed (as a boolean) 

// expect(received).toMatchObject(expected)        

// - Expected  - 1
// + Received  + 1

//   Object {
// -   "project_completed": false,
// +   "project_completed": 1,
//     "project_description": "Build APIs",        
//     "project_name": "Web API",
//   }

//   54 |       test('[2] each project contains project_name, project_description and project_completed (as a boolean)', async () => {
//   55 |         const res = await request(server).get('/api/projects')
// > 56 |         expect(res.body[0]).toMatchObject({ ...projectA, project_completed: false })
//      |                             ^
//   57 |         expect(res.body[1]).toMatchObject({ ...projectB, project_completed: true })
//   58 |       }, 750)
//   59 |     })

//   at Object.<anonymous> (codegrade_mvp.test.js:56:29)

// ● server.js › projects endpoints › [POST] /api/projects › [4] responds with the newly created project 
// with its project_completed as a boolean

// expect(received).toMatchObject(expected)        

// - Expected  - 1
// + Received  + 1

//   Object {
// -   "project_completed": false,
// +   "project_completed": 0,
//     "project_description": "Build APIs",        
//     "project_name": "Web API",
//   }

//   71 |       test('[4] responds with the newly created project with its project_completed as a boolean', async () => {
//   72 |         let res = await request(server).post('/api/projects').send(projectA)
// > 73 |         expect(res.body).toMatchObject({ 
// ...projectA, project_completed: false })
//      |                          ^
//   74 |         res = await request(server).post('/api/projects').send(projectB)
//   75 |         expect(res.body).toMatchObject({ 
// ...projectB, project_completed: true })
//   76 |         res = await request(server).post('/api/projects').send(projectC)

//   at Object.<anonymous> (codegrade_mvp.test.js:73:26)
