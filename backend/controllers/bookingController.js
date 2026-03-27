const asyncHandler = require('express-async-handler');
const Booking = require('../models/Booking');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Public
const createBooking = asyncHandler(async (req, res) => {
    console.log('Received booking request:', req.body);
    const { name, email, phone, service, eventDate, numberOfPeople, message } = req.body;

    if (!name || !email || !phone || !service || !eventDate || !numberOfPeople) {
        console.log('Validation failed: Missing fields');
        res.status(400);
        throw new Error('Please fill out all required fields.');
    }

    const booking = new Booking({
        name,
        email,
        phone,
        service,
        eventDate,
        numberOfPeople,
        message,
    });

    const createdBooking = await booking.save();
    res.status(201).json(createdBooking);
});

// @desc    Get all bookings
// @route   GET /api/bookings
// @access  Private/Admin
const getBookings = asyncHandler(async (req, res) => {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.json(bookings);
});

// @desc    Get booking summary by service
// @route   GET /api/bookings/summary
// @access  Private/Admin
const getBookingSummary = asyncHandler(async (req, res) => {
    const summary = await Booking.aggregate([
        {
            $group: {
                _id: '$service',
                count: { $sum: 1 },
            },
        },
        {
            $project: {
                service: '$_id',
                count: 1,
                _id: 0,
            }
        }
    ]);

    const totalBookings = await Booking.countDocuments();

    res.json({ summary, totalBookings });
});

// @desc    Delete a booking
// @route   DELETE /api/bookings/:id
// @access  Private/Admin
const deleteBooking = asyncHandler(async (req, res) => {
    const booking = await Booking.findById(req.params.id);

    if (booking) {
        await Booking.deleteOne({ _id: req.params.id });
        res.json({ message: 'Booking removed' });
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
});

// @desc    Update a booking
// @route   PUT /api/bookings/:id
// @access  Private/Admin
const updateBooking = asyncHandler(async (req, res) => {
    const { name, email, phone, service, eventDate, numberOfPeople, message } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (booking) {
        booking.name = name || booking.name;
        booking.email = email || booking.email;
        booking.phone = phone || booking.phone;
        booking.service = service || booking.service;
        booking.eventDate = eventDate || booking.eventDate;
        booking.numberOfPeople = numberOfPeople || booking.numberOfPeople;
        booking.message = message || booking.message;

        const updatedBooking = await booking.save();
        res.json(updatedBooking);
    } else {
        res.status(404);
        throw new Error('Booking not found');
    }
});

module.exports = {
    createBooking,
    getBookings,
    getBookingSummary,
    updateBooking,
    deleteBooking,
};
