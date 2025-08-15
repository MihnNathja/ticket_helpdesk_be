const { tickets } = require('../models/init-models')(require('../config/database'));

exports.getAllTickets = async () => {
    return await tickets.findAll();
};