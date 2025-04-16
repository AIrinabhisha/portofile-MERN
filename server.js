const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require("path");

const portfolioRoute = require('./routes/portfolioRoute');
const connectDB = require('./config/dbConfig');
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
  ssl: true,
})
.then(() => {
  console.log('✅ Connected to MongoDB');
})
.catch((err) => {
  console.error('❌ Database connection error:', err.message);
  process.exit(1);
});

// Routes
app.use('/api/portfolio', portfolioRoute);
app.use("/api/admin", adminRouter);

// Root route
app.get('/', (req, res) => {
  res.send('🎉 Portfolio API is running');
});

// ----------- Deployment Setup ----------
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build/index.html'));
  });
}

// ✅ Start server (outside the production check)
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
