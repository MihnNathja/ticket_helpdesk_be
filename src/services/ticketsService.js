const ticketsRepository = require('../repositories/ticketsRepository');

exports.getAllTickets = async () => {
    return await ticketsRepository.getAllTickets();
};