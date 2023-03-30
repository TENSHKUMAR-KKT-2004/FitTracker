require('dotenv').config()
const { urlencoded } = require('express')
const express = require('express')
// create server
const app = express()

// global middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.json())
app.use(urlencoded({extended:true}))


// routes 
app.get('/',(req,res)=>{
    res.send("hello")
})

// port config
const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log("server listening on port "+PORT)
})