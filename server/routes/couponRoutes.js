const express = require('express')
const couponRouter = express.Router()

const {addCoupon,getAllCoupon,getCouponDetails,updateCoupon,deleteCoupon,getAllCouponByUser, applyCoupon } = require('../controllers/couponController')
const authUser = require('../middlewares/authUser')
const authAdmin = require('../middlewares/authAdmin')





// Create a new coupon BY ADMIN
// POST http://localhost:3000/api/coupons/add-coupon
couponRouter.post('/add-coupon',authAdmin,addCoupon)


//List all coupons BY ADMIN
// GET /api/coupons/all-coupon
couponRouter.get('/all-coupon',authAdmin, getAllCoupon)

//List all coupons BY USER
// GET /api/coupons/get-coupons
couponRouter.get('/get-coupons',authUser, getAllCouponByUser)


//Get details of a coupon BY ADMIN
// GET /api/coupons/:id
couponRouter.get('/:couponId',authAdmin, getCouponDetails)

//Update Update coupon details
// PATCH http://localhost:3000/api/coupons/:couponId
couponRouter.patch('/:couponId',authAdmin, updateCoupon)


// Delete a coupon BY ADMIN
// DELETE http://localhost:3000/api/coupons/:couponId
couponRouter.delete('/:couponId',authAdmin, deleteCoupon)






//Apply a coupon to Cart items before payment BY USER
// POST http://localhost:3000/api/coupons/:couponId
couponRouter.post('/:couponId',authUser, applyCoupon)









module.exports = couponRouter