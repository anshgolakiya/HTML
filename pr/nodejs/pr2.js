const express = require("express");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Student data
let students = [
    {
        id: 1,
        name: "Ansh",
        course: "Computer Engineering"
    },
    {
        id: 2,
        name: "Parth",
        course: "IT Engineering"
    }
];

// GET - Get all students
app.get("/students", (req, res) => {
    res.json(students);
});

// POST - Add a new student
app.post("/students", (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        course: req.body.course
    };

    students.push(newStudent);

    res.status(201).json({
        message: "Student added successfully",
        student: newStudent
    });
});

// PUT - Update a student
app.put("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const student = students.find(s => s.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.course = req.body.course;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE - Delete a student
app.delete("/students/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = students.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(index, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});