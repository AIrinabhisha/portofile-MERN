const mongoose = require("mongoose");

const adminLoginSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Hashed password
});

// Avoid model overwrite issue
module.exports = mongoose.models.AdminLogin || mongoose.model("AdminLogin", adminLoginSchema);
