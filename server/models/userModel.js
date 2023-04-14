const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


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

module.exports = mongoose.model('User',userSchema)