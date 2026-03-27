const express = require('express');
const router = express.Router();
const {
  getBookings,
  getBookingById,
  updateBookingStatus,
} = require('../../controllers/admin/bookingController');

router
  .route('/')
  .get(getBookings);

router
  .route('/:id')
  .get(getBookingById)

router
    .route('/:id/status')
    .put(updateBookingStatus);

module.exports = router;
