const express = require('express');
const router = express.Router();

const tripController = require('../controllers/tripController');

// Add API routes here
router.get('/trip', tripController.getTrip);
router.post('/trip', tripController.postTrip);


module.exports = router;