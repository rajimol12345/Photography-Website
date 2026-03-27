const asyncHandler = require('express-async-handler');
const Booking = require('../../models/Booking');

// @desc    Get all bookings with filtering, pagination, and searching
// @route   GET /api/admin/bookings
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  // Basic keyword search on client's name (if populated) or notes
  // A more advanced search would require aggregation
  const keyword = req.query.keyword
    ? {
      notes: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {};

  const count = await Booking.countDocuments({ ...keyword });
  const bookings = await Booking.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({ bookings, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get a single booking by id
// @route   GET /api/admin/bookings/:id
// @access  Private/Admin
const getBookingById = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    res.json(booking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

// @desc    Update a booking's status
// @route   PUT /api/admin/bookings/:id/status
// @access  Private/Admin
const updateBookingStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const booking = await Booking.findById(req.params.id);

  if (booking) {
    booking.status = status;
    const updatedBooking = await booking.save();
    res.json(updatedBooking);
  } else {
    res.status(404);
    throw new Error('Booking not found');
  }
});

module.exports = {
  getBookings,
  getBookingById,
  updateBookingStatus,
};
