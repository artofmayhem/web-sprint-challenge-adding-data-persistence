// build your `Task` model here
const db = require('../../data/dbConfig')

const getAll = () => {
    return db("tasks")
    .leftJoin('projects', "projects.project_id", "tasks.project_id" )
    .select("tasks.task_id", "tasks.task_description", "task.task_notes", "task.task_completed", "project.project_name", "project.project_description")
}

const getById = (id) => {
    return db('tasks')
    .leftJoin("projects", "projects.project_id", "tasks.project_id")
    .where('task_id', id)
    .select("tasks.*")
    .first()
}

const create = async (task) => {
    const [id] = await db('tasks').insert(task)
    const newTask = await getById(id)
    return newTask
}

module.exports = {
    getAll,
    getById, 
    create
}