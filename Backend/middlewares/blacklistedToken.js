const jwt = require('jsonwebtoken');
const { Blacklist } = require('../models/blacklistSchema');

const blacklistedToken = async (req, res, next)=>{
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if(!token){
            return res.status(401).json({ message: 'Authentication Failed. No Token Provided' });
        }

        const blacklistedToken = await Blacklist.findOne({ token });
        if(blacklistedToken){
            return res.status(401).json({ message: 'Token is blacklisted' });
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;

        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Authentication Failed. Invalid Token.' });
    }
};

module.exports = { blacklistedToken };