const mongoose = require('mongoose')
const couponSchema = new mongoose.Schema(
    {
    code: { type: String, required: true },
    discountType: { type: String, enum: ["percentage", "flat"], required: true },
    discountValue: Number,
    minOrderValue: Number,
    maxDiscount: Number,
    validFrom: Date,
    validTill: Date,
    isActive: { type: Boolean, default: true },
    usageLimit: Number,
    usedCount: { type: Number, default: 0 },
    userUsageLimit: Number,

    // Restaurant-level coupon

    restId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },

     // user-specific coupon

    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    
  },
  { timestamps: true }
)
module.exports = mongoose.model("Coupons",couponSchema)