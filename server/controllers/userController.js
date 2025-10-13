const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const userRouter = require('../routes/userRoutes');
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

// Send response for newly created User

return res.status(201).json({message:"User is Created Successfully !!",savedUser})


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


const userExists = await User.findOne({email}).select("+password")
if(!userExists)
{
    return res.status(400).json({"message":"User Does not Exists"})
}
console.log(userExists)
// console.log("Plain password:", password);
// console.log("Hashed password from DB:", userExists.password);



//Compare entered password with existing user password for match

const passwordMatch = await bcrypt.compare(password,userExists.password)
console.log(passwordMatch);

if(!passwordMatch)
{
    return res.status(400).json({error : "Invalid Password"})
}


// Generate JWT token for user if passwords are matching
const token = generateToken(userExists._id, 'user');
console.log(token)

// Set the token as cookie 

    res.cookie('token', token, {
     
    // prevents JS access 
      httpOnly: true, 
       // change to true in production for https
      secure: process.env.NODE_ENV==='PRODUCTION',
      sameSite: 'strict',
      maxAge : 60 * 60 * 1000
    });


 // Send response

return res.status(200).json({message: "Login successful!",token, 
      user: {
        _id: userExists._id,
        name: userExists.name,
        email: userExists.email,
      },
    })
}

catch (error) {
console.log(error);
 res.status(error.status||500).json({error:error.message || " Internal Server Error"})   
}
}




module.exports = {register,login}