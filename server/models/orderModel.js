const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema(
{

   userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User", 
      required: true 
    },
    restId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Restaurant", 
      required: true 
    },
     couponId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Coupon" 
    },
   amount: { 
      type: Number, 
      required: true 
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "preparing", "out_for_delivery", "delivered", "cancelled"],
      default: "pending",
    }
},
  { timestamps: true }
    
)
module.exports = mongoose.model("Order", orderSchema)