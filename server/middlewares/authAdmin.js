// middlewares/authAdmin.js
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authAdmin = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: 'Not authorized, token missing' });

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const admin = await User.findById(decoded.id);

    if (!admin || admin.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied, not an admin' });
    }

    req.admin = admin; // attach admin to request
    next();
  } catch (err) {
    console.error('authAdmin error:', err);
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};

module.exports = authAdmin;
