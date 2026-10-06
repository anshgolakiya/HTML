import { useState } from "react";

function App() {
    const [task, setTask] = useState("");
    const [todos, setTodos] = useState([]);

    // Add task
    function addTask() {
        if (task.trim() === "") {
            return;
        }

        const newTodo = {
            id: Date.now(),
            text: task,
            completed: false
        };

        setTodos([...todos, newTodo]);
        setTask("");
    }

    // Complete / Uncomplete task
    function completeTask(id) {
        setTodos(
            todos.map(todo =>
                todo.id === id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            )
        );
    }

    // Delete task
    function deleteTask(id) {
        setTodos(
            todos.filter(todo => todo.id !== id)
        );
    }

    return (
        <div
            style={{
                width: "400px",
                margin: "50px auto",
                fontFamily: "Arial"
            }}
        >
            <h1>Todo List</h1>

            {/* Add Task */}
            <input
                type="text"
                value={task}
                placeholder="Enter a task"
                onChange={(e) => setTask(e.target.value)}
            />

            <button onClick={addTask}>
                Add
            </button>

            {/* Display Tasks */}
            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <span
                            onClick={() => completeTask(todo.id)}
                            style={{
                                textDecoration: todo.completed
                                    ? "line-through"
                                    : "none",
                                cursor: "pointer"
                            }}
                        >
                            {todo.text}
                        </span>

                        <button
                            onClick={() => deleteTask(todo.id)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;