const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('audit_logs', {
    log_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user_db',
        key: 'user_id'
      }
    },
    action: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    timestamp: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('getdate')
    }
  }, {
    sequelize,
    tableName: 'audit_logs',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__audit_lo__9E2397E0D74B746F",
        unique: true,
        fields: [
          { name: "log_id" },
        ]
      },
    ]
  });
};
