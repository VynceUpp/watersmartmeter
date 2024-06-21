// routes/houses.js
const express = require('express');
const House = require('../models/House');
const router = express.Router();

// Get all houses
router.get('/', async (req, res) => {
    try {
        const houses = await House.find();
        res.send(houses);
    } catch (error) {
        res.status(500).send({ message: 'Error fetching houses', error });
    }
});

// Update house water status
router.patch('/:houseNumber', async (req, res) => {
    try {
        const { houseNumber } = req.params;
        const { isWaterOn } = req.body;
        const house = await House.findOneAndUpdate({ houseNumber }, { isWaterOn }, { new: true });
        res.send(house);
    } catch (error) {
        res.status(500).send({ message: 'Error updating house', error });
    }
});

module.exports = router;
