const jwt = require('jsonwebtoken');

// Middleware to check if an Admin is logged in
const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ error: "Admin is not authorized" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // Role check
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied. Not an Admin" });
    }

    req.admin = decoded; // attach admin info
    next();

  } catch (error) {
    console.error("AuthAdmin Error:", error.message);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authAdmin;
