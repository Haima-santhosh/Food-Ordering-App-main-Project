const Order = require('../models/orderModel')
const Cart = require('../models/cartModel')
const Coupon = require('../models/couponModel')



    // CREATE NEW ORDER

    const addOrders = async(req,res)=>
    {
        try 
        {
            //get logged-in user ID from authUser middleware
            const userId = req.user.id

            //get order details by request body
            const{restId, couponId, deliveryAddress, paymentMethod}=req.body

            //check for validation
            if(!restId ||  !deliveryAddress || !paymentMethod)
            {
                return res.status(400).json({message:"Required All Fields"})
            }


             //Fetch  user cart details from DB
            let cart = await Cart.findOne({userId}).populate('items.itemId')

            // check if there i s any items present in the user cart

            if(!cart || cart.items.length===0)
           {
       
            return res.status(400).json({ error: "Your Cart is Empty. Add Items Before Ordering"});
          }
          
          // if items presnt inside cart recalculate the total amount
            
             let totalAmount = cart.items.reduce((sum, element) => sum + element.itemId.price * element.quantity, 0);


          // Apply Coupon if Any

          if(couponId)
          {
            const coupon = await Coupon.findById(couponId)

            if(coupon && coupon.isActive)
            {
              totalAmount = totalAmount -coupon.discount
            }
          }


          // create New Order

          const newOrder = new Order({userId,restId,

        items:cart.items.map(element => ({
        itemId: element.itemId._id,
        quantity: element.quantity,
        price: element.itemId.price
        })),
        couponId: couponId || null,totalAmount,deliveryAddress,amount: totalAmount, paymentMethod:"cod",status: "pending"})


           // Save order
          await newOrder.save()

          // Clear user's cart after order placement

          cart.items=[]
          cart.totalAmount =0



                 // Save cart
                 await cart.save()

                 return res.status(201).json({message:"Order Placed Successfully !!!",order:newOrder})

            }
            
        
        catch (error) 
        {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })     
        }
    }

  
    //GET ALL ORDERS FROM USER SIDE

  // GET ALL ORDERS FROM USER SIDE
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    // Populate items and restaurant
    const orders = await Order.find({ userId })
      .populate({
        path: "items.itemId",
        select: "itemName itemImage price", // menu fields
      })
      .populate({
        path: "restId",
        select: "restName", // restaurant name
      });

    if (!orders || orders.length === 0) {
      return res.status(200).json({ order: [] });
    }

    res.status(200).json({ order: orders });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

  
    //GET SINGLE ORDER FROM USER SIDE

    const getSingleOrder =async(req,res)=>
    {
        try
         {
         
               // Fetch the ID of Order to view, from request parameters
                   const { orderId } = req.params
            
                   
                  
            
                  if (!orderId) 
                    {
                  return res.status(400).json({ message: "Order ID is required" });
                }
            
            
            
            
                   // Find Order in DB using ID
                  const order = await Order.findById(orderId)
            
            
                     // If there is no Orders
                    if(!order) 
                        {
                        return res.status(404).json({message:"Order is not Found"})    
                }
            
                //send response
                return res.status(200).json({message:"Order Details Fetched Successfully!!",order})
            }
            
        
        catch (error)
         {

        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })    
            
        }

    }


      // CANCEL ORDER BY USER
   
  // Cancel an order by user
// Check order exists, cannot cancel delivered or already cancelled orders
const cancelOrder = async (req, res) => {
  try {
    // Get order ID from URL params
    const orderId = req.params.orderId;

    // Find the order in DB
    const order = await Order.findById(orderId);

    // If not found, return 404
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Prevent cancelling delivered or already cancelled orders
    if (order.status === "delivered" || order.status === "cancelled") {
      return res.status(400).json({ message: "Cannot cancel this order" });
    }

    // Update status to cancelled
    order.status = "cancelled";
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


     //VIEW ALL ORDERS IN ADMIN SIDE
const getOrdersByAdmin = async(req,res)=>
{
    try 
    {

          // Fetch all orders
        const order = await Order.find()
            .populate('userId')     
            .populate('restId')  
            .populate('couponId')



         //check if there is any orders
        if (order.length===0) {
          return res.status(404).json({ message: "Order is not Found" });
        }
      
          //send response
            res.status(200).json({message: "All Orders fetched successfully By Admin !!!",order})
        
    } 
    catch (error)
     {
     
         console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
        
    }
}

  //VIEW Single ORDER Details IN ADMIN SIDE
const getSingleOrderByAdmin =async(req,res)=>
{
    try 
    {
         // Fetch the ID of Order to view, from request parameters
                   const { orderId } = req.params
            
                   
                  
            
                  if (!orderId) 
                    {
                  return res.status(400).json({ message: "Order ID is required" });
                }
            
          

        // Find Order in DB and populate references
        const order = await Order.findById(orderId)
            .populate('userId', 'name email')        
            .populate('restId', 'name address')      
            .populate('couponId', 'code discount') 
            
            
            
               
            
                     // If there is no Orders
                    if(!order) 
                        {
                        return res.status(404).json({message:"Order is not Found"})    
                }
            
                //send response
                return res.status(200).json({message:"Order Details fetched successfully By Admin !!!!!",order})
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" })
        
    }
}


   // UPDATE ORDER STATUS BY ADMIN 
const updateOrderStatus = async(req,res) =>
{
  try 
  {

    // extract the order ID to update from request parameters

    const {orderId} = req.params;

    // extract new status from request body to update by admin

    const{status} = req.body


    // Validate status

    const validStatus = ["pending","confirmed","preparing","out_for_delivery","delivered","cancelled"]
    
    // check validations for ststus from request body

    if(!status || !validStatus.includes(status))
    {
      return status(400).json({error:"Missing or Invalid Status"})
    }

    // check if the order is present

    const order = await Order.findById(orderId)

    if(!order)
    {

      return status(404).json({error:"Order Not Found"})

    }

    // update status

    order.status= status
    await order.save()

    res.status(200).json({message:`Order status updated to '${status}' successfully !!!!`,order})

    
  } 
  catch (error)
   {
     console.log(error)
     res.status(500).json({ error: "Internal Server Error" })
  }
}

// Cancel  order by Admin
const cancelOrderByAdmin = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);
    if (!order) return res.status(404).json({ message: "Order not found" });

    // Optionally prevent cancelling delivered orders
    if (order.status === "delivered") {
      return res.status(400).json({ message: "Cannot cancel a delivered order" });
    }

    order.status = "cancelled"; // soft delete
    await order.save();

    res.status(200).json({ message: "Order cancelled successfully by admin" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};








module.exports = { addOrders,getOrders,getSingleOrder,getOrdersByAdmin,getSingleOrderByAdmin,cancelOrder,updateOrderStatus,cancelOrderByAdmin }