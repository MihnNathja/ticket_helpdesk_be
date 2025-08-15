var DataTypes = require("sequelize").DataTypes;
var _audit_logs = require("./audit_logs");
var _department = require("./department");
var _notifications = require("./notifications");
var _ticket_attachments = require("./ticket_attachments");
var _ticket_categories = require("./ticket_categories");
var _ticket_comments = require("./ticket_comments");
var _tickets = require("./tickets");
var _user_db = require("./user_db");

function initModels(sequelize) {
  var audit_logs = _audit_logs(sequelize, DataTypes);
  var department = _department(sequelize, DataTypes);
  var notifications = _notifications(sequelize, DataTypes);
  var ticket_attachments = _ticket_attachments(sequelize, DataTypes);
  var ticket_categories = _ticket_categories(sequelize, DataTypes);
  var ticket_comments = _ticket_comments(sequelize, DataTypes);
  var tickets = _tickets(sequelize, DataTypes);
  var user_db = _user_db(sequelize, DataTypes);

  user_db.belongsTo(department, { as: "department", foreignKey: "department_id"});
  department.hasMany(user_db, { as: "user_dbs", foreignKey: "department_id"});
  tickets.belongsTo(ticket_categories, { as: "category", foreignKey: "category_id"});
  ticket_categories.hasMany(tickets, { as: "tickets", foreignKey: "category_id"});
  ticket_attachments.belongsTo(tickets, { as: "ticket", foreignKey: "ticket_id"});
  tickets.hasMany(ticket_attachments, { as: "ticket_attachments", foreignKey: "ticket_id"});
  ticket_comments.belongsTo(tickets, { as: "ticket", foreignKey: "ticket_id"});
  tickets.hasMany(ticket_comments, { as: "ticket_comments", foreignKey: "ticket_id"});
  audit_logs.belongsTo(user_db, { as: "user", foreignKey: "user_id"});
  user_db.hasMany(audit_logs, { as: "audit_logs", foreignKey: "user_id"});
  notifications.belongsTo(user_db, { as: "user", foreignKey: "user_id"});
  user_db.hasMany(notifications, { as: "notifications", foreignKey: "user_id"});
  ticket_comments.belongsTo(user_db, { as: "user", foreignKey: "user_id"});
  user_db.hasMany(ticket_comments, { as: "ticket_comments", foreignKey: "user_id"});
  tickets.belongsTo(user_db, { as: "assigned_to_user_db", foreignKey: "assigned_to"});
  user_db.hasMany(tickets, { as: "tickets", foreignKey: "assigned_to"});
  tickets.belongsTo(user_db, { as: "requester", foreignKey: "requester_id"});
  user_db.hasMany(tickets, { as: "requester_tickets", foreignKey: "requester_id"});

  return {
    audit_logs,
    department,
    notifications,
    ticket_attachments,
    ticket_categories,
    ticket_comments,
    tickets,
    user_db,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
