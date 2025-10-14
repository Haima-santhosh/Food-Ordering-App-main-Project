const express = require('express')
const userRouter = express.Router()
const authUser = require('../middlewares/authUser')
const{register,login,checkUser,profile,logout} = require('../controllers/userController')


// REGISTER New Users
// http://localhost:3000/api/user/register
userRouter.post('/register',register)


// Login Existing Users
// http://localhost:3000/api/user/login
userRouter.post('/login',login)

//checks if the current logged-in person is a valid, authenticated user
// http://localhost:3000/api/user/check-user
userRouter.get('/check-user',authUser,checkUser)


//Access User Profile
//http://localhost:3000/api/user/profile
userRouter.get('/profile',authUser,profile)

//User LOGOUT
//http://localhost:3000/api/user/logout
userRouter.post('/logout',authUser,logout)



module.exports = userRouter