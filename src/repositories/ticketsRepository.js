const sequelize = require('../config/database'); // Lấy instance sequelize
const { tickets } = require('../models/init-models')(sequelize); // Truyền vào init-models

exports.getAllTickets = async () => {
    return await tickets.findAll();
};

exports.addOrUpdateTicket = async (data) => {
    if (!data.ticket_id) {
        // Tạo mới
        return await tickets.create(
            {
                ...data,
                created_at: sequelize.literal('SYSDATETIME()'),
                updated_at: sequelize.literal('SYSDATETIME()')
            },
            {
                fields: [
                    'title', 'description', 'priority', 'status',
                    'category_id', 'requester_id', 'assigned_to',
                    'resolved_at', 'created_at', 'updated_at'
                ]
            }
        );
    } else {
        // Cập nhật
        await tickets.update(
            {
                ...data,
                updated_at: sequelize.literal('SYSDATETIME()')
            },
            { where: { ticket_id: data.ticket_id } }
        );
        return await tickets.findByPk(data.ticket_id);
    }
};
