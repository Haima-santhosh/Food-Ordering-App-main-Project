const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema(
    {
        
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
    method: { type: String, enum: ["COD", "UPI", "Card"], required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
  },

  { timestamps: true }
    
)
module.exports = mongoose.model("Payment",paymentSchema)