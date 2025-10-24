const Menu = require('../models/menuModel')
const Restaurant = require('../models/restaurantModel')
const Review = require('../models/reviewModel')




    // CREATE NEW Review

    const addReview = async(req,res)=>
    {
        try 
        {
            //get logged-in user ID from authUser middleware
            const userId = req.user.id

            //get Review details by request body
              const { restId, itemId, rating, comment } = req.body;

            //check for validation
            if(!restId ||  !itemId || !comment)
            {
                return res.status(400).json({message:"Required All Fields"})
            }



          // Create New Review
          
          const newReview = new Review({restId,itemId,userId,rating,comment})
          const savedReview = await newReview.save()
          


           // Save Revie
          await newReview.save()

          

                 return res.status(201).json({message:"Review  Created Successfully !!!",review:newReview})

            }
            
        
        catch (error) 
        {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })     
        }
    }

    //GET ALL REVIEWS POSTED BY THE USER

    const getAllReview = async(req,res) =>
    {
        try 
        {

        // Get logged-in user ID from authUser middleware
        const userId = req.user.id;

        // Find all reviews where userId matches with the logged user's ID
        const reviews = await Review.find({ userId })
            .populate('restId', 'name')   
            .populate('itemId', 'name')

            res.status(200).json({message:"All Reviews Posted By You",reviews})
            
        } 
        catch (error)
         {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })     
        } 
        
        
        }

   //GET A SINGLE REVIEW POSTED BY THE USER       
    
const getSingleReview = async(req,res)=>
{
    try 
    {
       // review ID extract from request parameters
             const { reviewId } = req.params
      
             
            
      
            if (!reviewId) 
              {
            return res.status(400).json({ message: "Review ID is required" });
          }
      
      
      
      
             // Find Review in DB using ID
            const review = await Review.findById(reviewId)
      
      
               // If there is no Review
              if(!review) 
                  {
                  return res.status(404).json({message:"Review is not Found"})    
          }
      
          //send response
          return res.status(200).json({message:"Review Details Fetched Successfully By User!!",review})  
    } 
    catch (error)
     {
         console.log(error)
        res.status(500).json({ error: "Internal Server Error" })   
        
    }
}


// UPDATE A REVIEW BY USER

const updateReview = async(req,res) =>
{
    try
     {
          // fetch Review ID  to update  from request parameters

               const { reviewId } = req.params; 
        
                // Extract review fields from request body
                 const { comment, rating } = req.body

              // Find review and update
           const updatedReview = await Review.findByIdAndUpdate(reviewId, { comment, rating }, { new: true, runValidators: true })
              
             
               
              
               if (!updateReview) {
                return res.status(404).json({ message: "Review Not Found" })
              }
              
              
          
               res.status(200).json({message: "Review Details Updated Successfully by User !!",review:updatedReview});
                  
    } 
    catch (error) 
    {

        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })  
        
    }
}

// DELETE REVIEW BY USER


const deleteReview = async(req,res)=>
{
    try
     {
        
        // Review ID of Review to delete, Extract from req.param 
                  const { reviewId } = req.params;   
                 
             
                  if (!reviewId) {
                   return res.status(400).json({ message: "Review ID is Required" })
                 }
                  
                  // Find review in DB using ID and delete
                 const review = await Review.findByIdAndDelete(reviewId)
             
                 
                 
                  if (!review) {
                   return res.status(404).json({ message: "review Not Found" })
                 }
                 
             
                  res.status(200).json({message: "Review Deleted Successfully by User !!",
                 });   
    } 
    catch (error)
     {
      console.log(error)
        res.status(500).json({ error: "Internal Server Error" })  
    }
}

 //GET A PARTICULAR RESTAURANT REVIEW IN USER SIDE
const getARestaurantReview = async(req,res) =>
{
    try 
    
    {  // Get restaurant ID from URL  
       const { restId } = req.params

        // Find all reviews for this restaurant
        const reviews = await Review.find({ restId }).populate('userId', 'name email')

          if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this restaurant" })

            
        }

        // send response
        res.status(200).json({reviews})
    } 
    catch (error)
     {
       console.log(error)
       res.status(500).json({ error: "Internal Server Error" })   
    }
}
  //GET A PARTICULAR ITEM REVIEW IN USER SIDE
const getAnItemReview = async(req,res) =>
{
    try 
    
    {  // Get item ID from URL  
       const { itemId } = req.params

        // Find all reviews for this item
        const reviews = await Review.find({ itemId }).populate('userId', 'name email')
        .populate({path: 'itemId',select: 'name price restId', populate: { path: 'restId', select: 'name location' } 
  })

          if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this Item" })

            
        }

        // send response
        res.status(200).json({reviews})
    } 
    catch (error)
     {
       console.log(error)
       res.status(500).json({ error: "Internal Server Error" })   
    }
}

 //GET ALL REVIEWS In Admin Side

const getReviewInAdmin = async(req,res)=>
{
    try
     {

      
      
        // Admin need to view all reviews 

        // Fetch all reviews 
        const reviews = await Review.find()
            .populate('userId', 'name email')    // user who posted review
             .populate('restId', 'name location') // restaurant details
             .populate('itemId', 'name price');   

            res.status(200).json({message:"All Reviews Posted By All Users In Admin Side",reviews})
            
        } 
        catch (error)
         {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })     
        } 
        
        
        }
        
    const getSingleReviewInAdmin = async(req,res)=>
{
    try 
    {
       // review ID extract from request parameters
             const { reviewId } = req.params
      
             
            
      
            if (!reviewId) 
              {
            return res.status(400).json({ message: "Review ID is required" });
          }
      
      
      
      
             // Find Review in DB using ID
            const review = await Review.findById(reviewId)
      
      
               // If there is no Review
              if(!review) 
                  {
                  return res.status(404).json({message:"Review is not Found"})    
          }
      
          //send response
          return res.status(200).json({message:"Review Details Fetched Successfully By Admin!!",review})  
    } 
    catch (error)
     {
         console.log(error)
        res.status(500).json({ error: "Internal Server Error" })   
        
    }
}


//GET A PARTICULAR RESTAURANT REVIEW IN ADMIN SIDE
const getARestaurantReviewInAdmin = async(req,res) =>
{
    try 
    
    {  // Get restaurant ID from URL  
       const { restId } = req.params

        // Find all reviews for this restaurant
        const reviews = await Review.find({ restId }).populate('userId', 'name email')

          if (reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this restaurant" })

            
        }

        // send response
        res.status(200).json({reviews})
    } 
    catch (error)
     {
       console.log(error)
       res.status(500).json({ error: "Internal Server Error" })   
    }
}

  //GET A PARTICULAR ITEM REVIEW IN ADMIN SIDE
const getAnItemReviewInAdmin = async(req,res) =>
{
    try 
    
    {  // Get item ID from URL  
       const { itemId } = req.params

        // Find all reviews for this item
        const reviews = await Review.find({ itemId }).populate('userId', 'name email')
        .populate({path: 'itemId',select: 'name price restId', populate: { path: 'restId', select: 'name location' } 
  })

          if (!reviews || reviews.length === 0) {
            return res.status(404).json({ message: "No reviews found for this Item" })

            
        }

        // send response
        res.status(200).json({reviews})
    } 
    catch (error)
     {
       console.log(error)
       res.status(500).json({ error: "Internal Server Error" })   
    }
}



   

module.exports = { addReview,getAllReview,getSingleReview,updateReview,deleteReview,getARestaurantReview,
getAnItemReview,getReviewInAdmin,getSingleReviewInAdmin,getARestaurantReviewInAdmin,getAnItemReviewInAdmin }