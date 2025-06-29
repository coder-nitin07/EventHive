const User = require("../models/authSchema");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Blacklist } = require("../models/blacklistSchema");

// Register Route
const register = async (req, res)=>{
    try {
        const { name, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(403).json({ message: 'Invalid Credentials' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userCount = await User.countDocuments();
        const userRole = userCount === 0 ? 'Admin' : role;

        const newUser = await User.create({ 
            name,
            email,
            password: hashedPassword,
            role: userRole
        });

        const user = newUser.toObject();
        delete user.password;

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role  }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(201).json({ message: 'User Registered Successfully', user: user, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Login Route
const login = async (req, res)=>{
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if(!user){
            return res.status(403).json({ message: 'Invalid Credentails' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(403).json({ message: 'Invalid Credentials' });
        }

        const userLogin = user.toObject();
        delete userLogin.password;

        const token = jwt.sign({ id: userLogin._id, email: userLogin.email, role: userLogin.role  }, process.env.SECRET_KEY, { expiresIn: '1h' });

        res.status(200).json({ message: 'User Login Successfully', user: userLogin, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Logout Route
const logout = async (req, res)=>{
    try {
        const token = req.header('Authorization')?.split(' ')[1];

        if(!token){
            return res.status(400).json({ message: 'Token missing in header.' });
        }

        await Blacklist.create({ token });

        res.status(200).json({ message: 'Logout Successfully.',  });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { register, login, logout };