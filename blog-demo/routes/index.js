const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController.js');

// Route to list vehicles
router.get('/', vehicleController.listVehicles);

// Route to handle AJAX filtering
router.post('/vehicles/filter', vehicleController.filterVehicles);

module.exports = router;
