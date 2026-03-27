const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your full name.'],
        trim: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide your email address.'],
        match: [/.+\@.+\..+/, 'Please provide a valid email address.'],
    },
    phone: {
        type: String,
        required: [true, 'Please provide your phone number.'],
    },
    service: {
        type: String,
        required: [true, 'Please select a service type.'],
        enum: ['Wedding', 'Portrait', 'Fashion', 'Editorial'],
    },
    eventDate: {
        type: Date,
        required: [true, 'Please provide the event date.'],
    },
    numberOfPeople: {
        type: Number,
        required: [true, 'Please specify the number of people.'],
        min: [1, 'Number of people must be at least 1.'],
    },
    message: {
        type: String,
        required: false,
    },
    notes: {
        type: String,
        required: false,
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'completed', 'cancelled'],
        default: 'pending',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Booking', BookingSchema);
