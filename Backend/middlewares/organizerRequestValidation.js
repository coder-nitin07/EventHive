const Joi = require('joi');

const organizerRequestSchema = Joi.object({
    message: Joi.string().trim().min(30).max(400).required()
});

const organizerRequestValidation = (req, res, next)=>{
    const { error } = organizerRequestSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = { organizerRequestValidation };