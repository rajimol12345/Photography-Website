const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const Testimonial = require('../models/Testimonial');

// @desc    Get public testimonials
// @route   GET /api/testimonials
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    const testimonials = await Testimonial.find({ isPublic: true })
        .sort({ createdAt: -1 })
        .limit(10);
    res.json(testimonials);
}));

module.exports = router;
