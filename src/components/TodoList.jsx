import React, { useEffect, useState } from 'react';

export default function TodoList() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingTodo, setEditingTodo] = useState(null);

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
    
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    const handleEdit = (id) => {
        const todo = todos.find((todo) => todo.id === id);
        setEditingTodo({ ...todo });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingTodo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (id) => {
        console.log(id);
        try {
            const response = await fetch(`http://localhost:8080/update/todoItem/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editingTodo),
            });
            if (!response.ok) {
                throw new Error('Failed to update');
            }
            setTodos((prevTodos) =>
                prevTodos.map((todo) =>
                    todo.id === id ? editingTodo : todo
                )
            );

            setEditingTodo(null);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    
    return (
        <div>
        <h1>Existing Todo List</h1>
        <table border="1" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
        <thead>
        <tr style={{textAlign:'center'}}>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Due Date</th>
        <th>Status</th>
        <th>CompletionDate</th>
        <th>Actions</th>
        </tr>
        </thead>
        <tbody>
        {todos.map((todo) => (
            <tr style={{textAlign:'center'}} key={todo.id}>
            <td>{todo.id}</td>
            <td>{todo.name}</td>
            <td>{todo.description}</td>
            <td>
                                {editingTodo?.id === todo.id ? (
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={editingTodo.dueDate}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    todo.dueDate
                                )}
            </td>           
             <td>
                                {editingTodo?.id === todo.id ? (
                                    <select
                                        name="status"
                                        value={editingTodo.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Canceled</option>
                                    </select>
                                ) : (
                                    todo.status
                                )}
            </td>
                <td>{todo.completionDate ? todo.completionDate: "N/A"}</td>
            <td>
                                {editingTodo?.id === todo.id ? (
                                    <button onClick={() => handleSubmit(todo.id)}>Submit</button>
                                ) : (
                                    <button onClick={() => handleEdit(todo.id)}>Edit</button>
                                )}
            </td>          
             
        </tr>
        ))}
        </tbody>
        </table>
        </div>
    );
}
