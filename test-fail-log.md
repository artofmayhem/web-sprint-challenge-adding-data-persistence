FAIL  ./codegrade_mvp.test.js
  √ [0] sanity check (141 ms)
  server.js
    projects endpoints
      [GET] /api/projects
        √ [1] can get all projects that exist in the table (128 ms)
        × [2] each project contains project_name, project_description and project_completed (as a boolean) (118 ms)
      [POST] /api/projects
        √ [3] can add a new project to the table (153 ms)
        × [4] responds with the newly created project with its project_completed as a boolean (86 ms)   
        √ [5] rejects projects lacking a project_name with an error status code (61 ms)
    resources endpoints
      [GET] /api/resources
        √ [6] can get all resources in the table (62 ms)
      [POST] /api/resources
        √ [7] can add a new resource to the table (74 ms)
        √ [8] responds with the newly created resource (61 ms)
        √ [9] rejects a resource with an existing resource_name with an error status code (52 ms)       
    tasks endpoints
      [GET] /api/tasks
        √ [10] can get all tasks in the table (76 ms)
        × [11] each task contains task_notes and task_description and task_completed (as a boolean) (84 
ms)
        √ [12] each task contains the project_name and the project_description (81 ms)
      [POST] /api/tasks
        √ [13] can add a new task to the db (117 ms)       
         × [14] responds with the newly created task 
with the task_completed as a boolean (97 ms)        
        √ [15] rejects a task lacking a task_description with an error status code (89 ms)
        √ [16] rejects a task lacking a project_id with an error status code (90 ms)
        √ [17] rejects a task containing an invalid 
project_id with an error status code (99 ms)        

  ● server.js › projects endpoints › [GET] /api/projects › [2] each project contains project_name, project_description and project_completed (as a boolean) 

    expect(received).toMatchObject(expected)        

    - Expected  - 1
    + Received  + 1

      Object {
    -   "project_completed": false,
    +   "project_completed": 1,
        "project_description": "Build APIs",        
        "project_name": "Web API",
      }

      54 |       test('[2] each project contains project_name, project_description and project_completed (as a boolean)', async () => {
      55 |         const res = await request(server).get('/api/projects')
    > 56 |         expect(res.body[0]).toMatchObject({ ...projectA, project_completed: false })
         |                             ^
      57 |         expect(res.body[1]).toMatchObject({ ...projectB, project_completed: true })
      58 |       }, 750)
      59 |     })

      at Object.<anonymous> (codegrade_mvp.test.js:56:29)

  ● server.js › projects endpoints › [POST] /api/projects › [4] responds with the newly created project 
with its project_completed as a boolean

    expect(received).toMatchObject(expected)        

    - Expected  - 1
    + Received  + 1

      Object {
    -   "project_completed": false,
    +   "project_completed": 0,
        "project_description": "Build APIs",        
        "project_name": "Web API",
      }

      71 |       test('[4] responds with the newly created project with its project_completed as a boolean', async () => {
      72 |         let res = await request(server).post('/api/projects').send(projectA)
    > 73 |         expect(res.body).toMatchObject({ 
...projectA, project_completed: false })
         |                          ^
      74 |         res = await request(server).post('/api/projects').send(projectB)
      75 |         expect(res.body).toMatchObject({ 
...projectB, project_completed: true })
      76 |         res = await request(server).post('/api/projects').send(projectC)

      at Object.<anonymous> (codegrade_mvp.test.js:73:26)

  ● server.js › tasks endpoints › [GET] /api/tasks › [11] each task contains task_notes and task_description and task_completed (as a boolean)

    expect(received).toMatchObject(expected)        

    - Expected  - 1
    + Received  + 1

      Object {
    -   "task_completed": false,
    +   "task_completed": 0,
        "task_description": "Do foo",
        "task_notes": null,
      }

      141 |       test('[11] each task contains task_notes and task_description and task_completed (as a boolean)', async () => {
      142 |         const res = await request(server).get('/api/tasks')
    > 143 |         expect(res.body[0]).toMatchObject({
          |                             ^
      144 |           task_description: 'Do foo',   
      145 |           task_notes: null,
      146 |           task_completed: false,        

      at Object.<anonymous> (codegrade_mvp.test.js:143:29)

  ● server.js › tasks endpoints › [POST] /api/tasks 
› [14] responds with the newly created task with the task_completed as a boolean

    expect(received).toMatchObject(expected)        

    - Expected  - 5
    + Received  + 1

    - Object {
    -   "task_completed": false,
    -   "task_description": "Do foo",
    -   "task_notes": null,
    - }
    + Object {}

      185 |         await db('tasks').truncate()    
      186 |         const res = await request(server).post('/api/tasks').send(taskA)
    > 187 |         expect(res.body).toMatchObject({          |                          ^
      188 |           task_description: 'Do foo',   
      189 |           task_notes: null,
      190 |           task_completed: false,        

      at Object.<anonymous> (codegrade_mvp.test.js:187:26)

Test Suites: 1 failed, 1 total
Tests:       4 failed, 14 passed, 18 total
Snapshots:   0 total
Time:        4.1 s

Watch Usage: Press w to show more.