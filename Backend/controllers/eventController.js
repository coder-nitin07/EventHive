const User = require("../models/authSchema");
const Event = require("../models/eventSchema");

// Create event
const bookEvent = async (req, res)=>{
    try {
        // const id = req.user;
        
        // const existingUser = await User.findById(id);
        // if(!existingUser){
        //     return res.status(404).json({ message: 'User not found' });
        // }
        console.log("first")
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

module.exports = { bookEvent };