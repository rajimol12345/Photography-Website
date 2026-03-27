const asyncHandler = require('express-async-handler');
const HeroSlide = require('../models/HeroSlide');

// @desc    Get all hero slides
// @route   GET /api/hero-slides
// @access  Public
const getHeroSlides = asyncHandler(async (req, res) => {
  const heroSlides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
  res.json(heroSlides);
});

// @desc    Get all hero slides (admin)
// @route   GET /api/admin/hero-slides
// @access  Private/Admin
const getAdminHeroSlides = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const count = await HeroSlide.countDocuments({});
  const heroSlides = await HeroSlide.find({})
    .sort({ order: 1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ heroSlides, page, pages: Math.ceil(count / pageSize) });
});


// @desc    Get a single hero slide by id
// @route   GET /api/hero-slides/:id
// @access  Public
const getHeroSlideById = asyncHandler(async (req, res) => {
  const heroSlide = await HeroSlide.findById(req.params.id);

  if (heroSlide) {
    res.json(heroSlide);
  } else {
    res.status(404);
    throw new Error('Hero slide not found');
  }
});

// @desc    Create a hero slide
// @route   POST /api/admin/hero-slides
// @access  Private/Admin
const createHeroSlide = asyncHandler(async (req, res) => {
  const { imageUrl, title, subtitle, buttonText, buttonLink, order, isActive } = req.body;

  // Validate required fields
  if (!imageUrl || !title) {
    res.status(400);
    throw new Error('Please provide imageUrl and title for the hero slide');
  }

  const heroSlide = new HeroSlide({
    imageUrl,
    title,
    subtitle,
    buttonText,
    buttonLink,
    order: order !== undefined ? order : 0,
    isActive: isActive !== undefined ? isActive : true,
  });

  const createdHeroSlide = await heroSlide.save();
  res.status(201).json(createdHeroSlide);
});

// @desc    Update a hero slide
// @route   PUT /api/admin/hero-slides/:id
// @access  Private/Admin
const updateHeroSlide = asyncHandler(async (req, res) => {
  const { imageUrl, title, subtitle, buttonText, buttonLink, order, isActive } = req.body;

  const heroSlide = await HeroSlide.findById(req.params.id);

  if (heroSlide) {
    heroSlide.imageUrl = imageUrl || heroSlide.imageUrl;
    heroSlide.title = title || heroSlide.title;
    heroSlide.subtitle = subtitle !== undefined ? subtitle : heroSlide.subtitle;
    heroSlide.buttonText = buttonText !== undefined ? buttonText : heroSlide.buttonText;
    heroSlide.buttonLink = buttonLink !== undefined ? buttonLink : heroSlide.buttonLink;
    heroSlide.order = order !== undefined ? order : heroSlide.order;
    heroSlide.isActive = isActive !== undefined ? isActive : heroSlide.isActive;

    const updatedHeroSlide = await heroSlide.save();
    res.json(updatedHeroSlide);
  } else {
    res.status(404);
    throw new Error('Hero slide not found');
  }
});

// @desc    Delete a hero slide
// @route   DELETE /api/admin/hero-slides/:id
// @access  Private/Admin
const deleteHeroSlide = asyncHandler(async (req, res) => {
  const heroSlide = await HeroSlide.findById(req.params.id);

  if (heroSlide) {
    await HeroSlide.deleteOne({ _id: req.params.id });
    res.json({ message: 'Hero slide removed' });
  } else {
    res.status(404);
    throw new Error('Hero slide not found');
  }
});

module.exports = {
  getHeroSlides,
  getAdminHeroSlides,
  getHeroSlideById,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
};
