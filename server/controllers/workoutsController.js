const express = require('express')
const Workout = require('../models/workoutModel')

const allWorkoutsDocs = (req,res)=>{
    res.send('hello')
}

const getSingleDoc = (req,res)=>{
    res.send('hello')
}

const newWorkoutDoc = async(req,res)=>{
    const {title,load,reps} = req.body
    try{
        const workout = await Workout.create({title,load,reps})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const deleteWorkout = (req,res)=>{
    res.send('hello')
}

const updateWorkout = (req,res)=>{
    res.send('hello')
}

module.exports = {getSingleDoc,newWorkoutDoc,deleteWorkout,updateWorkout,allWorkoutsDocs}