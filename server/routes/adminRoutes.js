const express = require('express')
const adminRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const{register,login,checkAdmin,profile,logout,updateUserByAdmin,deleteUserByAdmin} = require('../controllers/adminController')


// REGISTER New Admin
// http://localhost:3000/api/admin/register
adminRouter.post('/register',authAdmin,register)


// Login Existing Admin
// http://localhost:3000/api/admin/login
adminRouter.post('/login',login)

//checks if the current logged-in person is a valid, authenticated Admin
// http://localhost:3000/api/admin/check-admin
adminRouter.get('/check-admin',authAdmin,checkAdmin)


//Access User Profile
//http://localhost:3000/api/admin/profile
adminRouter.get('/profile',authAdmin,profile)

//Admin LOGOUT
//http://localhost:3000/api/admin/logout
adminRouter.post('/logout',authAdmin,logout)

// UPDATE USER INFORMATIONS by ADMIN
//http://localhost:3000/api/admin/update-user/:userId
adminRouter.patch('/update-user/:userId',authAdmin,updateUserByAdmin)

// DELETE USER  by ADMIN
//http://localhost:3000/api/admin/delete-user/:userId
adminRouter.delete('/delete-user/:userId',authAdmin,deleteUserByAdmin)

module.exports = adminRouter