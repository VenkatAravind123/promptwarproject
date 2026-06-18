const express = require('express');
const authMiddleware = require('../middleware/authMiddleware');
const Activity = require('../models/Activity');

const router = express.Router();

// @route   GET /api/assistant/insights
// @desc    Get smart AI recommendations based on user data
// @access  Private
router.get('/insights', authMiddleware, async (req, res) => {
  try {
    const activities = await Activity.find({ user: req.user });
    
    // Aggregate Data
    let transportCo2 = 0;
    let dietCo2 = 0;
    let energyCo2 = 0;

    activities.forEach(act => {
      if(act.type === 'transport') transportCo2 += act.co2e;
      if(act.type === 'diet') dietCo2 += act.co2e;
      if(act.type === 'energy') energyCo2 += act.co2e;
    });

    const totalCo2 = transportCo2 + dietCo2 + energyCo2;
    const recommendations = [];

    // Smart Assistant Logic / Rules
    if (totalCo2 === 0) {
      recommendations.push({
        type: 'General',
        message: 'Welcome! Start logging your daily activities so I can help you reduce your carbon footprint.'
      });
      return res.json({ totalCo2, recommendations });
    }

    if (transportCo2 > dietCo2 && transportCo2 > energyCo2) {
      recommendations.push({
        type: 'Transport',
        message: `Your transport emissions (${transportCo2.toFixed(1)} kg CO2e) are your highest contributor. Consider carpooling, taking public transit, or cycling for short trips.`
      });
    }

    if (dietCo2 > 10) {
      recommendations.push({
        type: 'Diet',
        message: 'Your diet-related emissions are notable. Try substituting one meat-based meal a week with a plant-based alternative to drastically cut down emissions.'
      });
    }

    if (energyCo2 > 20) {
      recommendations.push({
        type: 'Energy',
        message: 'Your energy usage is slightly high. Unplugging idle electronics and switching to LED bulbs can save both carbon and money.'
      });
    }

    if (recommendations.length === 0) {
      recommendations.push({
        type: 'Praise',
        message: 'You are doing a fantastic job keeping your carbon footprint low. Keep up the sustainable lifestyle!'
      });
    }

    res.json({ totalCo2, breakdown: { transportCo2, dietCo2, energyCo2 }, recommendations });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
