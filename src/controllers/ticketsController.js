const ticketsService = require('../services/ticketsService');

exports.getAllTickets = async (req, res, next) => {
    const tickets = await ticketsService.getAllTickets();
    res.status(200).json(tickets);
};