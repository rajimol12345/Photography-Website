const asyncHandler = require('express-async-handler');
const Gallery = require('../models/Gallery');
const PortfolioItem = require('../models/PortfolioItem');

// @desc    Fetch all galleries
// @route   GET /api/galleries
// @access  Public
const getGalleries = asyncHandler(async (req, res) => {
  const galleries = await Gallery.find({});
  res.json(galleries);
});

// @desc    Fetch a single gallery
// @route   GET /api/galleries/:id
// @access  Public
const getGalleryById = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);

  if (gallery) {
    res.json(gallery);
  } else {
    res.status(404);
    throw new Error('Gallery not found');
  }
});

// @desc    Create a gallery
// @route   POST /api/galleries
// @access  Private
const createGallery = asyncHandler(async (req, res) => {
  const { name, description, category, isPublic, items } = req.body;

  // Validate required fields
  if (!name || !category) {
    res.status(400);
    throw new Error('Please add a name and category for the gallery');
  }

  const gallery = new Gallery({
    name,
    description,
    category,
    isPublic: isPublic !== undefined ? isPublic : true,
    items: items || [], // Assign the new items array
  });

  const createdGallery = await gallery.save();
  res.status(201).json(createdGallery);
});

// @desc    Update a gallery
// @route   PUT /api/galleries/:id
// @access  Private
const updateGallery = asyncHandler(async (req, res) => {
  const { name, description, category, isPublic, items } = req.body;

  const gallery = await Gallery.findById(req.params.id);

  if (gallery) {
    gallery.name = name || gallery.name;
    gallery.description = description || gallery.description;
    gallery.category = category || gallery.category;
    gallery.isPublic = isPublic !== undefined ? isPublic : gallery.isPublic;
    gallery.items = items !== undefined ? items : gallery.items; // Update the items array


    const updatedGallery = await gallery.save();
    res.json(updatedGallery);
  } else {
    res.status(404);
    throw new Error('Gallery not found');
  }
});

// @desc    Delete a gallery
// @route   DELETE /api/galleries/:id
// @access  Private
const deleteGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);

  if (gallery) {
    await Gallery.deleteOne({ _id: req.params.id });
    res.json({ message: 'Gallery removed' });
  } else {
    res.status(404);
    throw new Error('Gallery not found');
  }
});

module.exports = {
  getGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
};
