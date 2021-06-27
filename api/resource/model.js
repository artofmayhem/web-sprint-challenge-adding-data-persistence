// build your `Resource` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db('resources')
}

const getById = (id) => {
    return db('resources')
    .where('resource_id', id)
    .first()
}

const create = async(project_id, createdResource) => {
    const [id] = await db('resources')
    .insert(createdResource)
    const newResource = await getById(id)
    await db('project_resources').insert({project_id: project_id, resource_id: id})
    return newResource
}

module.exports = {
    getAll,
    getById,
    create
}