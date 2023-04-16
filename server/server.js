require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')

// create server
const app = express()

const workoutsRoute = require('./routes/workoutsRoute')
const userRoute = require('./routes/userRoute')

// global middleware
app.use(cors())
app.use(express.json())
app.use(urlencoded({ extended: true }))

// Serve static files from the 'build' directory
app.use(express.static(path.join(__dirname, 'build')))

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

app.use('/api/user', userRoute)

// Route all requests to the React app's index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.use('', (req, res) => {
    res.status(404).send('URL not found !')
})
