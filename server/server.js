require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
const mongoose = require('mongoose')
// create server
const app = express()

const workoutsRoute = require('./routes/workoutsRoute')

// global middleware
app.use(express.json())
app.use(urlencoded({ extended: true }))


const DBURI = `mongodb+srv://${process.env.DBAuthName}:${process.env.DBAuthKey}@blog.dm0zbcz.mongodb.net/FitTrack`

mongoose.connect(DBURI)
    .then(() => {
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log("server listening on port " + PORT)
        })
    })

// routes 
app.use('/api/workouts', workoutsRoute)