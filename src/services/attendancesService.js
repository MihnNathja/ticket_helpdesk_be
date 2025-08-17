const attendancesRepository = require('../repositories/attendancesRepository');

function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // m
  const toRad = x => x * Math.PI / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
}

exports.checkin = async (req, res) => {
  const { user_id, latitude, longitude, timestamp } = req.body;

  try {
    // Tìm ca làm việc hiện tại
    console.log('Tìm ca làm việc hiện tại');
    let shift = await attendancesRepository.findCurrentShift(user_id, timestamp);
    console.log('Shift found:', shift);

    // Nếu không có ca hiện tại, tìm ca gần nhất cùng ngày
    if (!shift) {
      console.log('Không tìm thấy ca làm việc hiện tại, tìm ca gần nhất cùng ngày');
      const checkinTime = new Date(timestamp);
      const checkinDay = checkinTime.toISOString().split('T')[0];
      shift = await attendancesRepository.findNearestShift(user_id, checkinTime, checkinDay);
      console.log('Nearest shift found:', shift);
      if (!shift) {
        return res.status(400).json({ success: false, reason: "Không tìm thấy ca làm việc cùng ngày" });
      }
    }

    // Tính khoảng cách
    const distance = haversine(latitude, longitude, shift.location_lat, shift.location_lng);
    console.log('Calculated distance:', distance);
    if (distance > shift.allowed_radius) {
      console.log('Sai vị trí');
      return res.status(400).json({ success: false, reason: "Sai vị trí" });
    }

    // Kiểm tra thời gian
    const time = timestamp.split('T')[1]; // "08:01:00"
    // Chuyển start_time về chuỗi "HH:mm:ss"
    const startTimeStr = shift.start_time instanceof Date
      ? shift.start_time.toTimeString().slice(0, 8)
      : shift.start_time;

    console.log('Check-in time:', time);
    console.log('Shift start_time:', startTimeStr);
    
    let status = "late";  
    let message = "Check-in trễ giờ";
    if (time <= startTimeStr) {
      status = "on_time";
      message = "Check-in đúng giờ";
    }
    const result = res.json({
      success: true,
      shift_id: shift.id,
      status: status,
      message: message
    });
    // Cập nhật vào bảng điểm danh
    await attendancesRepository.updateAttendance(user_id, shift.id, timestamp, status);
    return result;
    
  } catch (err) {
    console.error('Lỗi hệ thống:', err);
    return res.status(500).json({ success: false,  status: "cannot_checkin", message: "Không thể check-in" });
  }
}

exports.checkout = async (req, res) => {
  const { user_id, shift_id, timestamp } = req.body;

  try {
    // Kiểm tra ca làm việc
    const shift = await attendancesRepository.findShiftById(shift_id);
    if (!shift) {
      return res.status(400).json({ success: false, reason: "Không tìm thấy ca làm việc" });
    }

    // Kiểm tra thời gian checkout
    if (timestamp < shift.end_time) {
      return res.status(400).json({ success: false, reason: "Thời gian checkout không hợp lệ" });
    }

    // Cập nhật thời gian checkout
    await attendancesRepository.updateAttendance(user_id, shift_id, timestamp, null);
    return res.json({ success: true, message: "Checkout thành công" });

  } catch (err) {
    console.error('Lỗi hệ thống:', err);
    return res.status(500).json({ success: false, message: "Không thể checkout" });
  }
};
