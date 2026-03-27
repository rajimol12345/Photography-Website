const asyncHandler = require('express-async-handler');
const PortfolioItem = require('../models/PortfolioItem');
const Gallery = require('../models/Gallery');

// @desc    Fetch all portfolio items or items by gallery
// @route   GET /api/portfolio
// @access  Public
const getPortfolioItems = asyncHandler(async (req, res) => {
  const { galleryId } = req.query;

  let query = { isPublic: true }; // Only return public items
  if (galleryId) {
    query.gallery = galleryId;
  }

  const portfolioItems = await PortfolioItem.find(query).sort({ createdAt: -1 });

  res.json(portfolioItems);
});

// @desc    Fetch a single portfolio item
// @route   GET /api/portfolio/:id
// @access  Public
const getPortfolioItemById = asyncHandler(async (req, res) => {
  const portfolioItem = await PortfolioItem.findById(req.params.id);

  if (portfolioItem) {
    res.json(portfolioItem);
  } else {
    res.status(404);
    throw new Error('Portfolio item not found');
  }
});

// @desc    Create a portfolio item
// @route   POST /api/portfolio
// @access  Private
const createPortfolioItem = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, category, tags, gallery, isFeatured, isPublic } = req.body;

  // Validate required fields
  if (!title || !imageUrl) {
    res.status(400);
    throw new Error('Please add title and imageUrl');
  }

  // Validate Gallery ID if provided
  if (gallery) {
    const existingGallery = await Gallery.findById(gallery);
    if (!existingGallery) {
      res.status(400);
      throw new Error('Invalid Gallery ID');
    }
  }

  const portfolioItem = new PortfolioItem({
    title,
    description,
    imageUrl, // Use imageUrl directly
    category,
    tags: tags || [],
    gallery: gallery || null, // Assign gallery if provided
    isFeatured: isFeatured !== undefined ? isFeatured : false,
    isPublic: isPublic !== undefined ? isPublic : true,
  });

  const createdPortfolioItem = await portfolioItem.save();
  // Populate gallery for the response
  await createdPortfolioItem.populate('gallery', 'name description');
  res.status(201).json(createdPortfolioItem);
});

// @desc    Update a portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private
const updatePortfolioItem = asyncHandler(async (req, res) => {
  const { title, description, imageUrl, category, tags, gallery, isFeatured, isPublic } = req.body;

  const portfolioItem = await PortfolioItem.findById(req.params.id);

  if (portfolioItem) {
    portfolioItem.title = title || portfolioItem.title;
    portfolioItem.description = description || portfolioItem.description;
    portfolioItem.imageUrl = imageUrl || portfolioItem.imageUrl; // Use imageUrl directly
    portfolioItem.category = category || portfolioItem.category;
    portfolioItem.tags = tags || portfolioItem.tags;
    portfolioItem.isFeatured = isFeatured !== undefined ? isFeatured : portfolioItem.isFeatured;
    portfolioItem.isPublic = isPublic !== undefined ? isPublic : portfolioItem.isPublic;

    // Validate Gallery ID if provided and updated
    if (gallery) {
      const existingGallery = await Gallery.findById(gallery);
      if (!existingGallery) {
        res.status(400);
        throw new Error('Invalid Gallery ID');
      }
      portfolioItem.gallery = existingGallery._id;
    } else if (gallery === null) { // Allow setting gallery to null
      portfolioItem.gallery = null;
    }

    const updatedPortfolioItem = await portfolioItem.save();
    // Populate gallery for the response
    await updatedPortfolioItem.populate('gallery', 'name description');
    res.json(updatedPortfolioItem);
  } else {
    res.status(404);
    throw new Error('Portfolio item not found');
  }
});

// @desc    Delete a portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private
const deletePortfolioItem = asyncHandler(async (req, res) => {
  const portfolioItem = await PortfolioItem.findById(req.params.id);

  if (portfolioItem) {
    await PortfolioItem.deleteOne({ _id: req.params.id });
    res.json({ message: 'Portfolio item removed' });
  } else {
    res.status(404);
    throw new Error('Portfolio item not found');
  }
});

module.exports = {
  getPortfolioItems,
  getPortfolioItemById,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
};
