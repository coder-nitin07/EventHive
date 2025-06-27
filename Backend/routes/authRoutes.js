const express = require('express');
const { authValidation } = require('../middlewares/authValidation');
const { register, login, logout } = require('../controllers/authController');
const { loginValidation } = require('../middlewares/loginValidation');
const { blacklistedToken } = require('../middlewares/blacklistedToken');
const authRouter = express.Router();

authRouter.post('/register', authValidation, register);
authRouter.post('/login', loginValidation, login);
authRouter.post('/logout', blacklistedToken, logout);

module.exports = { authRouter };