const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [ 'User', 'Organizer', 'Admin' ],
        default: 'User'
    }
});

const User = mongoose.model('User', authSchema);
module.exports = User;