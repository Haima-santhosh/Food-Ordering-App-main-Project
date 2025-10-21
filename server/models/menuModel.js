const mongoose = require('mongoose')


const menuSchema = new mongoose.Schema(
   {
   restId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Restaurant", 
      required: true 
    },
    categoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Category" ,
      required: true 
    },

    itemName: { 
      type: String, 
      required: true 
    },
    itemImage: { 
      type: String, 
      required: true 
    },

    itemDescription: { 
      type: String 
    },

    price: { 
      type: Number, 
      required: true 
    },
    rating: { 
      type: Number, 
      default: 0 
    }
  },
  { timestamps: true }

)
module.exports = mongoose.model("Menu", menuSchema,)