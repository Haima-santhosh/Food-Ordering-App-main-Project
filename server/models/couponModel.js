const mongoose = require('mongoose')
const couponSchema = new mongoose.Schema(
    {
   // Unique coupon code
    code: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },

   // Unique coupon code
    code: { 
      type: String, 
      required: true, 
      unique: true, 
      trim: true 
    },


     discountValue: { 
      type: Number, 
      required: true 
    },

     minOrderValue: { 
      type: Number, 
      default: 0 
    },


     maxDiscount: { 
      type: Number 
    },

    // Validity period

    validFrom: { 
      type: Date, 
      required: true 
    },
    validTill: { 
      type: Date, 
      required: true 
    },


   // Coupon active or not
    isActive: { 
      type: Boolean, 
      default: true 
    },


    usageLimit: { 
      type: Number, 
      default: 0 
    },

    // How many times it has already used before
    usedCount: { 
      type: Number, 
      default: 0 
    },
    
    // How many times a single user can use this coupon
    userUsageLimit: { 
      type: Number, 
      default: 1 
    },

    // Restaurant-level coupon

     restId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Restaurant" 
    },

     // user-specific coupon

   userId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User" 
    }
    
  },
  { timestamps: true }
)
module.exports = mongoose.model("Coupons",couponSchema)