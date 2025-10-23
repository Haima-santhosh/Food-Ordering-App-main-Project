const Coupon = require('../models/couponModel')
const Cart = require('../models/cartModel');


  // Create a new coupon BY ADMIN

  const addCoupon = async(req,res) =>
  {
    try 
    {

        // Take required Coupon details from request
        
        const {code,discount,minOrderValue,validFrom,validTill,isActive} = req.body || {};
        
        // Extract Coupon fields from request body
        
        //console.log(code,discount,minOrderValue,validFrom,validTill,isActive)
        
        
        // Check Validation
        
        if (!code || !discount || !minOrderValue || !validFrom || !validTill || !isActive) 
        {
            return res.status(400).json({message :"Please Fill All Required Field"})
            
        }
        
        
        // Check if the Coupon is already exists
        
        
        const couponExists = await Coupon.findOne({code,discount,minOrderValue,validFrom,validTill,
            isActive: isActive !== undefined ? isActive : true}) // default true if not provided
        if(couponExists)
        {
            return res.status(400).json({"message":"Coupon Already Exists"})
        }
        
        
        
        // Create New Coupon
        
         // Create new coupon
    const newCoupon = new Coupon({code,discount,minOrderValue,validFrom,validTill,isActive
    })

    await newCoupon.save();
        
        
        
        // Send response for newly created Coupon
        
        return res.status(201).json({message:"Coupon is Created Successfully by Admin !!",newCoupon})
        
        
    }

    catch (error) 
    {
     console.log(error)
     res.status(500).json({ error: "Internal Server Error" })   
               
    }
  
  }

  const getAllCoupon = async(req,res)=>
  {
    try
     {

         // Fetch all Coupon data from DB
                const coupons = await Coupon.find()  
        
                 // If there is no Coupon
                if(!coupons || coupons.length=== 0) 
                    {
                    return res.status(404).json({message:"Coupons Not Found"})    
            }
        
            //send response
            return res.status(200).json({message:"Coupon List Fetched Successfully!!",coupons})
        
    } 
    catch (error)
     {
     console.log(error)
     res.status(500).json({ error: "Internal Server Error" })     
    }
  }

  // GET A SINGLE COUPON DETAILS IN ADMIN SIDE

  const getCouponDetails = async(req,res)=>
  {
    try 
    {
      
       // GET Coupon ID  from request parameters

              const { couponId } = req.params
       
              
             
       
             if (!couponId) 
               {
             return res.status(400).json({ message: "Coupon ID is required" });
           }
       
       
       
       
              // Find Coupon in DB using ID
             const coupon = await Coupon.findById(couponId)
       
       
                // If there is no Coupon
               if(!coupon) 
                   {
                   return res.status(404).json({message:"Coupon is not Found"})    
           }
       
           //send response
           return res.status(200).json({message:"Coupon Details Fetched Successfully!!",coupon}) 




    } 
    catch (error)
     {

         console.log(error)
     res.status(500).json({ error: "Internal Server Error" })     
    }
        
    }

    const updateCoupon = async(req,res) =>
    {
        try 
        {
            
        // fetch Coupon ID o from request parameters
               const { couponId } = req.params; 
        
               // Extract coupon fields from request body
              const { code,discount,minOrderValue,validFrom,validTill,isActive } = req.body || {};
              
             
               
               // Find coupon in DB and update
              const coupon = await Coupon.findByIdAndUpdate(couponId,{code,discount,minOrderValue,validFrom,validTill,isActive }
                ,{new:true,runValidators:true})
          
               if (!coupon) {
                return res.status(404).json({ message: "Coupon Not Found" })
              }
              
              
          
               res.status(200).json({message: "Coupon Details Updated Successfully by Admin !!",coupon
              });
            
        } 
        catch (error)
         {
     console.log(error)
     res.status(500).json({ error: "Internal Server Error" })      
        }
    }

    const deleteCoupon = async(req,res)=>
    {
        try 
        {
            // Coupon ID  to delete, Extract from req.param 
                      const { couponId } = req.params;   
                     
                 
                      if (!couponId) {
                       return res.status(400).json({ message: "Coupon ID is Required" })
                     }
                      
                      // Find Coupon in DB using ID and delete
                     const coupon = await Coupon.findByIdAndDelete(couponId)
                 
                     
                     
                      if (!coupon) {
                       return res.status(404).json({ message: "Coupon Not Found" })
                     }
                     
                 
                      res.status(200).json({message: "Coupon Deleted Successfully by Admin !!",
                     });   
            
        } 
        catch (error)
         {
     console.log(error)
     res.status(500).json({ error: "Internal Server Error" })   
        }
    }


    // VIEW ALL ACTIVE COUPONS AVAILABLE IN USER SIDE
    const getAllCouponByUser = async(req,res)=>
    {
        try
         {

             // Fetch all Coupon data from DB
                const coupons = await Coupon.find({ isActive: true })  
        
                 // If there is no Coupon
                if(!coupons || coupons.length=== 0) 
                    {
                    return res.status(404).json({message:"Coupons Not Found"})    
            }
        
            //send response
            return res.status(200).json({message:"Coupon List Fetched Successfully!!",coupons})
            
        } 
        catch (error) 
        {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })      
        }
    }

    //Apply a coupon to Cart items before payment BY USER
    const applyCoupon = async(req,res) =>
    {
        try
         {
            
        } 
        catch (error)
         {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })   
            
        }
    }
  
  module.exports ={addCoupon,getAllCoupon,getCouponDetails,updateCoupon,deleteCoupon,getAllCouponByUser,applyCoupon}