const Restaurant = require('../models/restaurantModel')

// cloudinary
const {cloudinaryInstance} = require('../config/cloudinary')

//multer

const upload = require('../middlewares/multer')

// ADD NEW RESTAURANT BY ADMIN

const addRestaurants = async(req,res) =>
{

try {

    
// Take required restaurant details from request

const { restName, rating, deliveryTime, cuisineType, address, averagePrice,image } = req.body || {};


// Upload Restaurant Images 
const file = req.file //from multer
const cloudinaryResponse = await cloudinaryInstance.uploader.upload(file.path)
console.log(cloudinaryResponse);







// Extract restaurant fields from request body

console.log(restName,rating,deliveryTime,cuisineType,address,averagePrice);


// Check Validation

if (!restName || !deliveryTime || !cuisineType || !averagePrice) 
{
    return res.status(400).json({message :"Please Fill All Required Fields"})
    
}


// Check if the restaurant is already exists


const restaurantExists = await Restaurant.findOne({restName})
if(restaurantExists)
{
    return res.status(400).json({"message":"Restaurant Already Exists"})
}



// Create New Restaurant

const newRestaurant = new Restaurant({restName,rating : rating || 0,deliveryTime,cuisineType,address: address || [],averagePrice,image:cloudinaryResponse.secure_url})
const savedRestaurant = await newRestaurant.save()



// Send response for newly created Restaurant

return res.status(201).json({message:"Restaurant is Created Successfully by Admin !!",savedRestaurant})

}


catch (error) {

 console.log(error);
 res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
}

}

// VIEW ALL RESTAURANTS BY ADMIN

const allRestaurants = async(req,res)=>
{
    try {

         // Fetch all restaurants from the database
        const restaurants = await Restaurant.find()  

         // If there is no restaurant
        if(!restaurants || restaurants.length=== 0) 
            {
            return res.status(404).json({message:"No Restaurant is Found"})    
    }

    //send response
    return res.status(200).json({message:"Restaurant List Fetched Successfully!!",restaurants})
}

    catch (error) 
    {
        console.log(error);
        res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
        
    }
}

// VIEW SINGLE RESTAURANT DETAILS BY ADMIN

const getRestaurant = async(req,res)=>
{
    try {

      // restaurant ID of restaurant to view from request parameters
       const { restId } = req.params

      if (!restId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    } 

       // Find restaurant in DB using ID
      const restaurant = await Restaurant.findById(restId)


         // If there is no restaurant
        if(!restaurant || restaurant.length=== 0) 
            {
            return res.status(404).json({message:"No Restaurant is Found"})    
    }

    //send response
    return res.status(200).json({message:"Restaurant Details Fetched Successfully!!",restaurant})
}

    catch (error) 
    {
        console.log(error);
        res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
        
    }
}



// UPDATE RESTAURANT INFORMATIONS by ADMIN

const updateRestaurantByAdmin = async(req,res) =>
{
  {
      try 
      {
       
      // restaurant ID of restaurant to update  from request parameters
       const { restId } = req.params; 

       // Extract restaurant fields from request body
      const { restName, rating, deliveryTime, cuisineType, address, averagePrice } = req.body || {};
      
        // Handle image upload from multer if image already uploaded
       let imageUrl;
       if (req.file) 
        {
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      console.log(cloudinaryResponse);
      imageUrl = cloudinaryResponse.url;
        }
       
       // Find restaurant in DB and update
       // use uploaded image or keep existing
      const restaurant = await Restaurant.findByIdAndUpdate(restId,{restName, rating, deliveryTime, cuisineType, address, averagePrice,image: imageUrl || image},{new:true,runValidators:true})
  
       if (!restaurant) {
        return res.status(404).json({ message: "Restaurant Not Found" })
      }
      
      
  
       res.status(200).json({message: "Restaurant Details Updated Successfully by Admin !!",restaurant
      });
          
      } 
      catch (error) 
      {
        console.log(error)
      res.status(500).json({ error: "Internal Server Error" })  
      }
  
  }
} 




  // DELETE A RESTAURANT BY ADMIN

 const deleteRestaurantByAdmin = async(req,res) =>
  {
    try 
    {
     // restaurant ID of RESTAURANT to update,EXTRACT from  req.param 
          const { restId } = req.params; 
          
         
     
          if (!restId) {
           return res.status(404).json({ message: "Restaurant ID is Required" })
         }
          
          // Find restaurant in DB using ID and delete
         const restaurant = await Restaurant.findByIdAndDelete(restId)
     
         
         
          if (!restaurant) {
           return res.status(404).json({ message: "Restaurant Not Found" })
         }
         
     
          res.status(200).json({message: "Restaurant Details Deleted Successfully by Admin !!",
         });   
    } 
    catch (error) 
    {
       console.log(error)
      res.status(500).json({ error: "Internal Server Error" })    
    }
  }


  //GET ALL RESTAURANT LIST IN USER SIDE

  const getRestaurantByUser = async(req,res) =>
  {
    try
     {

             // Fetch all restaurants from the database
        const restaurants = await Restaurant.find()  

         // If there is no restaurant
        if(!restaurants || restaurants.length=== 0) 
            {
            return res.status(404).json({message:"No Restaurant is Found"})    
    }

    //send response
    return res.status(200).json({message:"Restaurant List Fetched Successfully!!",restaurants})
        
    } 
    catch (error)
     {
      console.log(error)
      res.status(500).json({ error: "Internal Server Error" })   
    }
  }



  //GET Single  RESTAURANT Details IN USER SIDE

  const getRestaurantDataByUser = async(req,res)=>
  {
    try
     {
   // restaurant ID of restaurant to view from request parameters
       const { restId } = req.params


       // Check validation

      if (!restId) {
      return res.status(400).json({ message: "Restaurant ID is required" });
    } 

       // Find restaurant in DB using ID
      const restaurant = await Restaurant.findById(restId)


         // If there is no restaurant
        if(!restaurant || restaurant.length=== 0) 
            {
            return res.status(404).json({message:"No Restaurant is Found"})    
    }

    //send response
    return res.status(200).json({message:"Restaurant Details Fetched Successfully!!",restaurant})
} 
    catch (error) 
    {
     console.log(error)
      res.status(500).json({ error: "Internal Server Error" })    
    }
  }

  

module.exports = {addRestaurants,allRestaurants,getRestaurant,updateRestaurantByAdmin,deleteRestaurantByAdmin,getRestaurantByUser,getRestaurantDataByUser}