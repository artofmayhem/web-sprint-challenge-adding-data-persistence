// build your `Task` model here
const db = require("../../data/dbConfig");

const booleanConverterDown = (task) => {
  console.log("incoming task state prior to conversion", task.task_completed);
  task.task_completed = (task.task_completed ? true : false); // FIXES ISSUE #11
  console.log("task completed state post conversion", task.task_completed);
  return task;
};

const booleanConverterUp = (task) => {
  console.log("incoming task state prior to conversion", task.task_completed);
  task.task_completed = (task.project_completed ? 1 : 0);
  console.log("task completed state post conversion", task.task_completed);
  return task;
};


//TEST FAIL ISSUE LOG
//   × [11] each task contains task_notes and task_description and task_completed (as   a   boolean) (84  
        //response is receiving both 0 and false values for task completed         RESOLVED
//   × [14] responds with the newly created task 
//   with the task_completed as a boolean (97 ms)  
        //response is coming back in the wrong order but correct info??? 



const getAll = () => {
  const tasks = db("tasks as t")
    .leftJoin("projects as p", "p.project_id", "t.project_id")
    .select(
      "t.task_notes",
      "t.task_description",
      "t.task_completed",
      "p.project_name",
      "p.project_description",
     
    );

  return tasks.then((tasks) => {
    tasks.forEach((task) => {
      booleanConverterDown(task);
    });
    return tasks;
  });
};

const getById = (id) => {
  const task = db("tasks") // Promise provider cannot do the other way
    .where("task_id", id)
    .first();

  return task.then((task) => {
    console.log("found task", task);
    return booleanConverterDown(task);
  });
};

const create = async (task) => {
  const convertedTask = booleanConverterUp(task);
  const [id] = await db("tasks").insert(convertedTask);
  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
};


// Test Fail log

// ● server.js › tasks endpoints › [GET] /api/tasks › [11] each task contains task_notes and task_description and task_completed (as a boolean)

// expect(received).toMatchObject(expected)        

// - Expected  - 1
// + Received  + 1

//   Object {
// -   "task_completed": false,
// +   "task_completed": 0,
//     "task_description": "Do foo",
//     "task_notes": null,
//   }

//   141 |       test('[11] each task contains task_notes and task_description and task_completed (as a boolean)', async () => {
//   142 |         const res = await request(server).get('/api/tasks')
// > 143 |         expect(res.body[0]).toMatchObject({
//       |                             ^
//   144 |           task_description: 'Do foo',   
//   145 |           task_notes: null,
//   146 |           task_completed: false,        

//   at Object.<anonymous> (codegrade_mvp.test.js:143:29)

// ● server.js › tasks endpoints › [POST] /api/tasks 
// › [14] responds with the newly created task with the task_completed as a boolean

// expect(received).toMatchObject(expected)        

// - Expected  - 5
// + Received  + 1

// - Object {
// -   "task_completed": false,
// -   "task_description": "Do foo",
// -   "task_notes": null,
// - }
// + Object {}

//   185 |         await db('tasks').truncate()    
//   186 |         const res = await request(server).post('/api/tasks').send(taskA)
// > 187 |         expect(res.body).toMatchObject({          |                          ^
//   188 |           task_description: 'Do foo',   
//   189 |           task_notes: null,
//   190 |           task_completed: false,        

//   at Object.<anonymous> (codegrade_mvp.test.js:187:26)
