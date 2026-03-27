const asyncHandler = require('express-async-handler');
const ContactEnquiry = require('../models/ContactEnquiry');
const nodemailer = require('nodemailer'); // Assuming nodemailer is configured

// @desc    Create a new contact enquiry
// @route   POST /api/contact-enquiries
// @access  Public
const createContactEnquiry = asyncHandler(async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    res.status(400);
    throw new Error('Please fill out all required fields: name, email, message');
  }

  const contactEnquiry = new ContactEnquiry({
    name,
    email,
    phone,
    message,
    status: 'new', // Default status
  });

  const createdEnquiry = await contactEnquiry.save();

  // Optional: Send email notification
  // if (process.env.NODE_ENV === 'production') {
  //   const transporter = nodemailer.createTransport({
  //     // configure your email service
  //     service: 'Gmail', // e.g., 'Gmail'
  //     auth: {
  //       user: process.env.EMAIL_USER,
  //       pass: process.env.EMAIL_PASS,
  //     },
  //   });

  //   const mailOptions = {
  //     from: process.env.EMAIL_USER,
  //     to: process.env.ADMIN_EMAIL,
  //     subject: `New Contact Enquiry from ${name}`,
  //     html: `<p>Name: ${name}</p><p>Email: ${email}</p><p>Message: ${message}</p>`,
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if (error) {
  //       console.error('Error sending email:', error);
  //     } else {
  //       console.log('Email sent:', info.response);
  //     }
  //   });
  // }

  res.status(201).json(createdEnquiry);
});

module.exports = {
  createContactEnquiry,
};