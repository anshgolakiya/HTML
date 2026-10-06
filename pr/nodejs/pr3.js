const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MySQL Connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college_db"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.log("MySQL connection failed:", err.message);
        return;
    }

    console.log("MySQL connected successfully!");
});

// Home Route
app.get("/", (req, res) => {
    res.send("<h1>MySQL CRUD API is running</h1>");
});

// POST - Add a new student
app.post("/students", (req, res) => {
    const { name, course } = req.body;

    const sql =
        "INSERT INTO students (name, course) VALUES (?, ?)";

    db.query(sql, [name, course], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.status(201).json({
            message: "Student added successfully",
            id: result.insertId
        });
    });
});

// GET - Get all students
app.get("/students", (req, res) => {
    const sql = "SELECT * FROM students";

    db.query(sql, (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        res.json(results);
    });
});

// GET - Get student by ID
app.get("/students/:id", (req, res) => {
    const id = req.params.id;

    const sql =
        "SELECT * FROM students WHERE id = ?";

    db.query(sql, [id], (err, results) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json(results[0]);
    });
});

// PUT - Update student
app.put("/students/:id", (req, res) => {
    const id = req.params.id;
    const { name, course } = req.body;

    const sql =
        "UPDATE students SET name = ?, course = ? WHERE id = ?";

    db.query(
        sql,
        [name, course, id],
        (err, result) => {
            if (err) {
                return res.status(500).json({
                    error: err.message
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    message: "Student not found"
                });
            }

            res.json({
                message: "Student updated successfully"
            });
        }
    );
});

// DELETE - Delete student
app.delete("/students/:id", (req, res) => {
    const id = req.params.id;

    const sql =
        "DELETE FROM students WHERE id = ?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                error: err.message
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully"
        });
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(
        `Server running at http://localhost:${PORT}`
    );
});