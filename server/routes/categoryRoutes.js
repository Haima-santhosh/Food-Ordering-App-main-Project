const express = require('express')
const categoryRouter = express.Router()
const authAdmin = require('../middlewares/authAdmin')
const{addCategory,allCategory,updateCategoryByAdmin,viewCategory,deleteCategoryByAdmin,getCategoryByUser,getCategoryDataByUser} = require('../controllers/categoryController')


// Add New Category by ADMIN
// POST http://localhost:3000/api/category/add-category
categoryRouter.post('/add-category',authAdmin,addCategory)


//VIEW all Categories by ADMIN
// GET http://localhost:3000/api/category/all-categories
categoryRouter.get('/all-categories',authAdmin,allCategory)


//VIEW Single category by ID in ADMIN Side
// GET http://localhost:3000/api/category/view-category
categoryRouter.get('/view-category/:categoryId',authAdmin,viewCategory)



// UPDATE Category by ADMIN
// PATCH http://localhost:3000/api/category/update-category/:categoryId
categoryRouter.put('/update-category/:categoryId',authAdmin,updateCategoryByAdmin)

// DELETE Category  by ADMIN
// DELETE http://localhost:3000/api/category/delete-category/:categoryId
categoryRouter.delete('/delete-category/:categoryId',authAdmin,deleteCategoryByAdmin)


// VIEW all Categories by User
// GET http://localhost:3000/api/category/get-category
categoryRouter.get('/get-category',getCategoryByUser)

// VIEW Single Category Details  by User
// GET http://localhost:3000/api/category/get-category/:categoryId
categoryRouter.get('/get-category/:categoryId',getCategoryDataByUser)


module.exports = categoryRouter