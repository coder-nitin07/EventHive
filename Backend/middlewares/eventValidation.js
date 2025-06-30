const Joi = require('joi');
const eventTypes = require('../constants/eventTypes');
const eventRules = require('../constants/eventRules');
const eventBudget = require('../constants/eventBudget');
const { eventLocations } = require('../constants/eventLocation');

const eventSchema = Joi.object({
    eventType: Joi.string().valid(...eventTypes).required(),
    eventDate: Joi.date().greater('now').required(),
    location: Joi.string().valid(...eventLocations).required(),
    guests: Joi.number().required(),
    budget: Joi.number().required()
});

const eventValidation = (req, res, next)=>{
    const { error } = eventSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    const { eventType, eventDate, guests, budget } = req.body;
    const rules = eventRules[ eventType ];
    const today = new Date();
    const eventDay = new Date(eventDate);
    const daysUntilEvent = Math.ceil((eventDay - today) / (1000 * 60 * 60 * 24));

    if(daysUntilEvent < rules.minBookingDays || daysUntilEvent > rules.maxBookingDays){
        return res.status(400).json({ message: `Event must be booked between ${rules.minBookingDays} to ${rules.maxBookingDays} days in advance.` });
    }

    if(guests < rules.minGuests || guests > rules.maxGuests){
        return res.status(400).json({ message: `Guests must be between ${ rules.minGuests } to ${ rules.maxGuests } for a ${ eventType }.`});
    }

    if(budget < eventBudget[ eventType ].minBudget){
        return res.status(400).json({ message: `Budget must be at least ₹${eventBudget[eventType].minBudget} for a ${eventType}.` });
    }

    next();
};

module.exports = { eventValidation };