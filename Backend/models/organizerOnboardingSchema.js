const mongoose = require('mongoose');

const organizerSchema = new mongoose.Schema({
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    photo: {
        type: String,
        required: true
    },
    yearsOfExperience: {
        type: String,
        required: true
    },
    experienceSummary: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    skills: {
        type: [ String ],
        enum: [ 'Wedding', 'Birthday-party', 'Anniversary', 'Seminar', 'Expo', 'Session', 'other' ],
        required: true
    },
    status: {
        type: String,
        enum: [ 'accepted', 'rejected', 'pending' ],
        default: 'pending'
    },
    adminMessage: {
        type: String,
        default: 'Admin will Update you soon'
    }
});


const Organizer = mongoose.model('Organizer', organizerSchema);
module.exports = Organizer;