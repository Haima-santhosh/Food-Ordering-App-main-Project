const express = require('express')
const orderRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const authUser = require('../middlewares/authUser')
const { addOrders,getOrders,getSingleOrder,cancelOrder,getOrdersByAdmin,getSingleOrderByAdmin,updateOrderStatus} = require('../controllers/orderController')


/**********************   ADMIN ROUTES ******************************/
//Get All Orders by ADMIN
// GET http://localhost:3000/api/order/admin
orderRouter.get('/', authAdmin, getOrdersByAdmin)


// Get Single Order in Admin Side
// GET http://localhost:3000/api/order/admin/:orderId
orderRouter.get('/:orderId', authAdmin, getSingleOrderByAdmin)

//Update Order Status by Admin
// PATCH http://localhost:3000/api/order/:orderId
orderRouter.patch('/:orderId', authAdmin, updateOrderStatus)



/**********************   USER ROUTES ******************************/

// Create New Order by User
// POST http://localhost:3000/api/order/add-order
orderRouter.post('/add-orders', authUser, addOrders)

// Get User All Orders
// GET http://localhost:3000/api/order
orderRouter.get('/', authUser, getOrders)

// Get Single Order in User Side
// GET http://localhost:3000/api/order/:orderId
orderRouter.get('/:orderId', authUser, getSingleOrder)


//Cancel Order by User

// DELETE http://localhost:3000/api/order/:orderId
orderRouter.delete('/:orderId', authUser, cancelOrder)





module.exports = orderRouter