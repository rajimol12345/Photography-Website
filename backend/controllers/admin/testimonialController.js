const asyncHandler = require('express-async-handler');
const Testimonial = require('../../models/Testimonial');

// @desc    Get all testimonials with filtering, pagination, and searching
// @route   GET /api/admin/testimonials
// @access  Private/Admin
const getTestimonials = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
      clientName: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {};

  const count = await Testimonial.countDocuments({ ...keyword });
  const testimonials = await Testimonial.find({ ...keyword })
    .sort({ createdAt: -1 })
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ testimonials, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get a single testimonial by id
// @route   GET /api/admin/testimonials/:id
// @access  Private/Admin
const getTestimonialById = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (testimonial) {
    res.json(testimonial);
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});

// @desc    Create a testimonial
// @route   POST /api/admin/testimonials
// @access  Private/Admin
const createTestimonial = asyncHandler(async (req, res) => {
  const { clientName, content, rating, isPublic } = req.body;

  // Validate required fields
  if (!clientName || !content) {
    res.status(400);
    throw new Error('Please add clientName and content for the testimonial');
  }

  const testimonial = new Testimonial({
    clientName,
    content,
    rating,
    isPublic: isPublic !== undefined ? isPublic : false, // Default to false if not provided
  });

  const createdTestimonial = await testimonial.save();
  res.status(201).json(createdTestimonial);
});

// @desc    Update a testimonial
// @route   PUT /api/admin/testimonials/:id
// @access  Private/Admin
const updateTestimonial = asyncHandler(async (req, res) => {
  const { clientName, content, rating, isPublic } = req.body;

  const testimonial = await Testimonial.findById(req.params.id);

  if (testimonial) {
    testimonial.clientName = clientName || testimonial.clientName;
    testimonial.content = content || testimonial.content;
    testimonial.rating = rating || testimonial.rating;
    testimonial.isPublic = isPublic !== undefined ? isPublic : testimonial.isPublic;

    const updatedTestimonial = await testimonial.save();
    res.json(updatedTestimonial);
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});

// @desc    Delete a testimonial
// @route   DELETE /api/admin/testimonials/:id
// @access  Private/Admin
const deleteTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.findById(req.params.id);

  if (testimonial) {
    await Testimonial.deleteOne({ _id: req.params.id });
    res.json({ message: 'Testimonial removed' });
  } else {
    res.status(404);
    throw new Error('Testimonial not found');
  }
});

module.exports = {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};
