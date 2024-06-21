// models/House.js
const mongoose = require('mongoose');

const houseSchema = new mongoose.Schema({
    houseNumber: { type: String, required: true, unique: true },
    waterConsumption: { type: Number, default: 0 },
    isWaterOn: { type: Boolean, default: true },
});

module.exports = mongoose.model('House', houseSchema);
