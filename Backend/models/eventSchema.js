const mongoose = require('mongoose');
const eventTypes = require('../constants/eventTypes');

const eventSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    Organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizer',
        default: 'pending'
    },
    eventType: {
        type: eventTypes,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    guests: {
        type: Number,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: [ 'pending', 'booked', 'unavailable' ],
        default: 'pending'
    }
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;