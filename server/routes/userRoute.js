const express = require('express')

const Router = express.Router()

const {loginUser,signupUser} = require('../controllers/userController')

// login route

Router.post('/login',loginUser)

// signup route

Router.post('/signup',signupUser)

module.exports = Router