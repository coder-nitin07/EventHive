const Event = require("../models/eventSchema");
const Organizer = require("../models/organizerOnboardingSchema");
const { OrganizerRequest } = require("../models/organizerRequestSchema");

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

// Apply for an Event
const applyForEvent = async (req, res)=>{
    try {
        const id = req.params.id;
        const { message } = req.body;
        
        const organizer = await Organizer.findOne({ User: req.user.id });
        
        if (!organizer) {
            return res.status(404).json({ message: 'Organizer not found' });
        }
        
        const existingEvent = await Event.findOne({ _id: id });
        if(!existingEvent){
            return res.status(404).json({ message: 'Event not found' });
        }

        const existingRequest = await OrganizerRequest.findOne({ event: id, organizer: organizer.id });
        if(existingRequest){
            return res.status(400).json({ message: 'You have already applied for this event.' });
        }

        const createOrganizerRequest = await OrganizerRequest.create({
            event: id,
            organizer: organizer.id,
            message: message
        });

        res.status(200).json({ message: 'Request Send Successfully', organizerRequest: createOrganizerRequest });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get Assigned Events of an Organizer
const getAssignedEvents = async (req, res)=>{
    try {
        const organizer = await Organizer.findOne({ User: req.user.id });
        if(!organizer){
            return res.status(404).json({ message: 'Organizer not found' });
        }

        const getEventss = await Event.find({});

        const getEvents = await Event.find({ 
            Organizer: organizer._id,
            status: 'booked' 
        });

        if(getEvents.length === 0){
            return res.status(404).json({ message: 'No Events Assigned' });
        }

        res.status(200).json({ message: 'Assigned Events Fetched', events: getEvents });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Mark Event as Completed
const markEventCompleted = async (req, res)=>{
    try {
        const getOrganizer = await Organizer.findOne({ User: req.user.id });
        if(!getOrganizer){
            return res.status(404).json({ message: 'Organizer not found.' });
        }

        const getEvent = await Event.findOne({
            _id: req.params.id,
            Organizer: getOrganizer._id,
            status: 'booked'
        });
        
        if(!getEvent){
            return res.status(404).json({ message: 'No Assigned or Incompleted Event Found.' });
        }

        if (getEvent.isCompleted) {
            return res.status(400).json({ message: 'Event already marked as completed.' });
        }

        getEvent.isCompleted = true;
        await getEvent.save();

        res.status(201).json({ message: 'Event Marked Successfully', event: getEvent });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { onboardOrganizer, availableEvents, applyForEvent, getAssignedEvents, markEventCompleted };