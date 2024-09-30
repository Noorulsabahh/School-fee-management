const express = require('express');
const mysql = require('mysql2'); // Changed to mysql2
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'pass123',  // Replace with your MySQL root password
    database: 'school_fee_management'
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL database.');
});

// Get all students
app.get('/students', async (req, res) => {
    try {
        const [results] = await db.promise().query('SELECT * FROM students');
        res.status(200).json(results);
    } catch (err) {
        console.error('Error fetching students:', err);
        res.status(500).json({ message: 'Failed to retrieve students', error: err });
    }
});

// Add a new student
app.post('/students', async (req, res) => {
    const student = req.body;
    const query = 'INSERT INTO students (name, class, phone_number, email, address) VALUES (?, ?, ?, ?, ?)';

    try {
        const [result] = await db.promise().query(query, [student.name, student.class, student.phone_number, student.email, student.address]);
        res.status(201).json({ message: 'Student added', studentId: result.insertId });
    } catch (err) {
        console.error('Error adding student:', err);
        res.status(500).json({ message: 'Failed to add student', error: err });
    }
});

// Update student
app.put('/students/:id', async (req, res) => {
    const id = req.params.id;
    const student = req.body;
    const query = 'UPDATE students SET name = ?, class = ?, phone_number = ?, email = ?, address = ? WHERE student_id = ?';

    try {
        await db.promise().query(query, [student.name, student.class, student.phone_number, student.email, student.address, id]);
        res.status(200).json({ message: 'Student updated' });
    } catch (err) {
        console.error('Error updating student:', err);
        res.status(500).json({ message: 'Failed to update student', error: err });
    }
});

// Delete student
app.delete('/students/:id', async (req, res) => {
    const id = req.params.id;
    const query = 'DELETE FROM students WHERE student_id = ?';

    try {
        await db.promise().query(query, [id]);
        res.status(200).json({ message: 'Student deleted' });
    } catch (err) {
        console.error('Error deleting student:', err);
        res.status(500).json({ message: 'Failed to delete student', error: err });
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
