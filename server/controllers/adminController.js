const User = require('../models/userModel')
const bcrypt = require('bcrypt');

const generateToken = require('../utils/generateToken');

// cloudinary
const {cloudinaryInstance} = require('../config/cloudinary')

//multer

const upload = require('../middlewares/multer')


// SIGNUP New Admin
const signup = async(req,res) =>
{

try {

    
// Take required Admin details from request

const{name,email,password,profilePic} = req.body || {}

console.log(name,email,password);

 

// Check Validation

if(!name || !email || !password)
{
    return res.status(400).json({message :"Please Fill All Required Fields"})
    
}

 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 if(!emailPattern.test(email))
 {
  return res.status(400).json({message :"Please Enter a Valid Email"})
      
 }

 if(password.length < 6 || password.length > 20)
 {
  return res.status(400).json({message :"Password Length Must be 6-20 charcters long"})  
 }




// Check if the Admin is already exists


const userExists = await User.findOne({email})
if(userExists)
{
    return res.status(400).json({"message":"Admin Already Exists"})
}


// Encrypting password Using bcrypt Hashing

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)
console.log(hashedPassword)

// Create New Admin

const newAdmin = new User({name,email,password:hashedPassword,profilePic,role:'admin'})
const savedAdmin = await newAdmin.save()


// Don't want to return hashed password as response (remove)

const adminObject = savedAdmin.toObject()
delete adminObject.password



// Send response for newly created Admin

return res.status(201).json({message:"Admin is Created Successfully !!",admin: adminObject })


}
catch (error) {

 console.log(error);
 res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
}


}

// SIGNIN Existing Admin

const signin = async(req,res) =>
{
    try {

const{email,password} = req.body ||{}
console.log(email,password)

//Check Validation

if(!email || !password)
{
    return res.status(400).json({message :"Please Fill All Required Fields"})
    
}

 const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
 if(!emailPattern.test(email))
 {
  return res.status(400).json({message :"Please Enter a Valid Email"})
      
 }

 if(password.length < 6 || password.length > 20)
 {
  return res.status(400).json({message :"Password Length Must be 6-20 charcters long"})  
 }

// Check if Admin Exists


const adminExists = await User.findOne({email})
if(!adminExists)
{
    return res.status(400).json({"message":"Admin Does not Exists"})
}



//console.log(adminExists)
// console.log("Plain password:", password);
// console.log("Hashed password from DB:", adminExists.password);

// check role is admin before signin

if (adminExists.role !== "admin") {
  return res.status(403).json({ message: "Access denied. Not an admin." });
}


//Compare entered password with existing admin password for match

const passwordMatch = await bcrypt.compare(password,adminExists.password)
//console.log(passwordMatch);

if(!passwordMatch)
{
    return res.status(400).json({error : "Invalid Password"})
}


 // Remove password before sending response

const adminObject = adminExists.toObject()
delete adminObject.password


// Generate JWT token for admin if passwords are matching
const token = generateToken(adminExists._id, 'admin');
//console.log(token)

// Set the token as cookie 

    res.cookie('token', token, {
     
    // prevents JS access 
      httpOnly: true, 
       // change to true in production for https
      secure: process.env.NODE_ENV === "production",
      sameSite: 'none',
      maxAge : 60 * 60 * 1000 // 1 hr in milliseconds
    });


 // Send response

return res.status(200).json({message: "Admin Sign In successful!", admin: adminObject
    })
}

catch (error) {
console.log(error);
 res.status(error.status||500).json({error:error.message || " Internal Server Error"})   
}
}


//CHECK ADMIN IS AUTHORIZED OR NOT 

const checkAdmin = async(req,res) =>
{
    try 
    {
     res.json({message:"Admin is Authorized",adminId:req.admin.id})  
    } 
    catch (error) 
    {
     console.log(error);
 res.status(error.status||500).json({error:error.message || " Internal Server Error"})      
    }
}


// Get ADMIN PROFILE for logged-in ADMIN

