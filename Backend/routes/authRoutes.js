const express = require('express');
const { authValidation } = require('../middlewares/authValidation');
const { register, login } = require('../controllers/authController');
const { loginValidation } = require('../middlewares/loginValidation');
const authRouter = express.Router();

authRouter.post('/register', authValidation, register);
authRouter.post('/login', loginValidation, login);

module.exports = { authRouter };