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

    const events = await Event.find({ User: id  }).populate('User' );
    if(events.length === 0){
        return res.status(404).json({ message: 'No Events Found' });
    }

    res.status(200).json({ message: 'Events Fetched Successfully', bookEvents: events });
};

module.exports = { bookEvent, userBookEvent };