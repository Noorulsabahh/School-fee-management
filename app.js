// Sample student data
let students = [
    { id: 1, name: 'John Doe', class: '10', feeStatus: 'Paid', dues: 0 },
    { id: 2, name: 'Jane Smith', class: '9', feeStatus: 'Unpaid', dues: 100 }
];

// Function to display students in the table
function displayStudents() {
    const studentTable = document.querySelector('#studentTable tbody');
    studentTable.innerHTML = ''; // Clear table content

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.class}</td>
            <td>${student.feeStatus}</td>
            <td>${student.dues}</td>
            <td>
                <button onclick="editStudent(${student.id})">Edit</button>
                <button onclick="deleteStudent(${student.id})">Delete</button>
            </td>
        `;
        studentTable.appendChild(row);
    });
}

// Handle form submission for adding/updating students
document.getElementById('feeForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('studentName').value;
    const studentClass = document.getElementById('studentClass').value;
    const feeStatus = document.getElementById('feeStatus').value;
    const dues = document.getElementById('dues').value;

    const studentIndex = students.findIndex(student => student.id == id);

    if (studentIndex >= 0) {
        // Update existing student
        students[studentIndex] = { id, name, class: studentClass, feeStatus, dues };
    } else {
        // Add new student
        students.push({ id, name, class: studentClass, feeStatus, dues });
    }

    displayStudents();
    this.reset();
});

// Edit student details
function editStudent(id) {
    const student = students.find(s => s.id === id);
    document.getElementById('studentId').value = student.id;
    document.getElementById('studentName').value = student.name;
    document.getElementById('studentClass').value = student.class;
    document.getElementById('feeStatus').value = student.feeStatus;
    document.getElementById('dues').value = student.dues;
}

// Delete student record
function deleteStudent(id) {
    students = students.filter(s => s.id !== id);
    displayStudents();
}

// Display students on page load
displayStudents();
