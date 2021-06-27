// build your `/api/tasks` router here
const router = require('express').Router()
const Tasks = require("./model")

router.get('/', async (req, res, next) => {
    try {
        const tasks = await Tasks.getAll()
        const booleanAdjustedTasks = tasks.map((task) => {
            return { ...task, task_completed: (task.task_completed === 0 ? false : true)  }
        })
        res.status(200).json(booleanAdjustedTasks)
    } catch (err){
        next(err)
    }
})


router.post('/', async (req, res, next) => {
    try {
        const newTask = await Tasks.create(req.body)
        console.log("newTask from task POST",newTask)
        res.status200.json({
            ...newTask,
            task_completed: (newTask.task_completed=== 0 ? false : true) 
        })
    } catch (err) {
        next(err)
    }
})

module.exports = router