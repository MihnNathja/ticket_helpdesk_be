const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ticket_categories', {
    category_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    category_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'ticket_categories',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__ticket_c__D54EE9B47355B48E",
        unique: true,
        fields: [
          { name: "category_id" },
        ]
      },
    ]
  });
};
