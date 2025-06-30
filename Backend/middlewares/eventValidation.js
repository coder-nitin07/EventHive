const Joi = require('joi');
const eventTypes = require('../constants/eventTypes');

const eventSchema = Joi.object({
    eventType: Joi.array().items(
            Joi.string().valid(...eventTypes)
    ).required(),
    eventDate: Joi.date().min('now').required(),
    location: Joi.string.min(3).max(30).trim().required(),
    guests: Joi.number().min(50).max(1000).required(),
    budget: Joi.number().min(10000).required()
});

const eventValidation = (req, res, next)=>{
    const { error } = eventSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = { eventValidation };