const express = require('express');
const router = express.Router();
const { getDashboardAnalytics } = require('../../controllers/admin/dashboardController');

router
  .route('/analytics')
  .get(getDashboardAnalytics);

module.exports = router;
