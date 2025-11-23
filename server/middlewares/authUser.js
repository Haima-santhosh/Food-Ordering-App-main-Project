const jwt = require('jsonwebtoken')

// Middleware to check if user is logged in
const authUser = (req, res, next) => {
  try {

    // just checking if cookies exist
    if (!req.cookies) {
      return res.status(401).json({ error: "No cookies found, not authorized" });
    }

    // getting token from cookies
    const { token } = req.cookies;

    // if no token found
    if (!token) {
      return res.status(401).json({ error: "User is not authorized" });
    }

    // verify the token to see if it is valid or changed
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // check if the user is actually a user and not admin
    if (decoded.role !== 'user') {
      return res.status(403).json({ error: "Admins cannot access this route" });
    }

    // if something wrong with token data
    if (!decoded) {
      return res.status(401).json({ error: "User is not authorized" });
    }

    // passing user details to next middleware
    req.user = {
      id: decoded.id || decoded._id,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authUser;
