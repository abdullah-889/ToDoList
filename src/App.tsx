import React, {useState} from 'react';
import './App.css';
import { Item } from './Components/item';
import { taskSlice,RootState, Task ,CreateTask} from './Redux/TasksStore';
import { useDispatch,useSelector} from 'react-redux';
function App() 
{
  const [inputvalue,setInputValue]   = useState<string>("") ;
  const dispatch= useDispatch();
  const taskArr:Task [] = useSelector((state : RootState)=>state.value.tasks);
  const taskId :number = taskArr.length; 
  return (
    <div className="App">
      <h1>To-Do List App</h1>
      <div className="input-container">
        <input  onChange={(event : React.ChangeEvent<HTMLInputElement>)=>{setInputValue(event.target.value)}} placeholder='Enter The Task'/> 
          <button onClick={()=>
            {
              dispatch(taskSlice.actions.AddTask(CreateTask(taskId,inputvalue)))//{id : taskId, task : inputvalue}))
            }}>Add</button>
      </div>
      <div>
        <p>
          Your Pending Tasks
        </p>
      </div>
      <table>
        <thead>
        <tr>
  
        </tr>
        </thead>
        <tbody>
      {taskArr.map((task) => (
        <Item key={task.id} isCompleted={task.isCompleted} id={task.id} task={task.task} />
      ))}
    </tbody>
        </table>
    </div>
  );
}

export default App;
