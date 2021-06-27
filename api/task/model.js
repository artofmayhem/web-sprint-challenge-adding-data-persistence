// build your `Task` model here
const db = require('../../data/dbConfig')

const booleanConverterDown = (task) => {
    console.log("incoming task state prior to conversion", task.task_completed)
    task.task_completed = (task.task_completed ? 1 : 0)
    console.log("task completed state post conversion", task.task_completed)
    return task

}

const booleanConverterUp = (task) => {
    console.log("incoming task state prior to conversion", task.task_completed)
    task.task_completed = (task.project_completed ? 1 : 0 )
    console.log("task completed state post conversion", task.task_completed)
    return task
}

const getAll = () => {
    const tasks =  db("tasks as t")
    .leftJoin('projects as p', "p.project_id", "t.project_id" )
    .select("t.task_id", "t.task_description", "t.task_completed", "p.project_name", "p.project_description",
      "t.task_notes"
    )
 
    return tasks
    .then((tasks) => {
        tasks.forEach((task) => {
            booleanConverterDown(task)
        })
        return tasks
    })
}

const getById = (id) => {
    const task =  db('tasks') // Promise provider cannot do the other way
    .where('task_id', id)
    .first()

    return task
    .then((task) => {
        console.log("found task", task)
        return booleanConverterDown(task)
    })
}

const create = async (task) => {
      const convertedTask = booleanConverterUp(task)
      const [id] = await db('tasks').insert(convertedTask)
      return getById(id)
}

module.exports = {
    getAll,
    getById, 
    create
}