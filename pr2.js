const express = require("express");

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
app.use(express.json());

// Temporary in-memory data
let users = [
    {
        id: 1,
        name: "John",
        email: "john1232@gmail.com"
    },
    {
        id: 2,
        name: "Alice",
        email: "alice135@gmail.com"
    }
];

// GET - Get all users
app.get("/api/users", (req, res) => {
    res.status(200).json(users);
});

// GET - Get a single user by ID
app.get("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.status(200).json(user);
});

// POST - Create a new user
app.post("/api/users", (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    const newUser = {
        id: users.length > 0
            ? users[users.length - 1].id + 1
            : 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

// PUT - Update an existing user
app.put("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { name, email } = req.body;

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (!name || !email) {
        return res.status(400).json({
            message: "Name and email are required"
        });
    }

    user.name = name;
    user.email = email;

    res.status(200).json({
        message: "User updated successfully",
        user
    });
});

// DELETE - Delete a user
app.delete("/api/users/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const deletedUser = users.splice(userIndex, 1);

    res.status(200).json({
        message: "User deleted successfully",
        user: deletedUser[0]
    });

    //npm init -y
    //npm install express
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
