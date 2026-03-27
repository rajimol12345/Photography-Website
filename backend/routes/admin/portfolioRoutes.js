const express = require('express');
const router = express.Router();
const {
  getPortfolioItems,
  getPortfolioItemById,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} = require('../../controllers/admin/portfolioController');

// All these routes are for admins only
router
  .route('/')
  .get(getPortfolioItems)
  .post(createPortfolioItem);

router
  .route('/:id')
  .get(getPortfolioItemById)
  .put(updatePortfolioItem)
  .delete(deletePortfolioItem);

module.exports = router;
