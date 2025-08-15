const express = require('express')
const router = express.Router();
const ticketsController = require('../controllers/ticketsController');
const { ticketValidationRules } = require('../middlewares/ticketValidator');
const validateResult = require('../middlewares/validateResult');

router.get('/get-all-tickets', ticketsController.getAllTickets);
router.post('/add-or-update-ticket', ticketValidationRules, validateResult, ticketsController.addOrUpdateTicket);

module.exports = router;