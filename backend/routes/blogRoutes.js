const express = require('express');
const router = express.Router();
const {
  getBlogPosts,
  getBlogPostBySlug,
  getRecentPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
} = require('../controllers/blogController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');

// Public routes
router.route('/').get(getBlogPosts);
router.route('/recent').get(getRecentPosts);
router.route('/slug/:slug').get(getBlogPostBySlug);

// Admin routes
router.route('/').post(protect, authorizeRoles('Admin'), createBlogPost);
router
  .route('/:id')
  .put(protect, authorizeRoles('Admin'), updateBlogPost)
  .delete(protect, authorizeRoles('Admin'), deleteBlogPost);

module.exports = router;
