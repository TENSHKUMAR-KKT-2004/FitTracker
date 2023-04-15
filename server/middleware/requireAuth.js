const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

const requireAuth = async(req,res,next)=>{
    // verify authentication
    const {authorization} = req.headers
    if(!authorization){
        res.status(401).json({error:'Authorization token require'})
    }

    const token = authorization.split(' ')[1]// the authorization property has the string like 'bearer bfhbgkbtr.hrbfhebhr.bfxhberf'. The 2nd one is our token so we need to split our token
     try{
        // verify the token
        const {_id} = jwt.verify(token,process.env.SECRET)
        req.user = await User.findOne({_id}).select('_id')
        next()
     }catch(error){
        res.status(401).json({error:'Request is not Authorized'})
     }
}

module.exports = requireAuth