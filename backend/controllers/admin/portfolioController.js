const asyncHandler = require('express-async-handler');
const PortfolioItem = require('../../models/PortfolioItem');

// @desc    Get all portfolio items with filtering, pagination, and searching
// @route   GET /api/admin/portfolios
// @access  Private/Admin
const getPortfolioItems = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
      title: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {};

  const count = await PortfolioItem.countDocuments({ ...keyword });
  const portfolioItems = await PortfolioItem.find({ ...keyword })
    .sort({ createdAt: -1 }) // Sort by newest first
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .populate('gallery', 'name');

  res.json({ portfolioItems, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get a single portfolio item by id
// @route   GET /api/admin/portfolios/:id
// @access  Private/Admin
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
// @route   POST /api/admin/portfolios
// @access  Private/Admin
const createPortfolioItem = asyncHandler(async (req, res) => {
  const { title, description, category, tags, gallery, isFeatured, isPublic, imageUrl } = req.body;

  if (!title || !imageUrl) {
    res.status(400);
    throw new Error('Please provide title and image URL');
  }

  // Construct item only with valid fields to avoid undefined/casting issues
  const portfolioData = {
    title,
    description,
    category,
    tags: tags || [],
    isFeatured: isFeatured !== undefined ? isFeatured : false,
    isPublic: isPublic !== undefined ? isPublic : true,
    imageUrl, // Validated above
  };

  // Only add gallery if it's a valid ObjectId (prevent CastError)
  const mongoose = require('mongoose');
  if (gallery && mongoose.Types.ObjectId.isValid(gallery)) {
    portfolioData.gallery = gallery;
  }

  try {
    const portfolioItem = new PortfolioItem(portfolioData);
    const createdPortfolioItem = await portfolioItem.save();
    res.status(201).json(createdPortfolioItem);
  } catch (error) {
    console.error('[PORTFOLIO-CREATE] Save Failed:', error.message);
    if (error.name === 'ValidationError') {
      res.status(400);
      const messages = Object.values(error.errors).map(val => val.message);
      throw new Error(`Validation Error: ${messages.join(', ')}`);
    }
    res.status(500);
    throw new Error(`Portfolio creation failed: ${error.message}`);
  }
});

// @desc    Update a portfolio item
// @route   PUT /api/admin/portfolios/:id
// @access  Private/Admin
const updatePortfolioItem = asyncHandler(async (req, res) => {
  const { title, description, category, tags, gallery, isFeatured, isPublic, imageUrl } = req.body;
  const itemId = req.params.id;

  const updateData = {};
  if (title !== undefined) updateData.title = title;
  if (description !== undefined) updateData.description = description;
  if (category !== undefined) updateData.category = category;
  if (tags !== undefined) updateData.tags = tags;
  if (gallery !== undefined) updateData.gallery = gallery;
  if (isFeatured !== undefined) updateData.isFeatured = isFeatured;
  if (isPublic !== undefined) updateData.isPublic = isPublic;
  if (imageUrl !== undefined) updateData.imageUrl = imageUrl;

  try {
    const updatedPortfolioItem = await PortfolioItem.findByIdAndUpdate(
      itemId,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (updatedPortfolioItem) {
      res.json(updatedPortfolioItem);
    } else {
      res.status(404);
      throw new Error('Portfolio item not found');
    }
  } catch (error) {
    console.error('[PORTFOLIO-UPDATE] Save Failed:', error.message);
    if (error.name === 'ValidationError') {
      res.status(400);
      const messages = Object.values(error.errors).map(val => val.message);
      throw new Error(`Validation Error: ${messages.join(', ')}`);
    }
    res.status(500);
    throw new Error(`Portfolio update failed: ${error.message}`);
  }
});

// @desc    Delete a portfolio item
// @route   DELETE /api/admin/portfolios/:id
// @access  Private/Admin
const deletePortfolioItem = asyncHandler(async (req, res) => {
  const portfolioItem = await PortfolioItem.findById(req.params.id);

  if (portfolioItem) {
    // You might want to remove the image from storage here as well
    await PortfolioItem.deleteOne({ _id: req.params.id });
    res.json({ message: 'Portfolio item removed' });
  } else {
    res.status(4404);
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
