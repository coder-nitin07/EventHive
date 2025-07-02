const User = require("../models/authSchema");
const Event = require("../models/eventSchema");
const Organizer = require("../models/organizerOnboardingSchema");
const { OrganizerRequest } = require("../models/organizerRequestSchema");

// Get All Pending Request of Organizers
const getOrganizerRequests = async (req, res)=>{
    try {
        const getAllRequest = await Organizer.find({ status: 'pending' });
        if(getAllRequest.length === 0){
            return res.status(200).json({ message: 'No pending requests found', organizerRequest: [] });
        }

        res.status(200).json({ message: 'Fetched All Pending Requests', organizerRequest: getAllRequest });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Verify the Organizer API
const verifyOrganizer = async (req, res)=>{
    const id = req.params.id;
    const { status, adminMessage } = req.body;

    if(!['accepted', 'rejected'].includes(status)){
        return res.status(400).json({ message: 'Invalid status value. Must be "accepted" or "rejected"' });
    }

    const getOragnizer = await Organizer.findById( id );
    if(!getOragnizer){
        return res.status(404).json({ message: 'Oragnizer Request not found' });
    }

    if(getOragnizer.status !== 'pending'){
        return res.status(400).json({ message: 'This request already have been processed.' })
    }
    
    getOragnizer.status = status;
    if(adminMessage){
        getOragnizer.adminMessage = adminMessage;
    }
    await getOragnizer.save();
    
    if(status === 'accepted'){
        await User.findByIdAndUpdate(
            getOragnizer.User,
            { role: 'Organizer' },
            { new: true }
        )
    }
    
    res.status(200).json({ message: `Organizer ${status} successfully.`, organizer: getOragnizer });
};

// Get All events
const getEvents = async (req, res)=>{
    try {
        const getEvent = await Event.find();

        if(getEvent.length === 0){
            return res.status(404).json({ message: 'No Events Book Yet' });
        }

        res.status(200).json({ message: 'Events Fetched Successfully', events: getEvent });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All Pending Request
const getAllPendingRequests = async (req, res)=>{
    try {
        const getPendingRequests = await Event.find({ status: 'pending' }).populate({ path: 'User', select: 'name email -_id' });

        if(getPendingRequests.length === 0){
            return res.status(404).json({ message: 'No Request Found' });
        }

        res.status(200).json({ message: 'All Pending Request Found', requests: getPendingRequests });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get the Event request of Organizer By Event ID
const getOrganizerRequestsForEvent = async (req, res)=>{
    try {
        const event = req.params.id;

        const getEvent = await Event.findById(event);
        if(!getEvent){
            return res.status(404).json({ message: 'No Event Found' });
        }

        if(!['pending'].includes(getEvent.status)){
            return res.status(404).json({ message: 'Invalid Event Reqeust' });
        }

        const getAllOrganizerRequest = await OrganizerRequest.find({ event })
                                            .populate({
                                                path: 'organizer',
                                                populate: {
                                                    path: 'User',
                                                    select: 'name email'
                                                },
                                                select: 'phone skills yearsOfExperience experienceSummary city age'
                                            });
                                        
        const getCleanRequest = getAllOrganizerRequest.map(req =>({
            _id: req.id,
            message: req.message,
            organizer: req.organizer
        }));

        res.status(200).json({ message: 'All Organizer Request Fetched', request: getCleanRequest });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Assing the Event to an Organizer
const assignEventToOrganizer = async (req, res)=>{
    try {
        const { eventId, organizerId } = req.params;

        const existingEvent = await Event.findById(eventId);
        if(!existingEvent){
            return res.status(404).json({ message: 'Event Not Found' });
        }
        
        if(existingEvent.status !== 'pending'){
            return res.status(400).json({ message: 'Event is alraedy assigned or unavailable.' });
        }

        const existingOrganizer = await Organizer.findById(organizerId);
        if(!existingOrganizer){
            return res.status(404).json({ message: 'Organizer Not Found' });
        }

        const updatedEvent = await Event.findByIdAndUpdate(
            eventId,
            {
                organizer: organizerId,
                status: 'booked'
            },
            { new: true }
        );

        // Update OrganizeerRequsts Status
        await OrganizerRequest.findOneAndUpdate(
            { event: eventId, organizer: organizerId },
            { status: 'accepted' }
        );

        await OrganizerRequest.updateMany(
            { event: eventId, organizer: { $ne: organizerId } },
            { status: 'rejected' }
        )

        res.status(200).json({ message: 'Event Assigend Successfully', event: updatedEvent });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { getOrganizerRequests, verifyOrganizer, getEvents, getAllPendingRequests, getOrganizerRequestsForEvent, assignEventToOrganizer };