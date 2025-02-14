import './Welcome.css';
import { Outlet } from 'react-router-dom';
import FormComponent from '../components/FormComponent';
import TodoList from '../components/TodoList';

function Welcome() {


  return <>
        <Outlet />
      <main>
        <FormComponent></FormComponent><br></br>
        <TodoList></TodoList>
      </main>

    </>
}

export default Welcome;

export async function postsLoader(){
  const res =  await fetch('http://localhost:8080/canary');
  const resData = await res.json();
  return resData.status;
}
