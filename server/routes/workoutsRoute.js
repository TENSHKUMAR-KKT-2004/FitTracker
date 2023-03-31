const express = require('express')
const Router = express.Router()
const workouts = require('../controllers/workoutsController')

Router.get('/',workouts.allWorkoutsDocs)
Router.get('/:id',workouts.getSingleDoc)
Router.post('/',workouts.newWorkoutDoc)
Router.delete('/:id',workouts.deleteWorkout)
Router.patch('/:id',workouts.updateWorkout)

module.exports = Router