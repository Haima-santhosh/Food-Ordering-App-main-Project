const express = require('express')
const cartRouter = express.Router()

const {getCart,addItemToCart,updateCart,deleteItemFromCart,clearCart } = require('../controllers/cartController')
const authUser = require('../middlewares/authUser')


// Add an item to the user's cart
// POST http://localhost:3000/api/cart/add-cart
cartRouter.post('/add-cart',authUser,addItemToCart)


//Get current user's cart
// GET /api/cart
cartRouter.get('/',authUser, getCart)

//Update cart
// PATCH http://localhost:3000/api/cart/:itemId
cartRouter.patch('/:itemId',authUser, updateCart)


// Clear cart
// DELETE http://localhost:3000/api/cart/clear-cart
cartRouter.delete('/clear-cart',authUser, clearCart)



//Remove an item from the cart
// DELETE http://localhost:3000/api/cart/:itemId
cartRouter.delete('/:itemId',authUser, deleteItemFromCart)














module.exports = cartRouter