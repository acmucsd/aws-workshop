const Trips = require('../models/tripModel');

// Create a GET async function to get all trips using the trip model schema
const getTrip = async (req, res) => {
    const trip = await Trips.find();
    res.status(200).json(trip);
}

// Create a POST async function to add a trip using the trip model schema
const postTrip = async (req, res) => {
    const { destination, startDate, endDate, journalEntry } = req.body;

    if (!destination || !startDate || !journalEntry) {
        return res.status(400).json({ error: 'Invalid request' });
    }

    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;

    if (end && start > end) {
        return res.status(400).json({ error: 'End date must be after start date' });
    }
    else {
        const newTrip = await Trips.create(req.body);
        res.status(200).json(newTrip);
    }
}

module.exports = { getTrip, postTrip };
