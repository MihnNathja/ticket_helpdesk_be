const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('department', {
    department_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    department_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'department',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__departme__C2232422F65C3387",
        unique: true,
        fields: [
          { name: "department_id" },
        ]
      },
    ]
  });
};
