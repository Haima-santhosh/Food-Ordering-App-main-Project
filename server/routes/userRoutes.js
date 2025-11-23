const express = require('express')
const userRouter = express.Router()
const authUser = require('../middlewares/authUser')
const{signup,signin,checkUser,profile,logout,updateUser} = require('../controllers/userController')
const upload = require('../middlewares/multer')


// SIGNUP New Users
// POST http://localhost:3000/api/user/signup
userRouter.post('/user-signup',upload.single('profilePic'),signup)


// SIGNIN Existing Users
// POST http://localhost:3000/api/user/signin
userRouter.post('/user-signin',signin)

//checks if the current logged-in person is a valid, authenticated user
// GET http://localhost:3000/api/user/check-user
userRouter.get('/check-user',authUser,checkUser)


//Access User Profile
//GET http://localhost:3000/api/user/profile
userRouter.get('/user-profile',authUser,profile)

//User LOGOUT
//POST http://localhost:3000/api/user/logout
userRouter.post('/user-logout',authUser,logout)

// UPDATE USER INFORMATIONS
//PATCH http://localhost:3000/api/user/update-user
userRouter.patch('/update-user',authUser,upload.single('profilePic'),updateUser)



module.exports = userRouter