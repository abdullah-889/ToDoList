import { useDispatch , useSelector } from "react-redux"
import { taskSlice,Task,RootState,CreateTask } from "../Redux/TasksStore"
import { useState } from "react";
import { Item } from "./item";
import "../App.css"
export const ToDoList = ()=>
    {

        const dispatch = useDispatch();
        const [inputvalue,setInputValue]   = useState<string>("") ;
       
        const taskArr:Task [] = useSelector((state : RootState)=>state.value.tasks);
        const taskId :number = taskArr.length; 

        return <>
      <div className="input-container">
        <input  onChange={(event : React.ChangeEvent<HTMLInputElement>)=>{setInputValue(event.target.value)}} placeholder='Enter The Task'/> 
          <button onClick={()=>
            {
              dispatch(taskSlice.actions.AddTask(CreateTask(taskId,inputvalue)))//{id : taskId, task : inputvalue}))
            }}>Add</button>
      </div>
      <div>
        { taskArr.length>0? <p> Your Pending Tasks</p>:"" }
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
        </>
    }