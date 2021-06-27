// build your `Project` model here
const db = require('../../data/dbConfig')

//unsure whether to attempt boolean converter here or in router !!!!
// const booleanConverterDown = (project) => {
//     console.log(project)
//     if(project.project_completed.toString() === "false") {
//         project.project_completed === 0
//     } else {
//         project.project_completed === 1
//     }
//     return project
// }

// const booleanConverterUp = (project) => {
//     project.project_completed = (project.project_completed ? 1 : 0 )
//     return project
// }

function getAll() {
  return db('projects')
   
}

const getById = async (id) =>  {
    return db('projects')
    .where('project_id', id)
    .first()
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