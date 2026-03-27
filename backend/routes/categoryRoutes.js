const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategoryStats,
  createCategory,
  updateCategory, // Import updateCategory
  deleteCategory,
} = require('../controllers/categoryController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/').get(getCategories).post(protect, authorizeRoles('Admin'), createCategory);
router.route('/stats').get(getCategoryStats);
router
  .route('/:id')
  .put(protect, authorizeRoles('Admin'), updateCategory)
  .delete(protect, authorizeRoles('Admin'), deleteCategory);

module.exports = router;
