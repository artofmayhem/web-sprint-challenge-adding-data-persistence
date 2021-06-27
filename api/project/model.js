// build your `Project` model here
const db = require('../../data/dbConfig')

//unsure whether to attempt boolean converter here or in router !!!!
const booleanConverterDown = (project) => {
    console.log("incoming task state prior to conversion", project.project_completed)
    project.project_completed = (project.project_completed ? 1 : 0)
    console.log("task completed state post conversion", project.project_completed)
    return project

}

// const booleanConverterUp = (project) => {
//     console.log("incoming project state prior to conversion", project.project_completed)
//     project.project_completed = (project.project_completed ? 1 : 0 )
//     console.log("project completed state post conversion", project.project_completed)
//     return project
// }

function getAll() {
  return db('projects')
  .then((projects) => {
            projects.forEach((project) => {
                booleanConverterDown(project)
            })
            return projects
        })
}

const getById = async (id) =>  {
    const projects =  db('projects') //Provide promise
    .where('project_id', id)
    .first()
    return projects
    .then((project) => {  //converts singular project into integer value
        console.log("incoming project state value", project)
        return booleanConverterDown(project)
    })

}

const create = async (newProject) => {
    const [id] = await db('projects').insert(newProject)
    return getById(id)
}

module.exports = {
    getAll,
    getById,
    create
}

// NOW WORKING BOOLEAN CONVERTER

//Location: https://stackoverflow.com/questions/7820683/convert-boolean-result-into-number-integer

//Logic: Best answer. Why? This works on truthiness which is more general and accepts any type (string, number, etcetera.) The unary answer is clever indeed, but if I pass it a string it returns NaN. So if you want L33T and guarantee the input, go urary, otherwise methinks the ternary + truthy test is best.


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
