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

module.exports = { getOrganizerRequests };