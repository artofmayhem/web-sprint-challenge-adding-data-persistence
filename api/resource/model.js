// build your `Resource` model here
const db = require("../../data/dbConfig");

const getAll = () => {
  return db("resources");
};

const getById = (id) => {
  return db("resources").where("resource_id", id).first();
};

const create = async (createdResource) => {
  const [id] = await db("resources").insert(createdResource);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
};
