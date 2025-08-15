const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticket_attachments', {
    attachment_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ticket_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tickets',
        key: 'ticket_id'
      }
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ticket_attachments',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__ticket_a__B74DF4E2AE4391A5",
        unique: true,
        fields: [
          { name: "attachment_id" },
        ]
      },
    ]
  });
};
