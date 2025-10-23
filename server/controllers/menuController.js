const Menu = require('../models/menuModel');

// cloudinary
const {cloudinaryInstance} = require('../config/cloudinary')

//multer

const upload = require('../middlewares/multer')




// ADD NEW Menu BY ADMIN

const addMenu = async(req,res) =>
{

try {

    
// Take required Menu details from request

const {restId, categoryId, itemName, itemDescription, price,rating } = req.body || {};

// Extract Menu fields from request body

//console.log(restId, categoryId, itemName, itemDescription, price)


// Upload Menu Images 
const file = req.file //from multer
const cloudinaryResponse = await cloudinaryInstance.uploader.upload(file.path)
const imageUrl = cloudinaryResponse.secure_url;
console.log(imageUrl);



// Check Validation

if (!restId || !categoryId || !itemName || !itemDescription || !price || !rating || !imageUrl ) 
{
    return res.status(400).json({message :"Please Fill All Required Field"})
    
}


// Check if the Menu item is already exists


const menuExists = await Menu.findOne({itemName})
if(menuExists)
{
    return res.status(400).json({"message":"Menu Already Exists"})
}



// Create New Menu item

const newMenu = new Menu({restId, categoryId, itemName, itemImage:imageUrl, itemDescription,rating, price,})
const savedMenu = await newMenu.save()



// Send response for newly created Menu item

return res.status(201).json({message:"Menu Item is Created Successfully by Admin !!",savedMenu})

}


catch (error) {

 console.log(error);
 res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
}

}




// VIEW ALL Menu BY ADMIN

const allMenu = async(req,res)=>
{
    try {

         // Fetch all Categories from the database
        const categories = await Menu.find()  

         // If there is no Menu
        if(!categories || categories.length=== 0) 
            {
            return res.status(404).json({message:"No Menu is Found"})    
    }

    //send response
    return res.status(200).json({message:"Menu List Fetched Successfully!!",categories})
}

    catch (error) 
    {
        console.log(error);
        res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
        
    }
}

// VIEW SINGLE Menu DATA BY ID IN ADMIN SIDE

const viewMenu = async(req,res)=>
{
    try {

      // Fetch the ID of Menu to view, from request parameters
       const { menuId } = req.params

       
      

      if (!menuId) 
        {
      return res.status(400).json({ message: "Menu ID is required" });
    }




       // Find Menu in DB using ID
      const menu = await Menu.findById(menuId)


         // If there is no Menu
        if(!menu) 
            {
            return res.status(404).json({message:"Menu is not Found"})    
    }

    //send response
    return res.status(200).json({message:"Menu Details Fetched Successfully!!",menu})
}

    catch (error) 
    {
        console.log(error);
        res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
        
    }
}

// UPDATE Menu INFORMATIONS by ADMIN

const updateMenuByAdmin = async(req,res) =>
{
  {
      try 
      {
       
      // Menu ID of Menu to update  from request parameters
       const { menuId } = req.params; 

       // Extract Menu fields from request body
      const { restId, categoryId, itemName, itemDescription, price } = req.body || {}
      
        // Handle image upload from multer if image already uploaded
       let imageUrl;
       if (req.file) 
        {
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      console.log(cloudinaryResponse);
      imageUrl = cloudinaryResponse.secure_url;
        }
       
       
       // Find Menu in DB and update
      const menu = await Menu.findByIdAndUpdate(menuId,{restId, categoryId, itemName, itemDescription, price,image: imageUrl || image},{new:true,runValidators:true})
  
       if (!menu) {
        return res.status(404).json({ message: "Menu Not Found" })
      }
      
      
  
       res.status(200).json({message: "Menu Details Updated Successfully by Admin !!",menu
      });
          
      } 
      catch (error) 
      {
        console.log(error)
      res.status(500).json({ error: "Internal Server Error" })  
      }
  
  }
} 

  // DELETE A Menu BY ADMIN

 const deleteMenuByAdmin = async(req,res) =>
  {
    try 
    {
     // Menu ID of Menu to delete, Extract from req.param 
          const { menuId } = req.params;   
         
     
          if (!menuId) {
           return res.status(400).json({ message: "Menu ID is Required" })
         }
          
          // Find Menu in DB using ID and delete
         const menu = await Menu.findByIdAndDelete(menuId)
     
         
         
          if (!menu) {
           return res.status(404).json({ message: "Menu Not Found" })
         }
         
     
          res.status(200).json({message: "Menu Deleted Successfully by Admin !!",
         });   
    } 
    catch (error) 
    {
       console.log(error)
      res.status(500).json({ error: "Internal Server Error" })    
    }
  }


  //GET ALL Menu LIST IN USER SIDE
  
    const getMenuByUser = async(req,res) =>
    {
      try
       {
  
               // Fetch all Categories from the database
          const menu = await Menu.find()  
  
           // If there is no Menu
          if(!menu || menu.length=== 0) 
              {
              return res.status(404).json({message:" Menu is not Found"})    
      }
  
      //send response
      return res.status(200).json({message:"Menu List Fetched Successfully!!",menu})
          
      } 
      catch (error)
       {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })   
      }
    }


    //GET Single  Menu Details IN USER SIDE
    
      const getMenuDataByUser = async(req,res)=>
      {
        try
         {
       // Menu ID of Menu to view from request parameters
           const { menuId } = req.params
    
    
           // Check validation
    
          if (!menuId) {
          return res.status(400).json({ message: "Menu ID is required" });
        } 
    
           // Find Menu in DB using ID
          const menu = await Menu.findById(menuId)
    
    
             // If there is no Menu
            if(!menu || menu.length=== 0) 
                {
                return res.status(404).json({message:"No Menu is Found"})    
        }
    
        //send response
        return res.status(200).json({message:"Menu Details Fetched Successfully!!",menu})
    } 
        catch (error) 
        {
         console.log(error)
          res.status(500).json({ error: "Internal Server Error" })    
        }
      }
    

    // Get All Menu Items by Category  
  const getMenuDataByCategory = async(req,res) =>
  {
    try 
    {
       // Extract categoryId from request parameters

           const { categoryId } = req.params
    
    
          // Validate that categoryId is provided
    
          if (!categoryId) {
          return res.status(400).json({ message: "No menu items found for this category" });
        } 
    
           // Find all menu items that belong to this category
          const menu = await Menu.find({ categoryId })
    
    
             // If there is no Menu
            if(!menu || menu.length=== 0) 
                {
                return res.status(404).json({message:"Category is not Found"})    
        }
    
        //send response
        return res.status(200).json({message:"Menu Details Fetched Successfully from this Category!!",menu})
        
    } 
    catch (error)
     {
      console.log(error)
          res.status(500).json({ error: "Internal Server Error" })      
    }
  }

  
module.exports = {addMenu,allMenu,viewMenu,updateMenuByAdmin,deleteMenuByAdmin,getMenuByUser,getMenuDataByUser,getMenuDataByCategory}