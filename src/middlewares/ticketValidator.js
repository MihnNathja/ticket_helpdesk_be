const { body } = require('express-validator');

exports.ticketValidationRules = [
    body('title').notEmpty().withMessage('Title is required'),
    body('priority').isIn(['low', 'medium', 'high', 'urgent']).withMessage('Priority must be low, medium, high or urgent'),
    body('status').isIn(['open', 'in_progress', 'closed', 'resolved'
    ]).withMessage('Status must be open, in_progress, resolved, or closed'),
    body('category_id').isInt().withMessage('Category ID must be an integer'),
    body('requester_id').isInt().withMessage('Requester ID must be an integer'),
    body('assigned_to').optional().isInt().withMessage('Assigned To must be an integer'),
];