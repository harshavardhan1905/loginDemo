const express = require("express");
//mango db import pack
const mongoose = require("mongoose");
require('dotenv').config();
//used to provide secure req and res
const cors = require("cors");
//used for creates the new table and stores the values into that
const EmployeeModel = require("./models/employee");

//converting data as json format
const app = express()
app.use(express.json())
app.use(cors())

//mango db connection
mongoose.connect(process.env.MONGO_URL);
// console.log(mongoose.connect(process.env.MONGO_URL))
const PORT = process.env.PORT || 3000
//Getting data from the db
app.post('/login', (req, res)=>{
    const {email, password} = req.body;
    EmployeeModel.findOne({email: email})
    .then(user =>{
        if(user){
            if(user.password===password){
                res.json("Success")
            }
            else{
                res.json("Not currect")
            }
        }
        else{
            res.json("no records exist:")
        }
    })
})

//posting data to db getting from the front end
app.post('/register', (req, res)=>{
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})
app.get('/api/emp/list', async (req, res)=>{
  try{
    const data = await EmployeeModel.find();
    console.log(data)
    res.json(data)
  }
  catch(err){
    console.log(err)
  }
})
app.listen(PORT, ()=>{
    console.log('Server is running....!')
})