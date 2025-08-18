const express = require('express');
const router = express.Router();
const attendancesController = require('../controllers/attendancesController');

router.post('/checkin', attendancesController.checkin);
router.post('/checkout', attendancesController.checkout);

module.exports = router;