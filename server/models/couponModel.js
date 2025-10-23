const mongoose = require('mongoose');

const couponSchema = new mongoose.Schema({

  // unique coupon code
  code: {           
    type: String,
    required: true,
    unique: true,
    trim: true
  },

  // discount amount or percentage

  discount: {       
    type: Number,
    required: true
  },
  // minimum order value to apply coupon
  minOrderValue: {  
    type: Number,
    default: 0
  },
  // start date of coupon
  validFrom: {      
    type: Date,
    required: true
  },
  // end date of coupon
  validTill: {      
    type: Date,
    required: true
  },

    // active or inactive
  isActive: {     
    type: Boolean,
    default:true
   
  }
}, { timestamps: true });

module.exports = mongoose.model('Coupon', couponSchema);
