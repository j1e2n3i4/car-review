const express = require('express');
const router = express.Router();
const vehicleController = require('../controllers/vehicleController.js');

router.get('/', vehicleController.listVehicles);
router.get('/:id', vehicleController.viewVehicle);
router.post('/filter', vehicleController.filterVehicles);

module.exports = router;
