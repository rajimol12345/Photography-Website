const mongoose = require('mongoose');

const PortfolioItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
  },
  tags: [String],
  gallery: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Gallery',
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isPublic: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('PortfolioItem', PortfolioItemSchema);
