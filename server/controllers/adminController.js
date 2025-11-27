const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken');
const { cloudinaryInstance } = require('../config/cloudinary');
const upload = require('../middlewares/multer');

// ------------------ SIGNUP ADMIN ------------------
const signup = async (req, res) => {
  try {
    const { name, email, password, profilePic } = req.body || {};

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ message: "Please enter a valid email" });
    }

    if (password.length < 6 || password.length > 20) {
      return res.status(400).json({ message: "Password length must be 6–20 characters" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new User({
      name,
      email,
      password: hashedPassword,
      profilePic,
      role: "admin"
    });

    const saved = await admin.save();
    const adminObj = saved.toObject();
    delete adminObj.password;

    res.status(201).json({
      message: "Admin created successfully!",
      admin: adminObj
    });

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ------------------ SIGNIN ADMIN ------------------

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const admin = await User.findOne({ email });
    if (!admin) return res.status(400).json({ message: "Admin does not exist" });
    if (admin.role !== "admin") return res.status(403).json({ message: "Access denied. Not admin." });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = generateToken(admin._id, "admin");

    // SET COOKIE 
   res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production", // true only in prod HTTPS
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  path: "/",
  maxAge: 7 * 24 * 60 * 60 * 1000
});


    const adminObj = admin.toObject();
    delete adminObj.password;

    res.status(200).json({ message: "Admin signed in", admin: adminObj });

  } catch (error) {
    console.error("Signin error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// ------------------ CHECK ADMIN ------------------
const checkAdmin = async (req, res) => {
  res.json({ message: "Admin is authorized", adminId: req.admin.id });
};

// ------------------ ADMIN PROFILE ------------------
const profile = async (req, res) => {
  try {
    const admin = await User.findOne({ _id: req.admin.id, role: "admin" }).select("-password");

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ admin });

  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ------------------ UPDATE ADMIN PROFILE ------------------
const updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;

    let profilePicUrl = null;
    if (req.file) {
      const upload = await cloudinaryInstance.uploader.upload(req.file.path);
      profilePicUrl = upload.secure_url;
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (profilePicUrl) updateData.profilePic = profilePicUrl;

    const admin = await User.findByIdAndUpdate(
      req.admin.id,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!admin) return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({ message: "Profile updated successfully!", admin });

  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ------------------ GET ALL USERS ------------------
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: "user" }).select("-password");
    res.status(200).json({ users });

  } catch (error) {
    console.error("Get users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

// ------------------ UPDATE USER BY ADMIN ------------------
const updateUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.admin.id === userId) {
      return res.status(403).json({ message: "Admin cannot update their own account here." });
    }

    const { name, phone, email, role, isActive } = req.body;

    let profilePicUrl = null;
    if (req.file) {
      const upload = await cloudinaryInstance.uploader.upload(req.file.path);
      profilePicUrl = upload.secure_url;
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (typeof isActive !== "undefined") updateData.isActive = isActive;
    if (profilePicUrl) updateData.profilePic = profilePicUrl;

    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully!", user });

  } catch (error) {
    console.error("Update user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ------------------ DELETE USER BY ADMIN ------------------
const deleteUserByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;

    if (req.admin.id === userId) {
      return res.status(403).json({ message: "Admin cannot delete their own account here." });
    }

    const user = await User.findByIdAndDelete(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully!" });

  } catch (error) {
    console.error("Delete user error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ------------------ LOGOUT ADMIN ------------------
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

    res.status(200).json({ message: "Admin logged out successfully" });

  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  signup,
  signin,
  checkAdmin,
  profile,
  logout,
  getAllUsers,
  updateUserByAdmin,
  deleteUserByAdmin,
  updateProfile
};
