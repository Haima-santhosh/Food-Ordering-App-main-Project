const express = require('express')
const menuRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const { addMenu, allMenu, viewMenu, updateMenuByAdmin, deleteMenuByAdmin, getMenuByUser , getMenuDataByUser , getMenuDataByCategory } = require('../controllers/menuController')



// Add New Menu by ADMIN
// POST http://localhost:3000/api/menu/add-menu

menuRouter.post('/add-menu', authAdmin, addMenu)


//VIEW all Categories by ADMIN
// GET http://localhost:3000/api/menu/all-menu
menuRouter.get('/all-menu',authAdmin,allMenu)


//VIEW Single menu by ID in ADMIN Side
// GET http://localhost:3000/api/menu/view-menu
menuRouter.get('/view-menu/:menuId',authAdmin,viewMenu)



// UPDATE Menu by ADMIN
// PATCH http://localhost:3000/api/menu/update-menu/:menuId
menuRouter.patch('/update-menu/:menuId',authAdmin,updateMenuByAdmin)

// DELETE Menu  by ADMIN
// DELETE http://localhost:3000/api/menu/delete-menu/:menuId
menuRouter.delete('/delete-menu/:menuId',authAdmin,deleteMenuByAdmin)


// VIEW all Menu by User
// GET http://localhost:3000/api/menu
menuRouter.get('/',getMenuByUser)



// Get All Menu Items by Category
// GET /api/menu/category/:categoryId
menuRouter.get('/category/:categoryId', getMenuDataByCategory)

// VIEW Single Menu Details  by User
// GET http://localhost:3000/api/menu/:menuId
menuRouter.get('/:menuId', getMenuDataByUser)


module.exports = menuRouter