const ticketsRepository = require('../repositories/ticketsRepository');
const datetimeUtil = require('../utils/datetimeUtil');

exports.getAllTickets = async () => {
    return await ticketsRepository.getAllTickets();
};

exports.addOrUpdateTicket = async (ticketData) => {
    delete ticketData.created_at;
    delete ticketData.updated_at;

    return await ticketsRepository.addOrUpdateTicket(ticketData);
};


exports.deleteTicket = async (ticketId) => {
    return await ticketsRepository.deleteTicket(ticketId);
};

exports.getTicketById = async (ticketId) => {
    const ticket = await ticketsRepository.getTicketById(ticketId);
    if (!ticket) {
        throw new Error(`Ticket with ID ${ticketId} not found`);
    }
    return ticket;
}