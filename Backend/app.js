const express = require('express');
const dbConnection = require('./config/db');
const { authRouter } = require('./routes/authRoutes');
const { organizerRouter } = require('./routes/organizerRoutes');
const { adminRouter } = require('./routes/adminRoutes');
const { eventRouter } = require('./routes/eventRoutes');
const app = express();
require('dotenv').config();

// middleware
app.use(express.json());

// DB Connection
dbConnection();

// routes
app.use('/auth', authRouter);
app.use('/organizer', organizerRouter);
app.use('/admin', adminRouter);
app.use('/event', eventRouter);

app.get('/', (req, res)=>{
    res.send('EventHive Project is currently Under Development...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`);
});