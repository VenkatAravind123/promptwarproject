const mongoose = require('mongoose');

const ActivitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['transport', 'diet', 'energy'], 
    required: true 
  },
  value: { type: Number, required: true }, // e.g., miles driven, kWh used
  description: { type: String },
  co2e: { type: Number, required: true }, // Calculated Carbon Equivalent in kg
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Activity', ActivitySchema);
