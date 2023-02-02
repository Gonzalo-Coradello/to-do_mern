require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const tasksRouter = require('./routes/tasks.router')
const usersRouter = require('./routes/users.router')
let cors = require("cors");

const app = express()

app.use(express.json())
app.use(cors());

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/tasks', tasksRouter)
app.use('/api/users', usersRouter)


mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URI, { dbName: 'MERN-app' })
    .then(() => {
        console.log('DB connected')
        app.listen(process.env.PORT, () => {
            console.log('Listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })
