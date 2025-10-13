const jwt = require('jsonwebtoken')

// function to generate JWT token


// Accepts user ID and role as input

const generateToken = (id, role)=>
{
try {

    // Create the token
    // Payload includes user id and role
    // Token will expire in 1 hour

    const token = jwt.sign({id:id, role:role },
        process.env.JWT_SECRET_KEY,{expiresIn : '1h'})

        return token
    
} 
catch (error) {
    console.log(error)
    throw new Error('Token Generation Failed', error)
    
    
}




}
module.exports = generateToken