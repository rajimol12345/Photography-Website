const mongoose = require('mongoose');

const ServicePackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  duration: { // e.g., '2 hours', 'Full Day'
    type: String,
  },
  features: [
    {
      type: String,
    }
  ],
  category: { // e.g., 'Wedding', 'Portrait', 'Event'
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ServicePackage', ServicePackageSchema);
