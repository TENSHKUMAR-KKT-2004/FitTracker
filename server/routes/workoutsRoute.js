const express = require('express')

const workouts = require('../controllers/workoutsController')
// middleware 
const requireAuth = require('../middleware/requireAuth')

const Router = express.Router()

// require auth for all workout routes
Router.use(requireAuth)

Router.get('/',workouts.allWorkoutsDocs)
Router.get('/:id',workouts.getSingleDoc)
Router.post('/',workouts.newWorkoutDoc)
Router.delete('/:id',workouts.deleteWorkout)
Router.patch('/:id',workouts.updateWorkout)

module.exports = Router