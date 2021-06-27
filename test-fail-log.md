 FAIL  ./codegrade_mvp.test.js
  √ [0] sanity check (137 ms)
  server.js
    projects endpoints
      [GET] /api/projects

        × [2] each project contains project_name, project_description and project_completed (as a boolean) (121 ms)
      [POST] /api/projects

        × [4] responds with the newly created project with its project_completed as a boolean (86 ms)   

    resources endpoints
      [POST] /api/resources
        × [7] can add a new resource to the table (61 ms)
        × [8] responds with the newly created resource (55 ms)
     
    tasks endpoints
      [GET] /api/tasks

        × [11] each task contains task_notes and task_description and task_completed (as a boolean) (79 
    ms)

      [POST] /api/tasks
      × [14] responds with the newly created task 
    with the task_completed as a boolean (107 ms)       
       
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

  ● server.js › resources endpoints › [POST] /api/resources › [7] can add a new resource to the table   

    expect(received).toHaveLength(expected)

    Expected length: 2
    Received length: 0
    Received array:  []

      105 |         await request(server).post('/api/resources').send(resourceB)
      106 |         const resources = await db('resources')
    > 107 |         expect(resources).toHaveLength(2)
          |                           ^
      108 |         expect(resources[0]).toMatchObject(resourceA)
      109 |         expect(resources[1]).toMatchObject(resourceB)
      110 |       }, 750)

      at Object.<anonymous> (codegrade_mvp.test.js:107:27)

  ● server.js › resources endpoints › [POST] /api/resources › [8] responds with the newly created resource

    expect(received).toMatchObject(expected)        

    - Expected  - 3
    + Received  + 1

    - Object {
    -   "resource_name": "keyboard",
    - }
    + Object {}

      111 |       test('[8] responds with the newly 
created resource', async () => {
      112 |         const res = await request(server).post('/api/resources').send(resourceA)
    > 113 |         expect(res.body).toMatchObject(resourceA)
          |                          ^
      114 |       }, 750)
      115 |       test('[9] rejects a resource with 
an existing resource_name with an error status code', async () => {
      116 |         await db('resources').insert(resourceA)

      at Object.<anonymous> (codegrade_mvp.test.js:113:26)

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
Tests:       6 failed, 12 passed, 18 total
Snapshots:   0 total
Time:        4.172 s