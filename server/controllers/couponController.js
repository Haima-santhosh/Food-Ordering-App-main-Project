const Coupon = require('../models/couponModel')
const Cart = require('../models/cartModel');

//ADD NEW COUPON BY ADMIN
  const addCoupon = async (req, res) => {
  try {
    const {
      code,
      discount,
      minOrderValue,
      validFrom,
      validTill,
      isActive
    } = req.body || {};

    // VALIDATION 
    if (
      !code ||
      discount === undefined ||
      minOrderValue === undefined ||
      !validFrom ||
      !validTill ||
      isActive === undefined
    ) {
      return res.status(400).json({ message: "Please Fill All Required Field" });
    }

    // CHECK ALREADY EXISTS
    const couponExists = await Coupon.findOne({ code });
    if (couponExists) {
      return res.status(400).json({ message: "Coupon Already Exists" });
    }

    // CREATE
    const newCoupon = new Coupon({
      code,
      discount,
      minOrderValue,
      validFrom,
      validTill,
      isActive,
    });

    await newCoupon.save();

    return res
      .status(201)
      .json({ message: "Coupon Created Successfully!", newCoupon });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


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


    // APPLY COUPON BY USER
    
// Apply coupon when user clicks "Apply"
const applyCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;
    const userId = req.user.id;

    // Fetch coupon
    const coupon = await Coupon.findById(couponId);
    if (!coupon) return res.status(404).json({ error: "Coupon not found" });
    if (!coupon.isActive) return res.status(400).json({ error: "Coupon not active" });

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validTill) {
      return res.status(400).json({ error: "Coupon expired or not valid" });
    }

    // Fetch cart
    const cart = await Cart.findOne({ userId }).populate("items.itemId");
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty" });
    }

    // Calculate total
    const totalAmount = cart.items.reduce((sum, item) => {
      if (!item.itemId) return sum;
      return sum + item.itemId.price * item.quantity;
    }, 0);

    // Check minimum order value
    if (totalAmount < coupon.minOrderValue) {
      return res.status(400).json({
        error: `Eligible only if purchase at least ₹${coupon.minOrderValue} for this coupon`,
      });
    }

    // Total after discount
    let totalAfterDiscount = totalAmount - coupon.discount;
    if (totalAfterDiscount < 0) totalAfterDiscount = 0;

    // Send response to client
    return res.status(200).json({
      message: "Coupon applied successfully",
      discount: coupon.discount,
      totalAfterDiscount,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};






  module.exports ={addCoupon,getAllCoupon,getCouponDetails,updateCoupon,deleteCoupon,getAllCouponByUser,applyCoupon}