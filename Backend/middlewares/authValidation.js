const Joi = require('joi');

const authSchema = Joi.object({
    name: Joi.string().min(3).max(20).required(),
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().trim().min(6).max(20).required(),
    role: Joi.string().valid('User', 'Organizer', 'Admin')
});

const authValidation = (req, res, next)=>{
    const { error } = authSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = { authValidation };