const express = require('express');
const { blacklistedToken } = require('../middlewares/blacklistedToken');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authorizedRoles } = require('../middlewares/authorizedRoles');
const { getOrganizerRequests, verifyOrganizer } = require('../controllers/adminController');
const adminRouter = express.Router();

adminRouter.get('/getOrganizerRequests', blacklistedToken, authMiddleware, authorizedRoles('Admin'), getOrganizerRequests);
adminRouter.patch('/verifyOrganizer/:id', blacklistedToken, authMiddleware, authorizedRoles('Admin'), verifyOrganizer);

module.exports = { adminRouter };