CREATE DATABASE school_fee_management;
USE school_fee_management;

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    class VARCHAR(50),
    phone_number VARCHAR(15),
    email VARCHAR(100),
    address TEXT
);

CREATE TABLE fees (
    fee_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    month VARCHAR(20),
    amount_paid DECIMAL(10, 2),
    amount_due DECIMAL(10, 2),
    FOREIGN KEY (student_id) REFERENCES students(student_id)
);


INSERT INTO students (name, class, phone_number, email, address)
VALUES ('Noor', '3rd year', '1234567890', 'noor@gmail.com', 'Karachi');

-- Inserting fee data for the student
INSERT INTO fees (student_id, month, amount_paid, amount_due)
VALUES (1, 'January', 200.00, 50.00);


SELECT s.student_id, s.name, s.class, f.month, f.amount_paid, f.amount_due
FROM students s
JOIN fees f ON s.student_id = f.student_id;

UPDATE fees
SET amount_due = 0
WHERE student_id = 1 AND month = 'January';


DELETE FROM fees WHERE student_id = 1;

DELETE FROM students WHERE student_id = 1;
