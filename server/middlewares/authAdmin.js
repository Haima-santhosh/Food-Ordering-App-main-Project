const jwt = require('jsonwebtoken');

// Middleware to check if an Admin is logged in
const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    console.log("Token received:", token);

    if (!token) {
      return res.status(401).json({ error: "Admin is not authorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Not an Admin" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("AuthAdmin Error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authAdmin;
