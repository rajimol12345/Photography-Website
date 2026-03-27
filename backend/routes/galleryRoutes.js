const express = require('express');
const router = express.Router();
const {
  getGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require('../controllers/galleryController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/').get(getGalleries).post(protect, authorizeRoles('Admin'), createGallery);
router
  .route('/:id')
  .get(getGalleryById)
  .put(protect, authorizeRoles('Admin'), updateGallery)
  .delete(protect, authorizeRoles('Admin'), deleteGallery);

module.exports = router;
