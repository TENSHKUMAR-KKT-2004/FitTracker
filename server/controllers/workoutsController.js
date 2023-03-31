const express = require('express')

const allWorkoutsDocs = (req,res)=>{
    res.send('hello')
}

const getSingleDoc = (req,res)=>{
    res.send('hello')
}

const newWorkoutDoc = (req,res)=>{
    res.send('hello')
}

const deleteWorkout = (req,res)=>{
    res.send('hello')
}

const updateWorkout = (req,res)=>{
    res.send('hello')
}

module.exports = {getSingleDoc,newWorkoutDoc,deleteWorkout,updateWorkout,allWorkoutsDocs}