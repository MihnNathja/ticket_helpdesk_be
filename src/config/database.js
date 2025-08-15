const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,      // Tên database
  process.env.DB_USER,      // Tên user
  process.env.DB_PASSWORD,  // Mật khẩu
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mssql',
    dialectModule: require('tedious'),
    port: process.env.DB_PORT || 1433,
    logging: false,
  }
);

module.exports = sequelize;