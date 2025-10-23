const express = require('express')
const restaurantRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const authUser = require('../middlewares/authUser')
const{addRestaurants,allRestaurants,updateRestaurantByAdmin,getRestaurant,deleteRestaurantByAdmin,getRestaurantByUser,getRestaurantDataByUser} = require('../controllers/restaurantController')
const upload = require('../middlewares/multer')


// CREATE New Restaurant BY ADMIN
// POST http://localhost:3000/api/restaurants/add-restaurants
restaurantRouter.post('/add-restaurants',authAdmin,upload.single('image'),addRestaurants)


//VIEW all Restaurants by ADMIN
// GET http://localhost:3000/api/restaurants/all-restaurants
restaurantRouter.get('/all-restaurants',authAdmin,allRestaurants)

//VIEW Single Restaurant Details by ADMIN
// GET http://localhost:3000/api/restaurants/all-restaurants
restaurantRouter.get('/view-restaurant/:restId',authAdmin,getRestaurant)



// UPDATE RESTAURANT INFORMATIONS by ADMIN
// PATCH http://localhost:3000/api/restaurants/update-restaurant/:restId
restaurantRouter.patch('/update-restaurant/:restId',authAdmin,upload.single('image'),updateRestaurantByAdmin)

// DELETE RESTAURANT  by ADMIN
// DELETE http://localhost:3000/api/restaurants/delete-restaurant/:restId
restaurantRouter.delete('/delete-restaurant/:restId',authAdmin,deleteRestaurantByAdmin)


// VIEW all Restaurants by User
// GET http://localhost:3000/api/restaurants
restaurantRouter.get('/',authUser,getRestaurantByUser)

// VIEW Single Restaurant Details  by User
// GET http://localhost:3000/api/restaurants/:restId
restaurantRouter.get('/:restId',authUser,getRestaurantDataByUser)


module.exports = restaurantRouter