const jwt = require('jsonwebtoken')

// Middleware to check if a user is logged in
const authUser = (req,res,next)=>
{
    try 
    {
     //validate the cookies before// Check if cookies exist
     
    if (!req.cookies) {
      return res.status(401).json({ error: "No cookies found, not authorized" });
    }

     // Get token from cookies

     const {token} = req.cookies
      
       // If no token, block access
     if(!token)
     {
        return res.status(401).json({error:"User is not authorized"})
     }
        
     // if user has token verifying it to find any kind of tampering or issue

     const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY)
      
     // If token invalid, block access
     if(!decodedToken)
     {
        return res.status(401).json({error:"User is not authorized"}) 
     }
   
      // Attach user info to request object
     req.user = decodedToken


   next()
    } 
    
    catch (error) {
      console.log(error);
      return res.status(401).json({ error: "Invalid or expired token" })  
    }
}
module.exports = authUser;
