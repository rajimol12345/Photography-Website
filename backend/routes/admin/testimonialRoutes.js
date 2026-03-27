const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../../controllers/admin/testimonialController');
const { protect, authorizeRoles } = require('../../middleware/authMiddleware');

router
  .route('/')
  .get(protect, authorizeRoles('Admin'), getTestimonials)
  .post(protect, authorizeRoles('Admin'), createTestimonial);

router
  .route('/:id')
  .get(protect, authorizeRoles('Admin'), getTestimonialById)
  .put(protect, authorizeRoles('Admin'), updateTestimonial)
  .delete(protect, authorizeRoles('Admin'), deleteTestimonial);

module.exports = router;
