-- 1. Phòng ban
INSERT INTO department ( department_name, description)
VALUES ('IT', 'Information Technology'), ('HR', 'Human Resources');

-- 2. Người dùng
INSERT INTO user_db ( department_id, full_name, role, email, phone, pass_word, status)
VALUES 
( 1, 'Admin User', 'admin', 'admin@example.com', '0123456789', 'admin123', 'offline'),
( 2, 'User One', 'user', 'user1@example.com', '0987654321', 'user123', 'offline');

-- 3. Loại ticket
INSERT INTO ticket_categories (category_name)
VALUES ('Software'), ('Hardware');

-- 4. Ticket
INSERT INTO tickets ( title, description, priority, status, category_id, requester_id, assigned_to, resolved_at)
VALUES 
( 'Cannot login', 'User cannot login to system', 'high', 'open', 1, 2, 1, NULL),
( 'Printer not working', 'Printer in HR department is offline', 'medium', 'open', 2, 1, 2, NULL);

-- 5. Đính kèm
INSERT INTO ticket_attachments ( ticket_id, file_path)
VALUES 
( 1, 'uploads/file1.pdf'),
( 2, 'uploads/image2.png');

-- 6. Bình luận
INSERT INTO ticket_comments ( ticket_id, user_id, comment_text)
VALUES 
( 1, 1, 'Please provide more details.'),
( 2, 2, 'Issue has been resolved.');

-- 7. Audit log
INSERT INTO audit_logs ( user_id, action, timestamp)
VALUES 
( 1, 'CREATE_TICKET', GETDATE()),
( 2, 'UPDATE_TICKET', GETDATE());

-- 8. Thông báo
INSERT INTO notifications ( user_id, message, is_read)
VALUES 
( 1, 'Your ticket has been updated', 0),
( 2, 'New comment on your ticket', 0);

-- Bảng ca làm việc
CREATE TABLE shifts (
    shift_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL FOREIGN KEY REFERENCES user_db(user_id) ON DELETE CASCADE,
    location_lat FLOAT NOT NULL,
    location_lng FLOAT NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    allowed_radius INT DEFAULT 50, -- mét
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

-- Bảng chấm công
CREATE TABLE attendance (
    attendance_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL FOREIGN KEY REFERENCES user_db(user_id) ON DELETE NO ACTION,
    shift_id INT NOT NULL FOREIGN KEY REFERENCES shifts(shift_id) ON DELETE CASCADE,
    check_in_time DATETIME NULL,
    check_out_time DATETIME NULL,
    status NVARCHAR(50), -- On time / Late / Early Leave / Absent
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);
