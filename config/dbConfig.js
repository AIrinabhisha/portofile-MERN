const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("🔌 Connecting to MongoDB...");
    console.log("URI:", process.env.MONGO_URI); // ⚠️ Optional: Remove in production

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
