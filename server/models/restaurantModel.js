const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
   {
    restName: { type: String, required: true },
    rating: { type: Number, default: 0 },
    deliveryTime: { type: Number, required: true },

   cuisineType: {
      type: String,
      enum: [ "Indian","Italian","Chinese","Mexican","Japanese","North Indian","Mediterranean","American"],
      required: true,
    },
    address: [
      {
        street: String,
        city: String,
        state: String,
        pincode: String,
      },
    ],
  

   // Average price per meal 

    averagePrice: {
      type: Number,
      required: true,
      min: 0,
    },
   
},   
  { timestamps: true }

)
module.exports = mongoose.model("Restaurant", restaurantSchema);