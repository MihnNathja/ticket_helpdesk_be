const express = require('express');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');
const sequelize = require('./config/database');

const ticketsRoute = require('./routes/ticketsRoute');
const attendanceRoute = require('./routes/attendanceRoute');

const app = express();
app.use(express.json());
app.use(cors());

// Đăng ký route cho tickets
app.use('/api/tickets', ticketsRoute);
// Đăng ký route cho attendance
app.use('/api/attendance', attendanceRoute);

// Test kết nối DB
sequelize.authenticate()
  .then(() => console.log('Database connected!'))
  .catch(err => console.error('Unable to connect to DB:', err));

app.use(errorHandler);

module.exports = app;