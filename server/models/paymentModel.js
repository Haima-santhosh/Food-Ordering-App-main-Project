const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
    {
        
    orderId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Order", 
      required: true 
    },
    method: { 
      type: String, 
      enum: ["COD", "UPI", "Card"], 
      required: true 
    },
    // Total amount paid
    amount: { 
      type: Number, 
      required: true 
    },

     // Unique ID for each transaction

    transactionId: { 
      type: String, 
      required: true,
      unique: true 
    },
  

  // Payment status 
    status: { 
      type: String, 
      enum: ["success", "failed", "pending"], 
      default: "pending" 
    }
  },

  { timestamps: true }
    
)
module.exports = mongoose.model("Payment",paymentSchema)