const asyncHandler = require('express-async-handler');
const PortfolioItem = require('../../models/PortfolioItem');
const Gallery = require('../../models/Gallery');
const Blog = require('../../models/Blog');
const Booking = require('../../models/Booking');
const Testimonial = require('../../models/Testimonial');
const ContactEnquiry = require('../../models/ContactEnquiry');

// @desc    Get dashboard analytics data
// @route   GET /api/admin/dashboard/analytics
// @access  Private/Admin
const getDashboardAnalytics = asyncHandler(async (req, res) => {
  const portfolioCount = await PortfolioItem.countDocuments();
  const galleryCount = await Gallery.countDocuments();
  const blogCount = await Blog.countDocuments();
  const bookingCount = await Booking.countDocuments();
  const testimonialCount = await Testimonial.countDocuments();
  const newEnquiryCount = await ContactEnquiry.countDocuments({ status: 'new' });

  const recentBookings = await Booking.find({})
    .sort({ createdAt: -1 })
    .limit(5);

  const recentEnquiries = await ContactEnquiry.find({})
    .sort({ createdAt: -1 })
    .limit(5);

  res.json({
    portfolioCount,
    galleryCount,
    blogCount,
    bookingCount,
    testimonialCount,
    newEnquiryCount,
    recentBookings,
    recentEnquiries,
  });
});

module.exports = {
  getDashboardAnalytics,
};
