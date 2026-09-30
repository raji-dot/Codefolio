const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  techStack: [{ type: String }],
  repoLink: { type: String },
  liveLink: { type: String },
  screenshot: { type: String }
});

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  bio: { type: String },
  socialLinks: {
    github: { type: String },
    linkedin: { type: String },
    twitter: { type: String }
  },
  resumeUrl: { type: String },
  skills: {
    frontend: [{ type: String }],
    backend: [{ type: String }],
    devops: [{ type: String }]
  },
  templateId: { type: String, default: "minimalist" },
  isPro: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
