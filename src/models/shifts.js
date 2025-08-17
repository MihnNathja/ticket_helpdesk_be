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
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    allowed_radius: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 50
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('GETDATE()')
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('GETDATE()')
    }
  }, {
    sequelize,
    tableName: 'shifts',
    schema: 'dbo',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
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
