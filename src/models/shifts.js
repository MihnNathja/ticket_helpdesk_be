const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('shifts', {
    shift_id: {
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
    location_lat: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    location_lng: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    start_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    end_time: {
      type: DataTypes.TIME,
      allowNull: false
    },
    allowed_radius: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 50
    }
  }, {
    sequelize,
    tableName: 'shifts',
    schema: 'dbo',
    timestamps: true,
    indexes: [
      {
        name: "PK__shifts__7B26722052E7A740",
        unique: true,
        fields: [
          { name: "shift_id" },
        ]
      },
    ]
  });
};
