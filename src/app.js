const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Test kết nối DB
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Unable to connect to DB:', err));

const ticketsRoute = require('./routes/ticketsRoute');
app.use('/api/tickets', ticketsRoute);

module.exports = app;