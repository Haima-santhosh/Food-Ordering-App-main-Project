const User = require('../models/userModel')
const bcrypt = require('bcrypt');

const generateToken = require('../utils/generateToken');


// SIGNUP New User
const register = async(req,res) =>
{

try {

    
// Take required user details from request

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




// Check if the user is already exists


const userExists = await User.findOne({email})
if(userExists)
{
    return res.status(400).json({"message":"User Already Exists"})
}


// Encrypting password Using bcrypt Hashing

const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)
console.log(hashedPassword)

// Create New User

const newUser = new User({name,email,password:hashedPassword,profilePic})
const savedUser = await newUser.save()


// Don't want to return hashed password to client

const userObject = savedUser.toObject()
delete userObject.password


// Send response for newly created User

return res.status(201).json({message:"User is Created Successfully !!",user: userObject})


}
catch (error) {

 console.log(error);
 res.status(error.status||500).json({error:error.message || " Internal Server Error"})
    
}


}

// LOGIN Existing User

const login = async(req,res) =>
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

// Check if User Exists


const userExists = await User.findOne({email})
if(!userExists)
{
    return res.status(400).json({"message":"User Does not Exists"})
}
console.log(userExists)
// console.log("Plain password:", password);
// console.log("Hashed password from DB:", userExists.password);



//Compare entered password with existing user password for match

const passwordMatch = await bcrypt.compare(password,userExists.password)
//console.log(passwordMatch);

if(!passwordMatch)
{
    return res.status(400).json({error : "Invalid Password"})
}


// Don't want to return password to client

const userObject = userExists.toObject()
delete userObject.password


// Generate JWT token for user if passwords are matching
const token = generateToken(userExists._id, 'user');
//console.log(token)

// Set the token as cookie 

    res.cookie('token', token, {
     
    // prevents JS access 
      httpOnly: true, 
       // change to true in production for https
      secure: process.env.NODE_ENV==='PRODUCTION',
      sameSite: 'Strict',
      maxAge : 60 * 60 * 1000 // 1 hr in milliseconds
    });


 // Send response

return res.status(200).json({message: "Login successful!", userObject
    })
}

catch (error) {
console.log(error);
 res.status(error.status||500).json({error:error.message || " Internal Server Error"})   
}
}


//CHECK USER IS AUTHORIZED OR NOT 

const checkUser = async(req,res) =>
{
    try 
    {
     res.json({message:"User is Authorized",userId:req.user.id})  
    } 
    catch (error) 
    {
     console.log(error);
 res.status(error.status||500).json({error:error.message || " Internal Server Error"})      
    }
}



// Get USER PROFILE for logged-in user

const profile = async(req,res) =>
{
    try 
    {

    // req.user EXTRACT from authUser middleware
    const userId = req.user.id
     
     // Find user in DB
    const user = await User.findById(userId)

     if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    
    // Remove password before sending response
    const userObject = user.toObject();
    delete userObject.password;

    res.status(200).json({ user: userObject });
        
    } 
    catch (error) 
    {
      console.log(error)
    res.status(500).json({ error: "Internal Server Error" })  
    }

}


// LOGOUT for users

const logout = async(req,res) =>
{

    try
     {
       // Clear the token cookie

       res.clearCookie('token',
        {
            httpOnly : true ,
            secure : process.env.NODE_ENV ==='PRODUCTION' ,
            sameSite : 'Strict'
        }
       )
       res.status(200).json({message:"User Logged Out Successfully"})
        
    } 
    catch (error)
     {
      
    console.log(error)
    res.status(500).json({ error: "Internal Server Error" })   

    }
}


// UPDATE USER DETAILS BY USER

const updateUser = async(req,res) =>
{
    try 
    {
    
     
    const{name,email,password,profilePic,address,phone} = req.body || {}    

    // req.user EXTRACT from authUser middleware
    const userId = req.user.id
     
     // Find user in DB using field projection method to remove password in response
    const user = await User.findByIdAndUpdate(userId,{name,email,password,profilePic,address,phone},{new:true,runValidators:true}).select('-password')

     if (!user) {
      return res.status(404).json({ message: "User not found" })
    }
    
    

     res.status(200).json({message: "User Details Updated Successfully !!",user,
    });
        
    } 
    catch (error) 
    {
      console.log(error)
    res.status(500).json({ error: "Internal Server Error" })  
    }

}



module.exports = {register,login,checkUser,profile,logout,updateUser}