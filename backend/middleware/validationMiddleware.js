const Joi = require('joi');

const validate = (schema, property) => (req, res, next) => {
  const { error } = schema.validate(req[property]);
  if (error) {
    const message = error.details.map((i) => i.message).join(',');
    res.status(400).json({ message });
  } else {
    next();
  }
};

const schemas = {
  // Auth Validation
  loginSchema: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  }),

  // Booking Validation
  createBookingSchema: Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    servicePackageId: Joi.string().required(),
    appointmentDate: Joi.date().iso().required(),
    phone: Joi.string().required(),
    notes: Joi.string().allow(''),
    totalPrice: Joi.number().min(0).required(),
  }),

  updateBookingStatusSchema: Joi.object({
    status: Joi.string().valid('pending', 'confirmed', 'completed', 'cancelled').required(),
  }),

  // Portfolio Item Validation (simplified for now)
  createPortfolioItemSchema: Joi.object({
    title: Joi.string().allow(''),
    description: Joi.string().allow(''),
    imageUrl: Joi.string().uri().required(),
    publicId: Joi.string().required(),
    dimensions: Joi.object({
      width: Joi.number().integer().min(1),
      height: Joi.number().integer().min(1),
    }),
    category: Joi.string(),
    tags: Joi.array().items(Joi.string()),
    gallery: Joi.string(), // Assuming gallery ID
    isFeatured: Joi.boolean(),
  }),
};

module.exports = { validate, schemas };
