const express = require('express');
const router = express.Router();
const {
  getPortfolioItems,
  getPortfolioItemById,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = require('../controllers/portfolioController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/').get(getPortfolioItems).post(protect, authorizeRoles('Admin'), createPortfolioItem);
router
  .route('/:id')
  .get(getPortfolioItemById)
  .put(protect, authorizeRoles('Admin'), updatePortfolioItem)
  .delete(protect, authorizeRoles('Admin'), deletePortfolioItem);

module.exports = router;
