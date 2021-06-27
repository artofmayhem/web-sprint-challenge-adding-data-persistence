// build your `/api/projects` router here

const router = require('express').Router()
const Projects = require('./model')

router.get('/', async (req, res, next) => {
    try {
        const projects = await Projects.getAll()
        const boolConverter = projects.map((element) => {
            return {
                ...element,
                project_completed: (element.project_completed === 0 ? false : true)
            }
        })
     res.status(200).json(boolConverter)
    } catch(err) {
        next(err)

    }
})

router.post('/', async (req, res, next) => {
    try {
        const newProject = await Projects.add(req.body)
        res.status(200).json({
            ...newProject, 
            project_completed: (newProject.project_completed === 0 ? false : true)
        })
    } catch  (err) {
        next(err)
    }
})
module.exports = router