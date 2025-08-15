const express = require('express');
const sequelize = require('./config/database');
const ticketsRoute = require('./routes/ticketsRoute'); 

const app = express();
app.use(express.json());

// Đăng ký route cho tickets
app.use('/api/tickets', ticketsRoute);

// Test kết nối DB
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Unable to connect to DB:', err));

module.exports = app;