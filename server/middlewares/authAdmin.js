const jwt = require("jsonwebtoken");

const authAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) return res.status(401).json({ error: "Admin not authorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded || decoded.role !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    req.admin = decoded;
    next();
  } catch (error) {
    console.error("AuthAdmin error:", error.message);
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = authAdmin;
