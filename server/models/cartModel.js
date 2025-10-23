const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true,'cart ID is Required']
    },

    items: [
      {
        itemId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: "Menu", 
          required: true 
        },
        quantity: { 
          type: Number, 
          default: 1,
          min: 1
        }
      }
    ],

    totalAmount: { 
      type: Number, 
      default: 0 
    }
  },
  { timestamps: true }
);

// method to calculate totalAmount
cartSchema.methods.calculateTotal = async function () {
  await this.populate('items.itemId');  // populate method used to get price of the item from Menu Model

   this.totalAmount = this.items.reduce((total, item) => {
    if (!item.itemId) return total; // safety check
    return total + item.itemId.price * item.quantity;
  }, 0);

  return this.totalAmount

  
};

module.exports = mongoose.model("Cart", cartSchema);
