const Workout = require('../models/workoutModel')
const mongoose = require('mongoose')

const allWorkoutsDocs = async(req,res)=>{
    const user_id = req.user._id

    const workouts = await Workout.find({ user_id }).sort({createdAt : -1})
    
    res.status(200).json(workouts)
}

const getSingleDoc = async (req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:"No such workouts"})
    }
    const workout = await Workout.findById(id)
    if (!workout){
        res.status(400).json({error:"No such workouts"})
    }
    res.status(200).json(workout)
}

const newWorkoutDoc = async(req,res)=>{
    const {title,load,reps} = req.body
    const emptyFields = []

    if(!title){
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error:'please fill the all of the fields',emptyFields})
    }
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title,load,reps,user_id})
        res.status(200).json(workout)
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const deleteWorkout = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(400).json({error:"No such workout"})
    }
    const workout = await Workout.findByIdAndDelete({_id:id})
    if(!workout){
        res.status(400).json({error:"No such workout"})
    }
    res.status(200).json(workout)
}

const updateWorkout = async(req,res)=>{
    const {id} = req.params
    const workout = await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })
    if(!workout){
        res.status(400).json({error:"No such workout"})
    }
    res.status(200).json(workout)
}

module.exports = {getSingleDoc,newWorkoutDoc,deleteWorkout,updateWorkout,allWorkoutsDocs}