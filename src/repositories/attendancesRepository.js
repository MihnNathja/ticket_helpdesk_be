const { shifts } = require('../models/init-models')(require('../config/database'));
const { check } = require('express-validator');
const { Op } = require('sequelize');

exports.findCurrentShift = async (user_id, timestamp) => {
  console.log(user_id);
  console.log(timestamp);
  const shift = await shifts.findOne({
    where: {
      user_id,
      start_time: { [Op.lte]: timestamp },
      end_time: { [Op.gte]: timestamp }
    }
  });
  return shift;
};

exports.findNearestShift = async (user_id, checkinTime, checkinDay) => {
  return await shifts.findOne({
    where: {
      user_id,
      [Op.and]: [
        // Lọc cùng ngày
        sequelize.where(sequelize.fn('CONVERT', sequelize.literal('date'), sequelize.col('start_time')), checkinDay),
        { start_time: { [Op.gte]: checkinTime } }
      ]
    },
    order: [['start_time', 'ASC']]
  });
};

exports.updateAttendance = async (user_id, shift_id, timestamp, status) => {
  if (status != null) {
    // Nếu status có giá trị khác null thì cập nhật thời gian và status
    await attendances.update(
      { status, check_in_time: timestamp },
      {
        where: {
          user_id,
          shift_id
        }
      }
    );
  } 
  else {
    //Nếu status là null thì cập nhật thời gian
    await attendances.update(
      { check_out_time: timestamp },
      {
        where: {
          user_id,
          shift_id
        }
      }
    );
  }
};
