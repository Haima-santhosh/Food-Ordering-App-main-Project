const express = require('express')
const userRouter = express.Router()
const authUser = require('../middlewares/authUser')
const{register,login,checkUser,profile,logout,updateUser} = require('../controllers/userController')


// REGISTER New Users
// POST http://localhost:3000/api/user/register
userRouter.post('/register',register)


// Login Existing Users
// POST http://localhost:3000/api/user/login
userRouter.post('/login',login)

//checks if the current logged-in person is a valid, authenticated user
// GET http://localhost:3000/api/user/check-user
userRouter.get('/check-user',authUser,checkUser)


//Access User Profile
//GET http://localhost:3000/api/user/profile
userRouter.get('/profile',authUser,profile)

//User LOGOUT
//POST http://localhost:3000/api/user/logout
userRouter.post('/logout',authUser,logout)

// UPDATE USER INFORMATIONS
//PATCH http://localhost:3000/api/user/update-user
userRouter.patch('/update-user',authUser,updateUser)



module.exports = userRouter