const express = require('express')
const menuRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const { addMenu, allMenu, viewMenu, updateMenuByAdmin, deleteMenuByAdmin, getMenuByUser , getMenuDataByUser , getMenuDataByCategory } = require('../controllers/menuController')
const upload = require('../middlewares/multer')
const authUser = require('../middlewares/authUser')


// Add New Menu by ADMIN
// POST http://localhost:3000/api/menu/add-menu

menuRouter.post('/add-menu', authAdmin,upload.single('image'), addMenu)


//VIEW all Menu Items by ADMIN
// GET http://localhost:3000/api/menu/all-menu
menuRouter.get('/all-menu',authAdmin,allMenu)


//VIEW Single menu by ID in ADMIN Side
// GET http://localhost:3000/api/menu/view-menu
menuRouter.get('/view-menu/:menuId',authAdmin,viewMenu)



// UPDATE Menu by ADMIN
// PATCH http://localhost:3000/api/menu/update-menu/:menuId
menuRouter.patch('/update-menu/:menuId',authAdmin,upload.single('image'),updateMenuByAdmin)

// DELETE Menu  by ADMIN
// DELETE http://localhost:3000/api/menu/delete-menu/:menuId
menuRouter.delete('/delete-menu/:menuId',authAdmin,deleteMenuByAdmin)


// VIEW all Menu by User
// GET http://localhost:3000/api/menu/get-menu
menuRouter.get('/get-menu',getMenuByUser)



// Get All Menu Items by Category
// GET /api/menu/category/get-category/:categoryId
menuRouter.get('/get-category-menu/:categoryId',authUser, getMenuDataByCategory)

// VIEW Single Menu Details  by User
// GET http://localhost:3000/api/get-menu-details/:menuId
menuRouter.get('/get-menu-details/:menuId',authUser, getMenuDataByUser)


module.exports = menuRouter