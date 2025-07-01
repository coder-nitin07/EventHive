const express = require('express');
const { onboardOrganizer, availableEvents } = require('../controllers/organizerController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { organizerValidation } = require('../middlewares/organizerValidation');
const { blacklistedToken } = require('../middlewares/blacklistedToken');
const { authorizedRoles } = require('../middlewares/authorizedRoles');
const upload = require('../middlewares/cloudinaryUploader');
const organizerRouter = express.Router();

organizerRouter.post('/createOrganizer', blacklistedToken, authMiddleware, authorizedRoles('User'), upload.single('photo'),  organizerValidation,  onboardOrganizer);
organizerRouter.get('/availableEvents', blacklistedToken, authMiddleware, authorizedRoles('Organizer'), availableEvents);

module.exports = { organizerRouter };