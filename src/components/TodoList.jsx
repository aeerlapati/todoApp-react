import React, { useEffect, useState } from 'react';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Fetch todo items from the backend
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch('http://localhost:8080/getAllTodoItems');
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const data = await response.json();
                setTodos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchTodos();
    }, []);
    
    // Render logic
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
        <h1>Todo List</h1>
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
        <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Due Date</th>
        <th>Status</th>
        </tr>
        </thead>
        <tbody>
        {todos.map((todo) => (
            <tr key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td>{todo.description}</td>
            <td>{todo.dueDate}</td>
            <td>{todo.status}</td>
            </tr>
        ))}
        </tbody>
        </table>
        </div>
    );
}
