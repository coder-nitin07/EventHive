const User = require("../models/authSchema");
const Event = require("../models/eventSchema");
const Organizer = require("../models/organizerOnboardingSchema");

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

module.exports = { getOrganizerRequests, verifyOrganizer, getEvents };