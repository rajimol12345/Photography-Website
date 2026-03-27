const express = require('express');
const router = express.Router();
const {
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
} = require('../../controllers/admin/contactEnquiryController');

router
  .route('/')
  .get(getEnquiries);

router
  .route('/:id')
  .get(getEnquiryById)
  .put(updateEnquiryStatus)
  .delete(deleteEnquiry);

router
  .route('/:id/status')
  .put(updateEnquiryStatus);

module.exports = router;
