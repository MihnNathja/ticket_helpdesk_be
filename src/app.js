const express = require('express');
const sequelize = require('./config/database');
const ticketsRoute = require('./routes/ticketsRoute');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(express.json());
app.use(cors());

// Đăng ký route cho tickets
app.use('/api/tickets', ticketsRoute);

// Test kết nối DB
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Unable to connect to DB:', err));

app.use(errorHandler);

module.exports = app;