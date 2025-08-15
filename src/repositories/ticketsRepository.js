const { tickets } = require('../models/init-models')(require('../config/database'));

exports.getAllTickets = async () => {
    return await tickets.findAll();
};

exports.addOrUpdateTicket = async (ticketData) => {
    const [ticket, created] = await tickets.upsert(ticketData, {
        returning: true
    });
    return ticket;
}