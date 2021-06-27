// build your server here and require it from index.js
// start your server here
const express = require("express")
const projectsRouter = require('./project/router')
const resourceRouter = require('./resource/router')
const helmet = require("helmet")

// INSTANCE OF EXPRESS APP
const server = express()

// GLOBAL MIDDLEWARE
server.use(express.json())
server.use(helmet())
server.use('/api/projects', projectsRouter)
server.use('/api/resources', resourceRouter)

//Sanity Check
//[GET] / (Hello World endpoint)
server.use("/",(req,res)=>{
    //console.log(data)
    res.status(200).json({message:"SERVER OPERATIONAL code: 200"})
})



module.exports = server; 