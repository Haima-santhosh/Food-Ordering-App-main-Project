const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    name : {
        type : String,
        required : [true,"Name is Required"],
        trim:true
    },
    
    email:
    {
      type: String,
        required: [true, "Email is required"],
        trim: true,
        // ensures no two users have same email
        unique: true, 
        //email format validation
        match: [/\S+@\S+\.\S+/, 'Please enter a valid email'] 
    },
     password: {
        type: String,
        required: [true, "Password is required"],
         // minimum length
        minlength: [6, "Password must be at least 6 characters"],
          // maximum length  
        maxlength: [20, "Password cannot exceed 20 characters"]   
    },

     role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },


},{timestamps:true})

module.exports = mongoose.model("User",userSchema)