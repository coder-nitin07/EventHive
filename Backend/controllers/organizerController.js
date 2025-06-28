const Organizer = require("../models/organizerOnboardingSchema");

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

module.exports = { onboardOrganizer };