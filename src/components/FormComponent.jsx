import { useState } from "react";
import './FormComponent.css';

export default function FormComponent(){

    async function submitForm() {
        try {
          const response = await fetch('http://localhost:8080/add/todoItem', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTodo), // Assuming `newTodo` has all the required fields
            });
            console.log(response);

            if(response){
                setSubmitSuccessfull(true)
            }
        }catch(e){
            console.error(e);
        };
    } 

    const [submiSuccessfull, setSubmitSuccessfull] = useState(false);
    const [newTodo, setNewTodo] = useState({ name: "", description: "", dueDate: "", status: "Pending" });
  
    const handleSubmit = (event) => {
      event.preventDefault();
      submitForm();
    };
  
    return <>
    <form onSubmit={handleSubmit}>
      <label>
        Name&nbsp;
        <input name="name" onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })} required />
      </label>
      <br />
      <br />
      <label>
        Description&nbsp;
        <textarea name="description" colSpan={3} onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}></textarea>
      </label>
      <br />
      <br />
      <label>
    Due Date&nbsp;
    <input
      name="dueDate"
      type="date"
      onChange={(e) => setNewTodo({ ...newTodo, dueDate: e.target.value })}
      value={newTodo.dueDate}
    />
  </label>
  <br />
  <br />
  <label>
    Status&nbsp;
    <select
      name="status"
      onChange={(e) => setNewTodo({ ...newTodo, status: e.target.value })}
      value={newTodo.status}
    >
      <option value="Pending">Pending</option>
      <option value="Completed">Completed</option>
      <option value="Cancelled">Cancelled</option>
    </select>
  </label>
      <br />
      <br />
      <button type="submit">Submit Form</button>
    </form>
    {submiSuccessfull && "Submission Successfull"}
  </>

}
