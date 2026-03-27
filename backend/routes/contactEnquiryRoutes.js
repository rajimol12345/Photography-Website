const express = require('express');
const router = express.Router();
const { createContactEnquiry } = require('../controllers/contactEnquiryController');

router.route('/').post(createContactEnquiry);

module.exports = router;