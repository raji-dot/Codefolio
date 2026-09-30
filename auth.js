const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ==========================================
// 1. REGISTER NEW DEVELOPER
// ==========================================
// @route   POST /api/auth/register
// @access  Public
router.post("/register", async (req, res) => {
  try {
    const { username, email, password, name } = req.body;
    
    // Check if the username or email is already taken
    let userExists = await User.findOne({ $or: [{ email }, { username }] });
    if (userExists) {
      return res.status(400).json({ message: "Username or Email already taken" });
    }
    
    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // FIXED: Shifted templateId to "theme: 'classic'" to match Dashboard configurations uniformly
    const newUser = new User({ 
      username, 
      email, 
      password: hashedPassword, 
      name, 
      theme: "classic" 
    });
    
    await newUser.save();

    // FIXED: Automatically issue a token on registration to prevent login wall friction
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    return res.status(201).json({ 
      token, 
      user: { id: newUser._id, username: newUser.username, name: newUser.name } 
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ==========================================
// 2. AUTHENTICATE & LOGIN
// ==========================================
// @route   POST /api/auth/login
// @access  Public
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Verify the email exists in the database
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Compare encrypted passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Issue standard, uniform payload token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    
    return res.status(200).json({ 
      token, 
      user: { id: user._id, username: user.username, name: user.name } 
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
