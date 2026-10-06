import { useState } from "react";

function App() {
    // Form data
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        age: ""
    });

    // Validation errors
    const [errors, setErrors] = useState({});

    // Handle all input fields
    function handleChange(e) {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });

        validateField(name, value);
    }

    // Real-time validation
    function validateField(name, value) {
        let message = "";

        if (name === "name") {
            if (value.trim() === "") {
                message = "Name is required";
            }
        }

        if (name === "email") {
            if (value.trim() === "") {
                message = "Email is required";
            } else if (!value.includes("@")) {
                message = "Enter a valid email";
            }
        }

        if (name === "password") {
            if (value.length < 6) {
                message =
                    "Password must contain at least 6 characters";
            }
        }

        if (name === "age") {
            if (value === "") {
                message = "Age is required";
            } else if (Number(value) < 18) {
                message = "Age must be 18 or above";
            }
        }

        setErrors({
            ...errors,
            [name]: message
        });
    }

    // Submit form
    function handleSubmit(e) {
        e.preventDefault();

        const newErrors = {};

        // Validate all fields
        Object.keys(formData).forEach((name) => {
            const value = formData[name];
            let message = "";

            if (name === "name" && value.trim() === "") {
                message = "Name is required";
            }

            if (name === "email") {
                if (value.trim() === "") {
                    message = "Email is required";
                } else if (!value.includes("@")) {
                    message = "Enter a valid email";
                }
            }

            if (name === "password") {
                if (value.length < 6) {
                    message =
                        "Password must contain at least 6 characters";
                }
            }

            if (name === "age") {
                if (value === "") {
                    message = "Age is required";
                } else if (Number(value) < 18) {
                    message = "Age must be 18 or above";
                }
            }

            if (message) {
                newErrors[name] = message;
            }
        });

        setErrors(newErrors);

        // Stop submission if there are errors
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        alert("Registration successful!");
        console.log(formData);
    }

    return (
        <div
            style={{
                width: "400px",
                margin: "40px auto",
                fontFamily: "Arial"
            }}
        >
            <h1>User Registration</h1>

            <form onSubmit={handleSubmit}>

                {/* Name */}
                <label>Name:</label>
                <br />

                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <p style={{ color: "red" }}>
                    {errors.name}
                </p>

                {/* Email */}
                <label>Email:</label>
                <br />

                <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />

                <p style={{ color: "red" }}>
                    {errors.email}
                </p>

                {/* Password */}
                <label>Password:</label>
                <br />

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <p style={{ color: "red" }}>
                    {errors.password}
                </p>

                {/* Age */}
                <label>Age:</label>
                <br />

                <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                />

                <p style={{ color: "red" }}>
                    {errors.age}
                </p>

                <button type="submit">
                    Register
                </button>

            </form>
        </div>
    );
}

export default App;