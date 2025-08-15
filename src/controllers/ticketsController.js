const ticketsService = require('../services/ticketsService');

exports.getAllTickets = async (req, res, next) => {
    try {
        const tickets = await ticketsService.getAllTickets();
        res.status(200).json(tickets);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
};

exports.addOrUpdateTicket = async (req, res, next) => {
    try {
        const ticketData = req.body;
        const ticket = await ticketsService.addOrUpdateTicket(ticketData);
        res.status(200).json(ticket);
    } catch (error) {
        next(error); // Pass the error to the error handling middleware
    }
}