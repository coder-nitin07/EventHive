const User = require("../models/authSchema");
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
    console.log(getOragnizer, "s");
    if(!getOragnizer){
        return res.status(404).json({ message: 'Oragnizer Request not found' });
    }
    
    getOragnizer.status = status;
    if(adminMessage){
        getOragnizer.adminMessage = adminMessage;
    }
    await getOragnizer.save();
    
    console.log(getOragnizer, "sssss");
    if(status === 'accepted'){
        await User.findByIdAndUpdate(
            getOragnizer.User,
            { role: 'Organizer' },
            { new: true }
        )
    }
    
    res.status(200).json({ message: `Organizer ${status} successfully.`, organizer: getOragnizer });
};

module.exports = { getOrganizerRequests, verifyOrganizer };