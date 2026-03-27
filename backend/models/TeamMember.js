const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
  },
  imageUrl: {
    type: String,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
