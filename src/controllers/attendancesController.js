const attendancesService = require('../services/attendancesService')

exports.checkin = (req, res) => {
  attendancesService.checkin(req, res);
};

exports.checkout = (req, res) => {
  attendancesService.checkout(req, res);
};

/*
Khi bấm lần đầu thì sẽ checkin và lấy ra được shiftId, lưu vào trong 
sharedPreferences,
Bấm lần thứ 2 thì gọi checkout và gửi shiftId từ sharedPreferences lên.
*/