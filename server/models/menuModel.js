const mongoose = require('mongoose')


const menuSchema = new schema(
   {
    restId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    itemName: { type: String, required: true },
    itemImage: String,
    itemDescription: String,
    price: { type: Number, required: true },
    rating: { type: Number, default: 0 },
  },
  { timestamps: true }

)
module.exports = mongoose.model("Menu", menuSchema,)