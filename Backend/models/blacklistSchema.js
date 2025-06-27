const mongoose = require('mongoose');

const blacklistSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},{ timestamps: true });

blacklistSchema.index({ createdAt: 1 },{ expireAfterSeconds: 3600 });

const Blacklist = mongoose.model('Blacklist', blacklistSchema);
module.exports = { Blacklist };