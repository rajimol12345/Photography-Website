const express = require('express');
const router = express.Router();
const {
  getAllServicePackages,
  getServicePackageById,
  createServicePackage,
  updateServicePackage,
  deleteServicePackage,
} = require('../controllers/servicePackageController');
const { protect, authorizeRoles } = require('../middleware/authMiddleware');

router.route('/')
  .get(getAllServicePackages)
  .post(protect, authorizeRoles('Admin'), createServicePackage);

router.route('/:id')
  .get(getServicePackageById)
  .put(protect, authorizeRoles('Admin'), updateServicePackage)
  .delete(protect, authorizeRoles('Admin'), deleteServicePackage);

module.exports = router;
