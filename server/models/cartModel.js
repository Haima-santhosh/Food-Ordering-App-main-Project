const mongoose = require('mongoose')


const cartSchema = new mongoose.Schema(
    {
     userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" },
        quantity: { type: Number, default: 1 },
      },
    ],
    totalAmount: { type: Number, default: 0 },
  },
  { timestamps: true }
    
)
module.exports = mongoose.model("Cart",cartSchema)