const express = require('express')
const app = express()
const dotenv = require("dotenv").config()
const quizArray  = require ('./quizModel')

const connectDB = require('./DateBase')

const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const {validateRegistration, validateLogin, quizValidation} = require('./validation')
const validateToken = require('./tokenValidtate')


const Users= require ('./UserRegModel')





app.use(express.json())

const PORT = process.env.PORT || 7070


app.listen(PORT, ()=>{
    console.log('Server is running on',PORT)
})

connectDB()


app.get('/', (req, res)=>{
    return res.status(200).json({message: "Welcome to JAMB CBT"})
})


app.post('/registeration', validateRegistration, validateLogin,async (req, res)=>{
    try {
        const {name, email, password, state, phoneNumber} = req.body

    const exisitingUser = await Users.findOne({ email });

  if (exisitingUser) {
    return res.status(400).json({ message: "Email already registered!" });
  }
 


    const hashedpassword = await bcrypt.hash(password,8)


    const newUser = new Users ({ name, email, password: hashedpassword, state,phoneNumber})
   
    await newUser.save()
    
    return res.status(200).json({
        message: "Registration Successful",
        user: newUser
    })
        
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
    
})




app.post('/login',validateLogin, async (req, res)=>{
    try {

      const {email, password} = req.body
    const user = await Users.findOne({email})
   
    if(!user){
        return res.status(400).json({
            message: "User Account not found"
        })
    }
        
    const paswdCheck = await bcrypt.compare(password, user.password)
    if(!paswdCheck){
        return res.status(400).json({message: "Incorrect Password or email"})
    }




    const accesstoken = jwt.sign({user},`${process.env.ACCESS_TOKEN}`,{expiresIn: "2m"})

    const refreshtoken = jwt.sign({user},`${process.env.REFRESH_TOKEN}`,{expiresIn: "1d"})
    return res.status(200).json({
        message: "Login Successful",
        accesstoken,
        refreshtoken,
        user})

        
    } catch (error) {
        return res.status(500).json({message: error.message})
        
    }
})


app.post("/auth", validateToken, (req, res)=>{
    try {
        return res.status(200).json({
            message: "Successful",
            user: req.user
          })
    } catch (error) {
        return res.status(500).json({message: error.message})
    }

   
  })


  app.post("/quiz", quizValidation,async (req,res, next)=>{
    
    try {
        const { category, userId, quizId, quizAns} =req.body
     
        const exisitingNumber = await quizArray.findOne({ userId });

        if (exisitingNumber) {
          return res.status(404).json({ message: "You have Submitted!" });
        }

        const newUser = new quizArray ({ category, userId, quizId, quizAns})
    
        await newUser.save()
          
        
       const correctAns = quizAns.filter(item=>item.ans==="Correct!").length
       let feedback = " "
       if(correctAns >=5){
        feedback ="Passed"
      }else{
        feedback = "Failed! Sorry you won't proceed to next stage of Program"
       }
    //    
        return res.status(200).json({ message: "You have completed your exam", newUser,totalGrade: correctAns + "/10", feedback })
        
    } catch (error) {
        return res.status(500).json({
            message: error.message
        })
    }
  })


 