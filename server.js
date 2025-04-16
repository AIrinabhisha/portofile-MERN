const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/dbConfig');

const portfolioRoute = require('./routes/portfolioRoute');
const adminRouter = require('./routes/adminRouter');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/portfolio', portfolioRoute);
app.use('/api/admin', adminRouter);

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

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
