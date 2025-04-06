const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const portfolioRoute = require('./routes/portfolioRoute');
const connectDB = require('./config/dbConfig');
// Load environment variables from .env file
const adminRouter = require("./routes/adminRouter");
dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true, // Enables TLS/SSL if using Atlas
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((err) => {
  console.error('❌ Database connection error:', err.message);
  // Optional: log full stack in dev
  // console.error(err);
  process.exit(1); // Exit app on DB connection error
});

// Routes
app.use('/api/portfolio', portfolioRoute);
app.use("/api/admin", adminRouter);


// Root route
app.get('/', (req, res) => {
  res.send('🎉 Portfolio API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
const path = require("path");
if(process.env.MONGO_URI === "production")
{
  app.use(express.static(path.join(__dirname, "client/build")))
  app.get("*", (req,res) => {
    res.sendFile(path.jsion(__dirname, "client/build/index.html"))
  })
}
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
