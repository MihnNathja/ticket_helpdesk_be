const { tickets } = require('../models/init-models')(require('../config/database'));

exports.getAllTickets = async (req, res) => {
    try {
        const allTickets = await tickets.findAll();
        res.status(200).json(allTickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}