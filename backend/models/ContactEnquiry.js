const mongoose = require('mongoose');

const ContactEnquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: false,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'read', 'archived'],
    default: 'new',
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('ContactEnquiry', ContactEnquirySchema);
