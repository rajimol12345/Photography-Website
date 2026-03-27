const express = require('express');
const router = express.Router();
const {
  getGalleries,
  getGalleryById,
  createGallery,
  updateGallery,
  deleteGallery,
} = require('../../controllers/admin/galleryController');

router
  .route('/')
  .get(getGalleries)
  .post(createGallery);

router
  .route('/:id')
  .get(getGalleryById)
  .put(updateGallery)
  .delete(deleteGallery);

module.exports = router;
