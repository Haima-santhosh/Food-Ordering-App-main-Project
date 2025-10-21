const express = require('express')
const restaurantRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const{addRestaurants,allRestaurants,updateRestaurantByAdmin,getRestaurant,deleteRestaurantByAdmin,getRestaurantByUser,getRestaurantDataByUser} = require('../controllers/restaurantController')


// REGISTER New Restaurant ADMIN
// POST http://localhost:3000/api/restaurants/add-restaurants
restaurantRouter.post('/add-restaurants',authAdmin,addRestaurants)


//VIEW all Restaurants by ADMIN
// GET http://localhost:3000/api/restaurants/all-restaurants
restaurantRouter.get('/all-restaurants',authAdmin,allRestaurants)

//VIEW Single Restaurant Details by ADMIN
// GET http://localhost:3000/api/restaurants/all-restaurants
restaurantRouter.get('/view-restaurant/:restId',authAdmin,getRestaurant)



// UPDATE RESTAURANT INFORMATIONS by ADMIN
// PATCH http://localhost:3000/api/restaurants/update-restaurant/:restId
restaurantRouter.patch('/update-restaurant/:restId',authAdmin,updateRestaurantByAdmin)

// DELETE RESTAURANT  by ADMIN
// DELETE http://localhost:3000/api/restaurants/delete-restaurant/:restId
restaurantRouter.delete('/delete-restaurant/:restId',authAdmin,deleteRestaurantByAdmin)


// VIEW all Restaurants by User
// GET http://localhost:3000/api/restaurants
restaurantRouter.get('/',getRestaurantByUser)

// VIEW Single Restaurant Details  by User
// GET http://localhost:3000/api/restaurants/:restId
restaurantRouter.get('/:restId',getRestaurantDataByUser)


module.exports = restaurantRouter