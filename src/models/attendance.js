const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('attendance', {
    attendance_id: {
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
    shift_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'shifts',
        key: 'shift_id'
      }
    },
    check_in_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    check_out_time: {
      type: DataTypes.DATE,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'attendance',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__attendan__20D6A968AD0B33C0",
        unique: true,
        fields: [
          { name: "attendance_id" },
        ]
      },
    ]
  });
};
