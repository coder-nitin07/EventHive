const mongoose = require('mongoose');

const organizerRequestSchema = new mongoose.Schema({
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizer',
        required: true
    },
    status: {
        type: String,
        enum: [ 'pending', 'accepted', 'rejected' ],
        default: 'pending'
    },
    message: {
        type: String,
    }
},{ timestamps: true });

const OrganizerRequest = mongoose.model('OrganizerRequest', organizerRequestSchema);

module.exports = { OrganizerRequest };