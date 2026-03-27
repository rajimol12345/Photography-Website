const asyncHandler = require('express-async-handler');
const ServicePackage = require('../models/ServicePackage');

// @desc    Get all service packages
// @route   GET /api/servicepackages
// @access  Public
const getAllServicePackages = asyncHandler(async (req, res) => {
  const page = Number(req.query.pageNumber) || 0; // 0 means no pagination
  const pageSize = 10;

  if (page > 0) {
    const count = await ServicePackage.countDocuments({});
    const servicePackages = await ServicePackage.find({})
      .sort({ createdAt: -1 })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ servicePackages, page, pages: Math.ceil(count / pageSize) });
  } else {
    // Default public behavior: return all (maybe sorted)
    const servicePackages = await ServicePackage.find({}).sort({ createdAt: -1 });
    res.json(servicePackages);
  }
});

// @desc    Get service package by ID
// @route   GET /api/servicepackages/:id
// @access  Public
const getServicePackageById = asyncHandler(async (req, res) => {
  const servicePackage = await ServicePackage.findById(req.params.id);

  if (servicePackage) {
    res.json(servicePackage);
  } else {
    res.status(404);
    throw new Error('Service package not found');
  }
});

// @desc    Create a service package
// @route   POST /api/servicepackages
// @access  Private/Admin
const createServicePackage = asyncHandler(async (req, res) => {
  const { name, description, price, duration, features, category, isAvailable } = req.body;

  if (!name || !description || !price || !category) {
    res.status(400);
    throw new Error('Please fill out all required fields: name, description, price, category');
  }

  const servicePackage = new ServicePackage({
    name,
    description,
    price,
    duration,
    features: features || [],
    category,
    isAvailable: isAvailable !== undefined ? isAvailable : true,
  });

  const createdServicePackage = await servicePackage.save();
  res.status(201).json(createdServicePackage);
});

// @desc    Update a service package
// @route   PUT /api/servicepackages/:id
// @access  Private/Admin
const updateServicePackage = asyncHandler(async (req, res) => {
  const { name, description, price, duration, features, category, isAvailable } = req.body;

  const servicePackage = await ServicePackage.findById(req.params.id);

  if (servicePackage) {
    servicePackage.name = name || servicePackage.name;
    servicePackage.description = description || servicePackage.description;
    servicePackage.price = price !== undefined ? price : servicePackage.price;
    servicePackage.duration = duration || servicePackage.duration;
    servicePackage.features = features !== undefined ? features : servicePackage.features;
    servicePackage.category = category || servicePackage.category;
    servicePackage.isAvailable = isAvailable !== undefined ? isAvailable : servicePackage.isAvailable;

    const updatedServicePackage = await servicePackage.save();
    res.json(updatedServicePackage);
  } else {
    res.status(404);
    throw new Error('Service package not found');
  }
});

// @desc    Delete a service package
// @route   DELETE /api/servicepackages/:id
// @access  Private/Admin
const deleteServicePackage = asyncHandler(async (req, res) => {
  const servicePackage = await ServicePackage.findById(req.params.id);

  if (servicePackage) {
    await ServicePackage.deleteOne({ _id: req.params.id });
    res.json({ message: 'Service package removed' });
  } else {
    res.status(404);
    throw new Error('Service package not found');
  }
});

module.exports = {
  getAllServicePackages,
  getServicePackageById,
  createServicePackage,
  updateServicePackage,
  deleteServicePackage,
};
