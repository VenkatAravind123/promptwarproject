const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Disable command buffering so queries fail immediately if the DB is disconnected
mongoose.set('bufferCommands', false);

// Middleware to ensure database connection is established before route handlers run
let isConnected = false;
const connectDB = async (req, res, next) => {
  // If connection is already established, proceed
  if (isConnected || mongoose.connection.readyState >= 1) {
    return next();
  }

  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI);
    isConnected = true;
    console.log('Connected to MongoDB');
    next();
  } catch (err) {
    console.error('Database connection error:', err);
    res.status(500).json({ msg: 'Database connection failed: ' + err.message });
  }
};

// Add database connection middleware before routes
app.use(connectDB);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/activities', require('./routes/activities'));
app.use('/api/assistant', require('./routes/assistant'));

// Base route
app.get('/', (req, res) => {
  res.json({ status: 'ok', message: 'EcoSmart AI API is running' });
});

// Only listen when running locally, not under Vercel Serverless Functions
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

module.exports = app;

