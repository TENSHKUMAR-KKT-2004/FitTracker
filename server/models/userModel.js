const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
 
const Schema = mongoose.Schema

const userSchema = new Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

// static signup method
userSchema.statics.signup = async function(email,password){

    // validation checks
    if(!email || !password){
        throw Error('All field must be filled')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('**** is not Strong Password') 
    }

    // check if the email already exist
    const exist = await this.findOne({email})
    if(exist){
        throw Error('email already exist')
    }

    // gen the salt
    const salt = await bcrypt.genSalt(10)
    // hash the pass
    const hash = await bcrypt.hash(password,salt)
    // store the hashed pass and email
    const user = this.create({email,password:hash})

    return user
}

userSchema.statics.login = async function(email,password){
    if(!email || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({email})
    if(!user){
        throw Error('Invalid email')
    }

    const matchPassword = await bcrypt.compare(password,user.password)
    if(!matchPassword){
        throw Error('Invalid password')
    }

    return user
}

module.exports = mongoose.model('User',userSchema)