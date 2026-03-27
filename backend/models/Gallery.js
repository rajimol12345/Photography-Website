const mongoose = require('mongoose');

const GallerySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
  },
  category: { // e.g., 'Weddings', 'Portraits', 'Events'
    type: String,
    required: true,
  },

  isPublic: {
    type: Boolean,
    default: true,
  },
  items: [
    {
      imageUrl: {
        type: String,
        required: true,
      },
    },
  ],
}, {
  timestamps: true,
});

module.exports = mongoose.models.Gallery || mongoose.model('Gallery', GallerySchema);
