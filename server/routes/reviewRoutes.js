const express = require('express')
const reviewRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const authUser = require('../middlewares/authUser')
const {addReview,getAllReview,getSingleReview,getARestaurantReview,getAnItemReview,deleteReview,getReviewInAdmin,getSingleReviewInAdmin,updateReview,
  getARestaurantReviewInAdmin,
  getAnItemReviewInAdmin,updateReviewInAdmin,deleteReviewInAdmin} = require('../controllers/reviewController')


/**********************   ADMIN ROUTES ******************************/
//Get All review by ADMIN
// GET http://localhost:3000/api/review/admin
reviewRouter.get('/all-review', authAdmin, getReviewInAdmin)


// Get Single review in Admin Side
// GET http://localhost:3000/api/review/admin/:reviewId
reviewRouter.get('/admin-item-review/:reviewId', authAdmin, getSingleReviewInAdmin)


// Get  All Review for a Specific Restaurant in Admin Side
// GET http://localhost:3000/api/review/admin-restaurant-review/:restId
reviewRouter.get('/admin-restaurant-review/:restId', authAdmin, getARestaurantReviewInAdmin)

// Get  All Review for a Specific Menu Item in Admin Side
// GET http://localhost:3000/api/review/admin-menu-review/:itemId
reviewRouter.get('/admin-menu-review/:itemId', authAdmin, getAnItemReviewInAdmin)


//Update review in Admin side
// PATCH http://localhost:3000/api/review/admin/:reviewId
reviewRouter.patch('/admin-update/:reviewId', authAdmin, updateReviewInAdmin)


//Delete A Review in  Admin Side

// DELETE http://localhost:3000/api/review/admin/restaurant/:reviewId
reviewRouter.delete('/admin-delete-review/:reviewId', authAdmin, deleteReviewInAdmin)


/**********************   USER ROUTES ******************************/

// Create New Review by User
// POST http://localhost:3000/api/review/add-review
reviewRouter.post('/add-review', authUser, addReview)

// Get  All ReviewS posted By the User 
// GET http://localhost:3000/api/review/my-reviews
reviewRouter.get('/my-reviews', authUser, getAllReview)


// Get  All Review for a Specific Restaurant in User Side
// GET http://localhost:3000/api/review/:restId
reviewRouter.get('/restaurant-review/:restId', authUser, getARestaurantReview)

// Get  All Review for a Specific Menu Item in User Side
// GET http://localhost:3000/api/review/:itemId
reviewRouter.get('/menu-review/:itemId', authUser, getAnItemReview)




// Get Single Review in User Side
// GET http://localhost:3000/api/review/:reviewId
reviewRouter.get('/item-review/:reviewId', authUser, getSingleReview)


// PATCH Update A  Review in User Side
// PATCH http://localhost:3000/api/review/:reviewId
reviewRouter.patch('/update-review/:reviewId', authUser, updateReview)


//Delete A Review in  User Side

// DELETE http://localhost:3000/api/review/:reviewId
reviewRouter.delete('/delete-review/:reviewId', authUser, deleteReview)





module.exports = reviewRouter