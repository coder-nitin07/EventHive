const express = require('express');
const { bookEvent, userBookEvent } = require('../controllers/eventController');
const { blacklistedToken } = require('../middlewares/blacklistedToken');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authorizedRoles } = require('../middlewares/authorizedRoles');
const { eventValidation } = require('../middlewares/eventValidation');
const eventRouter = express.Router();

eventRouter.post('/bookEvent', blacklistedToken, authMiddleware, authorizedRoles('User'), eventValidation, bookEvent);
eventRouter.get('/userBookEvent', blacklistedToken, authMiddleware, authorizedRoles('User'), userBookEvent);

module.exports = { eventRouter };