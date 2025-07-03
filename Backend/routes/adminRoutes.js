const express = require('express');
const { blacklistedToken } = require('../middlewares/blacklistedToken');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { authorizedRoles } = require('../middlewares/authorizedRoles');
const { getOrganizerRequests, verifyOrganizer, getEvents, getAllPendingRequests, getOrganizerRequestsForEvent, assignEventToOrganizer, markEventCompleted } = require('../controllers/adminController');
const adminRouter = express.Router();

adminRouter.get('/getOrganizerRequests', blacklistedToken, authMiddleware, authorizedRoles('Admin'), getOrganizerRequests);
adminRouter.patch('/verifyOrganizer/:id', blacklistedToken, authMiddleware, authorizedRoles('Admin'), verifyOrganizer);
adminRouter.get('/events', blacklistedToken, authMiddleware, authorizedRoles('Admin'), getEvents);
adminRouter.get('/getAllPendingRequests', blacklistedToken, authMiddleware, authorizedRoles('Admin'), getAllPendingRequests);
adminRouter.get('/getOrganizerRequestsForEvent/:id', blacklistedToken, authMiddleware, authorizedRoles('Admin'), getOrganizerRequestsForEvent);
adminRouter.put('/assignEventToOrganizer/:eventId/:organizerId', blacklistedToken, authMiddleware, authorizedRoles('Admin'), assignEventToOrganizer);
adminRouter.put('/markEventCompleted/:id', blacklistedToken, authMiddleware, authorizedRoles('Admin'), markEventCompleted);

module.exports = { adminRouter };