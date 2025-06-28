const Joi = require('joi');

const organizerSchema = Joi.object({
    photo: Joi.string().pattern(/^https?:\/\/.*\.(jpg|jpeg|png|gif|webp)$/i).required(),
    yearsOfExperience: Joi.string().min(4).max(20).required(),
    experienceSummary: Joi.string().min(6).max(50).required(),
    city: Joi.string().min(3).max(20).required(),
    phone: Joi.string().pattern(/^\d{10}$/).required(),
    age: Joi.number().min(21).max(50).required(),
    skills: Joi.array().items(
        Joi.string().valid('Wedding', 'Birthday-party', 'Anniversary', 'Seminar', 'Expo', 'Session', 'other')
    ).required()
});

const organizerValidation = (req, res, next)=>{
    const { error } = organizerSchema.validate(req.body);

    if(error){
        return res.status(403).json({ message: error.details[0].required });
    }

    next();
};

module.exports = { organizerValidation };