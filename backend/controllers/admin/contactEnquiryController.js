const asyncHandler = require('express-async-handler');
const ContactEnquiry = require('../../models/ContactEnquiry');

// @desc    Get all contact enquiries with filtering, pagination, and searching
// @route   GET /api/admin/enquiries
// @access  Private/Admin
const getEnquiries = asyncHandler(async (req, res) => {
  const pageSize = 10;
  const page = Number(req.query.pageNumber) || 1;

  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {};

  const count = await ContactEnquiry.countDocuments({ ...keyword });
  const enquiries = await ContactEnquiry.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
    .sort({ createdAt: -1 });

  res.json({ enquiries, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Get a single enquiry by id
// @route   GET /api/admin/enquiries/:id
// @access  Private/Admin
const getEnquiryById = asyncHandler(async (req, res) => {
  const enquiry = await ContactEnquiry.findById(req.params.id);

  if (enquiry) {
    res.json(enquiry);
  } else {
    res.status(404);
    throw new Error('Enquiry not found');
  }
});

// @desc    Update an enquiry's status
// @route   PUT /api/admin/enquiries/:id/status
// @access  Private/Admin
const updateEnquiryStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const enquiry = await ContactEnquiry.findById(req.params.id);

  if (enquiry) {
    enquiry.status = status;
    const updatedEnquiry = await enquiry.save();
    res.json(updatedEnquiry);
  } else {
    res.status(404);
    throw new Error('Enquiry not found');
  }
});

// @desc    Delete an enquiry
// @route   DELETE /api/admin/enquiries/:id
// @access  Private/Admin
const deleteEnquiry = asyncHandler(async (req, res) => {
  const enquiry = await ContactEnquiry.findById(req.params.id);

  if (enquiry) {
    await ContactEnquiry.deleteOne({ _id: req.params.id });
    res.json({ message: 'Enquiry removed' });
  } else {
    res.status(404);
    throw new Error('Enquiry not found');
  }
});


module.exports = {
  getEnquiries,
  getEnquiryById,
  updateEnquiryStatus,
  deleteEnquiry,
};
