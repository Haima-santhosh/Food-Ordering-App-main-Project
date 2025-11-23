const Menu = require('../models/menuModel');

// cloudinary
const {cloudinaryInstance} = require('../config/cloudinary')

//multer

const upload = require('../middlewares/multer')




// ADD NEW Menu BY ADMIN

const addMenu = async (req, res) => {
  try {
    const { restId, categoryId, itemName, itemDescription, price, rating } = req.body;

if (!restId || !categoryId || !itemName || !itemDescription || !price || !rating || !req.file) {
  return res.status(400).json({ message: "Please fill all required fields!" });
}

    // Upload image to Cloudinary
    const file = req.file;
    const cloudinaryResponse = await cloudinaryInstance.uploader.upload(file.path);
    const imageUrl = cloudinaryResponse.secure_url;

    // Check if menu item already exists
    const menuExists = await Menu.findOne({ itemName, restId, categoryId });
    if (menuExists) {
      return res.status(400).json({ message: "Menu item already exists!" });
    }

    // Create new menu item
   const newMenu = new Menu({
  restId,
  categoryId,
  itemName,
  itemDescription,
  price,
  rating,
  itemImage: imageUrl,
});

    const savedMenu = await newMenu.save();

    return res.status(201).json({
      message: "Menu item created successfully!",
      savedMenu,
    });
  } catch (error) {
    console.error(error);
    res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};





// VIEW ALL Menu BY ADMIN

const allMenu = async(req, res) => {
  try {
    const menus = await Menu.find()
      .populate('restId', 'restName')        // fetch restaurant name
      .populate('categoryId', 'categoryName'); // fetch category name

    if (!menus || menus.length === 0) {
      return res.status(404).json({ message: "No menu found" });
    }

    return res.status(200).json({
      message: "Menu List Fetched Successfully!!",
      menus, // frontend expects 'menus'
    });
  } catch (error) {
    console.log(error);
    res.status(error.status || 500).json({ error: error.message || "Internal Server Error" });
  }
};



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

const updateMenuByAdmin = async (req, res) => {
  try {
    const { menuId } = req.params;
    const { restId, categoryId, itemName, itemDescription, price, rating } = req.body;

    // Handle image upload
    let imageUrl;
    if (req.file) {
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      imageUrl = cloudinaryResponse.secure_url;
    }

    // Update menu
    const menu = await Menu.findByIdAndUpdate(
      menuId,
      {
        restId,
        categoryId,
        itemName,
        itemDescription,
        price,
        rating,
        ...(imageUrl && { itemImage: imageUrl }),
      },
      { new: true, runValidators: true }
    );

    if (!menu) return res.status(404).json({ message: "Menu not found" });

    res.status(200).json({ message: "Menu updated successfully", menu });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
};


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