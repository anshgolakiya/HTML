const express = require("express");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "YOUR_MYSQL_PASSWORD",
    database: "userdb"
});

// Connect to MySQL
db.connect((err) => {
    if (err) {
        console.error("MySQL connection failed:", err);
        return;
    }

    console.log("Connected to MySQL database");
});

// ========================================
// GET - Get all users
// ========================================

app.get("/api/users", (req, res) => {

    const sql = "SELECT * FROM users";

    db.query(sql, (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(200).json(results);
    });
});


// ========================================
// GET - Get user by ID
// ========================================

app.get("/api/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const sql = "SELECT * FROM users WHERE id = ?";

    db.query(sql, [id], (err, results) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json(results[0]);
    });
});


// ========================================
// POST - Create new user
// ========================================

app.post("/api/users", (req, res) => {

    const { name, email } = req.body;

    if (!name || !email) {

        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const sql = `
        INSERT INTO users (name, email)
        VALUES (?, ?)
    `;

    db.query(sql, [name, email], (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        res.status(201).json({
            message: "User created successfully",
            user: {
                id: result.insertId,
                name: name,
                email: email
            }
        });
    });
});


// ========================================
// PUT - Update user
// ========================================

app.put("/api/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const { name, email } = req.body;

    if (!name || !email) {

        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const sql = `
        UPDATE users
        SET name = ?, email = ?
        WHERE id = ?
    `;

    db.query(sql, [name, email, id], (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: {
                id: id,
                name: name,
                email: email
            }
        });
    });
});


// ========================================
// DELETE - Delete user
// ========================================

app.delete("/api/users/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const sql = "DELETE FROM users WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if (err) {
            console.error(err);

            return res.status(500).json({
                message: "Database error"
            });
        }

        if (result.affectedRows === 0) {

            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully"
        });
    });
});


// ========================================
// Home route
// ========================================

app.get("/", (req, res) => {
    res.send("User API is running");
});


// ========================================
// Start server
// ========================================

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
