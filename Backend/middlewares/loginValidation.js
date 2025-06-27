const Joi = require('joi');

const authSchema = Joi.object({
    email: Joi.string().trim().lowercase().email().required(),
    password: Joi.string().trim().min(6).max(20).required()
});

const loginValidation = (req, res, next)=>{
    const { error } = authSchema.validate(req.body);

    if(error){
        return res.status(400).json({ message: error.details[0].message });
    }

    next();
};

module.exports = { loginValidation };