const express = require('express');
const router = express.Router();
const {
  getHeroSlides,
  getAdminHeroSlides,
  getHeroSlideById,
  createHeroSlide,
  updateHeroSlide,
  deleteHeroSlide,
} = require('../controllers/heroSlideController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes
router.route('/').get(getHeroSlides);
router.route('/:id').get(getHeroSlideById);

// Admin routes
router.route('/admin').get(protect, authorizeRoles('Admin'), getAdminHeroSlides);
router.route('/admin')
  .post(protect, authorizeRoles('Admin'), createHeroSlide);
router
  .route('/admin/:id')
  .put(protect, authorizeRoles('Admin'), updateHeroSlide)
  .delete(protect, authorizeRoles('Admin'), deleteHeroSlide);

module.exports = router;
