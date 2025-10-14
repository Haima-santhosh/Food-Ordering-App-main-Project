const express = require('express')
const router = express.Router()

const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')



// http://localhost:3000/api/user
router.use('/user',userRouter)

// http://localhost:3000/api/admin
router.use('/admin',adminRouter)








module.exports = router