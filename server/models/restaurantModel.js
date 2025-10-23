const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    restName: { 
      type: String, 
      required: true 
    },

    rating: { 
      type: Number, 
      default: 0 
    },

    deliveryTime: { 
      type: Number, 
      required: true 
    },

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

    averagePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    // New field for image
    image: {
      type: String,
     required: true
    },

  },   
  { timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
