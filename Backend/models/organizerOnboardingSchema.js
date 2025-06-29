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
        unique: true,
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
},{ timestamps: true });

organizerSchema.index(
  { createdAt: 1 },
  {
    expireAfterSeconds: 60 * 60 * 24 * 30, // 30 days
    partialFilterExpression: { status: 'rejected' }
  }
);

const Organizer = mongoose.model('Organizer', organizerSchema);
module.exports = Organizer;