const User = require("../models/authSchema");
const Event = require("../models/eventSchema");

// Create event
const bookEvent = async (req, res)=>{
    try {
        const { eventType, eventDate, location, guests, budget } = req.body;
        
        const newEvent = await Event.create({
            User: req.user.id,
            eventType,
            eventDate,
            location,
            guests,
            budget
        });

        res.status(201).json({ message: 'Event Booked Successfully', event: newEvent });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

// Get All Book Event of User
const userBookEvent = async (req, res)=>{
    const id = req.user.id;

    const events = await Event.find({ User: id  }) .populate({
        path: 'Organizer',
        populate: {
            path: 'User',
            select: 'name email'
        },
        select: 'phone yearsOfExperience skills city'
    });
    if(events.length === 0){
        return res.status(404).json({ message: 'No Events Found' });
    }

    res.status(200).json({ message: 'Events Fetched Successfully', bookEvents: events });
};

// Cancel the Event
const cancelEvent = async (req, res)=>{
    try {
        const eventId = req.params.id;

        const event = await Event.findOne({ _id: eventId, User: req.user.id });

        if(!event){
            return res.status(500).json({ message: 'Event not found' });
        }

        if(event.status !== 'pending'){
            return res.status(500).json({ message: 'Event cannot be cancelled as it is already booked' });
        }

        const cancellationFees = Math.floor(event.budget * 0.02);

        event.status = 'unavailable';
        await event.save();

        res.status(200).json({ message: 'Event cancelled Successfully', cancellationFees, event });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Something went wrong' });
    }
};

module.exports = { bookEvent, userBookEvent, cancelEvent };