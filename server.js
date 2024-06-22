const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const houseRoutes = require('./routes/houses');
const fetchSensorData = require('./fetchwaziupData');

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/houses', houseRoutes);

// Connect to MongoDB
mongoose.connect('mongodb+srv://smartwater:smartwaterpassword@cluster1.xhnszwz.mongodb.net/');

// Start fetching Waziup data
fetchSensorData();


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
