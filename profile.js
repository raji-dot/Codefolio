const express = require("express");
const router = express.Router();
const auth = require("../Middleware/authMiddleware");
const User = require("../models/User");
const nodemailer = require("nodemailer");

// ==========================================
// 1. GET CURRENT LOGGED IN USER DATA
// ==========================================
// @route   GET /api/profile/me
// @access  Protected
router.get("/me", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// ==========================================
// 2. UPDATE PROFILE DATA 
// ==========================================
// @route   POST /api/profile/
// @access  Protected
router.post("/", auth, async (req, res) => {
  try {
    const { name, bio, resumeUrl, theme, isPro, socialLinks, skills, title } = req.body;

    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (name) user.name = name;
    if (title) user.title = title;
    if (bio) user.bio = bio;
    if (resumeUrl) user.resumeUrl = resumeUrl;
    if (theme) user.theme = theme; 
    if (typeof isPro !== "undefined") user.isPro = isPro;
    if (socialLinks) user.socialLinks = socialLinks;
    if (skills) user.skills = skills;

    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Profile update failure", error: error.message });
  }
});

// ==========================================
// 3. PUSH SINGLE PROJECT RECORD
// ==========================================
// @route   POST /api/profile/projects
// @access  Protected
router.post("/projects", auth, async (req, res) => {
  try {
    const { title, description, techStack, repoLink, liveLink } = req.body;
    
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User metrics mismatch logs" });

    if (!user.projects) {
      user.projects = [];
    }

    user.projects.push({ title, description, techStack, repoLink, liveLink });
    await user.save();

    res.status(201).json(user.projects);
  } catch (error) {
    res.status(500).json({ message: "Database push configuration arrays error", error: error.message });
  }
});

// ==========================================
// 4. GET PUBLIC DEV PORTFOLIO BY VANITY URL 
// ==========================================
// @route   GET /api/profile/public/:username
// @access  Public
router.get("/public/:username", async (req, res) => {
  try {
    const rawParam = req.params.username;
    const cleanSearchTerm = decodeURIComponent(rawParam).trim();

    // FIXED: Removed all structural backslashes before or and regex keywords
    const user = await User.findOne({
      $or: [
        { username: { $regex: new RegExp(`^${cleanSearchTerm}$`, "i") } },
        { name: { $regex: new RegExp(`^${cleanSearchTerm}$`, "i") } }
      ]
    }).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Developer portfolio matching context empty metrics" });
    }
    
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ 
      message: "Server registry lookup execution error path failure", 
      error: error.message 
    });
  }
});

// ==========================================
// 5. PUBLIC CONTACT EMAIL OUTREACH
// ==========================================
// @route   POST /api/profile/contact/:username
// @access  Public
router.post("/contact/:username", async (req, res) => {
  try {
    const { senderEmail, messageText, senderName } = req.body;
    const developer = await User.findOne({ username: req.params.username });
    if (!developer) return res.status(404).json({ message: "Recipient not found" });

    const transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email", 
      port: 587,
      auth: { user: "sandbox.evaluator@ethereal.email", pass: "MockPassword123" }
    });

    await transporter.sendMail({
      from: `"CodeFolio Outreach" <contact@codefolio.com>`, 
      to: developer.email,
      subject: `💼 New Inquiry from ${senderName}`,
      text: `From: ${senderName} (${senderEmail})\n\nMessage:\n${messageText}`
    });
    
    return res.status(200).json({ message: "Message forwarded securely via API!" });
  } catch (error) { 
    return res.status(500).json({ message: "Email system error routing failure", error: error.message }); 
  }
});

module.exports = router;
