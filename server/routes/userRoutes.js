const express = require('express')
const userRouter = express.Router()

const{register,login} = require('../controllers/userController')

// Signup for each Users
// http://localhost:3000/api/user/register

userRouter.post('/register',register)


// Signin for each Users
// http://localhost:3000/api/user/login

userRouter.post('/login',login)





module.exports = userRouter