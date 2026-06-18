const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Activity = require('../models/Activity');

const router = express.Router();

// Calculate CO2e based on type and value
// Very basic assumptions for the hackathon
const calculateCo2e = (type, value) => {
  switch (type) {
    case 'transport':
      return value * 0.4; // 0.4 kg CO2e per mile driven
    case 'diet':
      return value * 2.5; // 2.5 kg CO2e per meat meal
    case 'energy':
      return value * 0.9; // 0.9 kg CO2e per kWh
    default:
      return 0;
  }
};

// @route   POST /api/activities
// @desc    Log a new activity
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { type, value, description } = req.body;
    
    const co2e = calculateCo2e(type, value);

    const newActivity = new Activity({
      user: req.user,
      type,
      value,
      description,
      co2e
    });

    const activity = await newActivity.save();
    res.json(activity);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET /api/activities
// @desc    Get all activities for a user
// @access  Private
router.get('/', authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user }).sort({ date: -1 });
    res.json(activities);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
