const mongoose = require('mongoose');

const dbConnection = async ()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log('Database Connected Successfully');
    } catch (err) {
        console.error('Error while connecting to the Database.', err );
        process.exit(1);
    }
};

module.exports = dbConnection;