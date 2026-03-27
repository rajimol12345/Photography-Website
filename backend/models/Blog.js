const mongoose = require('mongoose');

// We will need a way to generate slugs. A common way is a pre-save hook.
// Let's define a basic slugify function for now.
const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '') // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
};

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
  },
  slug: {
    type: String,
    unique: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please add an excerpt'],
    maxlength: [300, 'Excerpt can not be more than 300 characters'],
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL'],
  },
  author: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category',
    required: true,
  },
  tags: [String],
  isPublic: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Create blog slug from the title before saving
BlogSchema.pre('save', function(next) {
  if (!this.isModified('title')) {
    next();
  }
  this.slug = slugify(this.title);
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
