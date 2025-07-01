const Event = require("../models/eventSchema");
const Organizer = require("../models/organizerOnboardingSchema");

// Create organizer
const onboardOrganizer = async (req, res)=>{
    try {
        const photo = req.file?.path;
        const { yearsOfExperience, experienceSummary, city, phone, age, skills } = req.body;

        const existingOrganizer = await Organizer.findOne({ phone });
        if(existingOrganizer){
            return res.status(403).json({ message: 'Invalid Credentials' });
        }

        const newOrganizer = await Organizer.create({
            User: req.user.id,
            photo,
            yearsOfExperience,
            experienceSummary,
            city,
            phone,
            age,
            skills
        });

        res.status(201).json({ message: 'Request Created. Waiting for approval', organizer: newOrganizer });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get Available Events
const availableEvents = async (req, res)=>{
    try {
        const getEvent = await Event.find({ status: 'pending' });

        if(getEvent.length === 0){
            return res.status(404).json({ message: 'No Events Pending Now.' });
        }

        res.status(200).json({ message: 'Fetch All Pending Events', events: getEvent });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { onboardOrganizer, availableEvents };