const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Admin = require("../models/AdminLogin");
require("dotenv").config(); // ✅ Make sure env variables are loaded

// POST /api/admin/login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("🚀 Login attempt:", username);

  try {
    const admin = await Admin.findOne({ username });
    if (!admin) {
      console.log("❌ Admin not found");
      return res.status(404).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log("❌ Password mismatch");
      return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("✅ Admin authenticated");

    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("❌ JWT_SECRET not set in .env");
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    const token = jwt.sign({ username: admin.username }, secret, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, admin });
  } catch (err) {
    console.error("🔥 Server error during login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
