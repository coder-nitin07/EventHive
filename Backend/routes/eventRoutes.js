const express = require('express');
const { bookEvent } = require('../controllers/eventController');
const { blacklistedToken } = require('../middlewares/blacklistedToken');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authorizedRoles } = require('../middlewares/authorizedRoles');
const { eventValidation } = require('../middlewares/eventValidation');
const eventRouter = express.Router();

eventRouter.post('/bookEvent', blacklistedToken, authMiddleware, authorizedRoles('User'), eventValidation, bookEvent);

module.exports = { eventRouter };