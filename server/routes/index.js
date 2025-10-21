const express = require('express')
const router = express.Router()

const userRouter = require('./userRoutes')
const adminRouter = require('./adminRoutes')
const restaurantRouter = require('./restaurantRoutes')
const categoryRouter = require('./categoryRoutes')
const menuRouter = require('./menuRoutes')



// http://localhost:3000/api/user
router.use('/user',userRouter)

// http://localhost:3000/api/admin
router.use('/admin',adminRouter)


//http://localhost:3000/api/restaurant
router.use('/restaurants', restaurantRouter)

// http://localhost:3000/api/category
router.use('/category',categoryRouter)

// http://localhost:3000/api/menu
router.use('/menu',menuRouter)

// http://localhost:3000/api/order
// router.use('/order', require('./orderRoutes'))

// http://localhost:3000/api/cart
// router.use('/cart', require('./cartRoutes'))

// http://localhost:3000/api/payment
// router.use('/payment', require('./paymentRoutes'))

// http://localhost:3000/api/review
// router.use('/review', require('./reviewRoutes'))

// http://localhost:3000/api/coupon
// router.use('/coupon', require('./couponRoutes'))







module.exports = router