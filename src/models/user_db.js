const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_db', {
    user_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    department_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'department',
        key: 'department_id'
      }
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(20),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: "UQ__user_db__AB6E616473F20BCA"
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    pass_word: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: "offline"
    }
  }, {
    sequelize,
    tableName: 'user_db',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__user_db__B9BE370F9BA63810",
        unique: true,
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "UQ__user_db__AB6E616473F20BCA",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
