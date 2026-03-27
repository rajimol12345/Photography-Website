const express = require('express');
const router = express.Router();
const { uploadMedia, getMediaByFilename, deleteMedia } = require('../controllers/uploadController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// This function will be called from server.js, passing the initialized 'upload' multer instance.
module.exports = (upload) => {
  router.route('/')
    .post(protect, authorizeRoles('Admin'), upload.array('images', 10), uploadMedia);

  router.route('/:filename').get(getMediaByFilename); // Public access to images

  router.route('/:id').delete(protect, authorizeRoles('Admin'), deleteMedia);

  return router;
};
