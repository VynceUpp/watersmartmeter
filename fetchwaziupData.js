const axios = require('axios');
const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://smartwater:smartwaterpassword@cluster1.xhnszwz.mongodb.net/';

// Waziup API URL and credentials
const waziupAPI = 'https://api.waziup.io/api/v2/devices/ESPMINE';
const sensorID = 'your_sensor_id';
const apiKey = 'your_waziup_api_key';

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a Mongoose schema for your sensor data
const sensorDataSchema = new mongoose.Schema({
  timestamp: Date,
  value: Number
});

const SensorData = mongoose.model('SensorData', sensorDataSchema);

// Function to fetch data from Waziup
const fetchSensorData = async () => {
  try {
    const response = await axios.get(`${waziupAPI}/sensors/${sensorID}/measurements`, {
      headers: {
        'Authorization': `Bearer ${apiKey}`
      }
    });

    const measurements = response.data;
    for (let measurement of measurements) {
      const newSensorData = new SensorData({
        timestamp: measurement.timestamp,
        value: measurement.value
      });

      await newSensorData.save();
    }

    console.log('Sensor data fetched and saved to MongoDB');
  } catch (error) {
    console.error('Error fetching data from Waziup:', error);
  }
};

// Fetch data every minute
setInterval(fetchSensorData, 60000);
