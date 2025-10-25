const express = require('express')
const orderRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const authUser = require('../middlewares/authUser')
const { addOrders,getOrders,getSingleOrder,cancelOrder,getOrdersByAdmin,getSingleOrderByAdmin,updateOrderStatus} = require('../controllers/orderController')


/**********************   ADMIN ROUTES ******************************/
//Get All Orders by ADMIN
// GET http://localhost:3000/api/order/all-orders-admin/admin
orderRouter.get('/all-orders-admin', authAdmin, getOrdersByAdmin)


// Get Single Order in Admin Side
// GET http://localhost:3000/api/order/admin/get-order-admin/:orderId
orderRouter.get('/get-order-admin/:orderId', authAdmin, getSingleOrderByAdmin)

//Update Order Status by Admin
// PATCH http://localhost:3000/api/order/update-order-admin/:orderId
orderRouter.patch('/update-order-admin/:orderId', authAdmin, updateOrderStatus)



/**********************   USER ROUTES ******************************/

// Create New Order by User
// POST http://localhost:3000/api/order/add-order
orderRouter.post('/add-orders', authUser, addOrders)

// Get User All Orders
// GET http://localhost:3000/api/order/all-orders
orderRouter.get('/all-orders', authUser, getOrders)

// Get Single Order in User Side
// GET http://localhost:3000/api/order/view-single-order/:orderId
orderRouter.get('/view-single-order/:orderId', authUser, getSingleOrder)


//Cancel Order by User

// DELETE http://localhost:3000/api/order/cancel-order/:orderId
orderRouter.delete('/cancel-order/:orderId', authUser, cancelOrder)





module.exports = orderRouter