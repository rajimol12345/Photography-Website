const express = require('express');
const router = express.Router();
const {
    createBooking,
    getBookings,
    getBookingSummary,
    updateBooking, // Import updateBooking
    deleteBooking
} = require('../controllers/bookingController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
    .post(createBooking) // Public route for creating bookings
    .get(protect, authorizeRoles('Admin'), getBookings); // Admin route

router.route('/summary').get(protect, authorizeRoles('Admin'), getBookingSummary); // Admin route
router
    .route('/:id')
    .put(protect, authorizeRoles('Admin'), updateBooking) // Admin route
    .delete(protect, authorizeRoles('Admin'), deleteBooking); // Admin route

module.exports = router;
