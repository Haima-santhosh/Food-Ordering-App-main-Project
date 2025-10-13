const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
    {
   categoryName: {
      type: String,
      enum: ["Main Course","Salads","Starters","Beverages","Desserts","Snacks"],
      required: true,
    }
  },
  { timestamps: true }
)

module.exports = mongoose.model("Category",categorySchema)