const express = require('express');
const sequelize = require('./config/database');

const app = express();
app.use(express.json());

// Test kết nối DB
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Unable to connect to DB:', err));

module.exports = app;