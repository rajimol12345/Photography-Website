const asyncHandler = require('express-async-handler');
const mongoose = require('mongoose');
const Gallery = require('../../models/Gallery');

// @desc    Get all galleries with filtering, pagination, and searching
// @route   GET /api/admin/galleries
// @access  Private/Admin
const getGalleries = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {};

  const count = await Gallery.countDocuments({ ...keyword });
  const galleries = await Gallery.find({ ...keyword })
    .sort({ createdAt: -1 }) // Sort by newest first
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ galleries, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get a single gallery by id
// @route   GET /api/admin/galleries/:id
// @access  Private/Admin
const getGalleryById = asyncHandler(async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    if (gallery) {
      res.json(gallery);
    } else {
      res.status(404);
      throw new Error('Gallery not found');
    }
  } catch (error) {
    console.error(`[GALLERY-GET] Error fetching gallery ${req.params.id}:`, error.message);
    if (error.kind === 'ObjectId') {
      res.status(404);
      throw new Error('Gallery not found (Invalid ID)');
    }
    res.status(500);
    throw error;
  }
});

// @desc    Create a gallery
// @route   POST /api/admin/galleries
// @access  Private/Admin
const createGallery = asyncHandler(async (req, res) => {
  const { name, description, category, isPublic, items } = req.body;

  const gallery = new Gallery({
    name,
    description,
    category,
    isPublic,
    items: items || [], // Assign the new items array
  });

  const createdGallery = await gallery.save();
  res.status(201).json(createdGallery);
});

// @desc    Update a gallery
// @route   PUT /api/admin/galleries/:id
// @access  Private/Admin
const updateGallery = asyncHandler(async (req, res) => {
  const { name, description, category, isPublic, items } = req.body;
  const galleryId = req.params.id;

  console.log(`[GALLERY-UPDATE] Request for ID: ${galleryId}`);

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(galleryId)) {
    console.warn(`[GALLERY-UPDATE] Invalid ID format: ${galleryId}`);
    res.status(400);
    throw new Error('Invalid gallery ID');
  }

  // Build update object dynamically
  const updateData = {};
  if (name !== undefined) updateData.name = name;
  if (description !== undefined) updateData.description = description;
  if (category !== undefined) updateData.category = category;
  if (isPublic !== undefined) updateData.isPublic = isPublic;

  if (items !== undefined) {
    if (!Array.isArray(items)) {
      res.status(400);
      throw new Error('Items must be an array');
    }
    updateData.items = items.map(item => ({
      imageUrl: item.imageUrl
    }));
  }

  try {
    const updatedGallery = await Gallery.findByIdAndUpdate(
      galleryId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (updatedGallery) {
      console.log('[GALLERY-UPDATE] Success');
      res.json(updatedGallery);
    } else {
      console.warn('[GALLERY-UPDATE] Gallery not found');
      res.status(404);
      throw new Error('Gallery not found');
    }
  } catch (error) {
    console.error('[GALLERY-UPDATE] Save Failed:', error.message);
    if (error.name === 'ValidationError') {
      res.status(400);
      const messages = Object.values(error.errors).map(val => val.message);
      throw new Error(`Validation Error: ${messages.join(', ')}`);
    }
    res.status(500);
    throw new Error(`Gallery update failed: ${error.message}`);
  }
});

// @desc    Delete a gallery
// @route   DELETE /api/admin/galleries/:id
// @access  Private/Admin
const deleteGallery = asyncHandler(async (req, res) => {
  const gallery = await Gallery.findById(req.params.id);

  if (gallery) {
    // Note: This does not delete the portfolio items within the gallery
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
