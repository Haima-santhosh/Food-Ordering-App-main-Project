const Category = require('../models/categoryModel')


// ADD NEW CATEGORY BY ADMIN

const addCategory = async(req,res) =>
{

try {

    
// Take required Category details from request

const {categoryName} = req.body || {};

// Extract Category fields from request body

//console.log(categoryName)


// Check Validation

if (!categoryName) 
{
    return res.status(400).json({message :"Please Fill All Required Field"})
    
}


// Check if the category is already exists


const categoryExists = await Category.findOne({categoryName})
if(categoryExists)
{
    return res.status(400).json({"message":"Category Already Exists"})
}



// Create New Category

const newCategory = new Category({categoryName})
const savedCategory = await newCategory.save()



// Send response for newly created Category

return res.status(201).json({message:"Category is Created Successfully by Admin !!",savedCategory})

}


catch (error) {

 console.log(error);
 res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
}

}




// VIEW ALL CATEGORIES BY ADMIN

const allCategory = async(req,res)=>
{
    try {

         // Fetch all Categories from the database
        const categories = await Category.find()  

         // If there is no Category
        if(!categories || categories.length=== 0) 
            {
            return res.status(404).json({message:"No Category is Found"})    
    }

    //send response
    return res.status(200).json({message:"Category List Fetched Successfully!!",categories})
}

    catch (error) 
    {
        console.log(error);
        res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
        
    }
}

// VIEW SINGLE CATEGORY DATA BY ID IN ADMIN SIDE

const viewCategory = async(req,res)=>
{
    try {

      // category ID of category to view from request parameters
       const { categoryId } = req.params

       
      

      if (!categoryId) 
        {
      return res.status(400).json({ message: "Category ID is required" });
    }




       // Find category in DB using ID
      const category = await Category.findById(categoryId)


         // If there is no Category
        if(!category) 
            {
            return res.status(404).json({message:"Category is not Found"})    
    }

    //send response
    return res.status(200).json({message:"Category Details Fetched Successfully!!",category})
}

    catch (error) 
    {
        console.log(error);
        res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
        
    }
}

// UPDATE CATEGORY INFORMATIONS by ADMIN

const updateCategoryByAdmin = async(req,res) =>
{
  {
      try 
      {
       
      // Category ID of category to update  from request parameters
       const { categoryId } = req.params; 

       // Extract category fields from request body
      const { categoryName } = req.body || {};
      
     
       
       // Find category in DB and update
      const category = await Category.findByIdAndUpdate(categoryId,{categoryName},{new:true,runValidators:true})
  
       if (!category) {
        return res.status(404).json({ message: "Category Not Found" })
      }
      
      
  
       res.status(200).json({message: "Category Details Updated Successfully by Admin !!",category
      });
          
      } 
      catch (error) 
      {
        console.log(error)
      res.status(500).json({ error: "Internal Server Error" })  
      }
  
  }
} 

  // DELETE A CATEGORY BY ADMIN

 const deleteCategoryByAdmin = async(req,res) =>
  {
    try 
    {
     // category ID of category to delete, Extract from req.param 
          const { categoryId } = req.params;   
         
     
          if (!categoryId) {
           return res.status(400).json({ message: "Category ID is Required" })
         }
          
          // Find category in DB using ID and delete
         const category = await Category.findByIdAndDelete(categoryId)
     
         
         
          if (!category) {
           return res.status(404).json({ message: "Category Not Found" })
         }
         
     
          res.status(200).json({message: "Category Deleted Successfully by Admin !!",
         });   
    } 
    catch (error) 
    {
       console.log(error)
      res.status(500).json({ error: "Internal Server Error" })    
    }
  }


  //GET ALL CATEGORY LIST IN USER SIDE
  
    const getCategoryByUser = async(req,res) =>
    {
      try
       {
  
               // Fetch all Categories from the database
          const category = await Category.find()  
  
           // If there is no Category
          if(!category || category.length=== 0) 
              {
              return res.status(404).json({message:"No Category is Found"})    
      }
  
      //send response
      return res.status(200).json({message:"Category List Fetched Successfully!!",category})
          
      } 
      catch (error)
       {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })   
      }
    }


    //GET Single  Category Details IN USER SIDE
    
      const getCategoryDataByUser = async(req,res)=>
      {
        try
         {
       // Category ID of Category to view from request parameters
           const { categoryId } = req.params
    
    
           // Check validation
    
          if (!categoryId) {
          return res.status(400).json({ message: "Category ID is required" });
        } 
    
           // Find Category in DB using ID
          const category = await Category.findById(categoryId)
    
    
             // If there is no Category
            if(!category || category.length=== 0) 
                {
                return res.status(404).json({message:"No Category is Found"})    
        }
    
        //send response
        return res.status(200).json({message:"Category Details Fetched Successfully!!",category})
    } 
        catch (error) 
        {
         console.log(error)
          res.status(500).json({ error: "Internal Server Error" })    
        }
      }
    
  

  
module.exports = {addCategory,allCategory,viewCategory,updateCategoryByAdmin,deleteCategoryByAdmin,getCategoryByUser,getCategoryDataByUser}