const profile = async(req,res) =>
{
    try 
    {

    // req.admin EXTRACT from authAdmin middleware

   const adminId =  req.admin.id;
     
     // Find admin in DB and ensure role is 'admin'
    const admin = await User.findOne({ _id: adminId, role: 'admin' });

     if (!admin) {
      return res.status(404).json({ message: "Admin not found" })
    }
     
    // Remove password before sending response
    const adminObject = admin.toObject();
    delete adminObject.password;

    res.status(200).json({ admin: adminObject });
    } 
    catch (error) 
    {
      console.log(error)
    res.status(500).json({ error: "Internal Server Error" })  
    }

}



// UPDATE ADMIN DETAILS BY ADMIN

const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    let profilePicUrl;

    // Handle profile pic upload
    if (req.file) {
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      profilePicUrl = cloudinaryResponse.secure_url;
    }

    // Admin ID from auth middleware
    const adminId = req.admin.id;

    // Build update object dynamically
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (profilePicUrl) updateData.profilePic = profilePicUrl;

    // Update admin in DB, exclude password
    const admin = await User.findByIdAndUpdate(adminId, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ message: "Profile updated successfully!", admin });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// GET all users for admin
const getAllUsers = async (req, res) => {
  try {
    // fetch all users, exclude password
   const users = await User.find({ role: 'user' }).select('-password');

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};


// ADMIN LOGOUT
const logout = async(req,res) =>
{
     try
     {
       // Clear the token cookie

       res.clearCookie('token', {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: 'none'
});
res.status(200).json({ message: "Admin Logged Out Successfully" });

       
       res.status(200).json({message:"Admin Logged Out Successfully"})
        
    } 
    catch (error)
     {
      
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })   

    }

}

// UPDATE USER DETAILS BY ADMIN

const updateUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.admin.id === userId) {
      return res.status(403).json({ message: "Admin can’t update their own account here." });
    }

    // Extract fields from request body
    const { name, phone, email, role, isActive } = req.body || {};

    let address = [];
    if (req.body.address) {
      try {
        address = JSON.parse(req.body.address);
      } catch (err) {
        return res.status(400).json({ message: "Invalid address format" });
      }
    }

    // Handle profilePic if uploaded via multer
    let profilePicUrl;
    if (req.file) {
      const cloudinaryResponse = await cloudinaryInstance.uploader.upload(req.file.path);
      profilePicUrl = cloudinaryResponse.secure_url;
    }

    // Build update object dynamically (only send fields that exist)
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (phone) updateData.phone = phone;
    if (role) updateData.role = role;
    if (typeof isActive !== "undefined") updateData.isActive = isActive;
    if (address.length) updateData.address = address;
    if (profilePicUrl) updateData.profilePic = profilePicUrl;

    // Update user in DB
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true }).select("-password");

    if (!user) return res.status(404).json({ message: "User Not Found" });

    res.status(200).json({ message: "User Details Updated Successfully by Admin !!", user });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// DELETE USER  BY ADMIN

const deleteUserByAdmin = async(req,res) =>
{
    try 
    {
     
    // user ID of user to DELETE, req.param EXTRACT from authUser middleware
     const { userId } = req.params; 
     
    
    // Prevent admin from updaiting their own account here

    if (req.admin.id === userId) {
      return res.status(403).json({ message: "Admin can’t update their own account here." });
    }


     if (!userId) {
      return res.status(404).json({ message: "User ID is Required" })
    }
     
     // Find user in DB using ID
    const user = await User.findByIdAndDelete(userId)

    
    
     if (!user) {
      return res.status(404).json({ message: "User Not Found" })
    }
    

     res.status(200).json({message: "User Details Deleted Successfully by Admin !!"
    });
        
    } 
    catch (error) 
    {
      console.log(error)
    res.status(500).json({ error: "Internal Server Error" })  
    }

}



module.exports = {signup,signin,checkAdmin,profile,logout,getAllUsers,updateUserByAdmin,deleteUserByAdmin,updateProfile}