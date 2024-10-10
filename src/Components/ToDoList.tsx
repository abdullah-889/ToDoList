import { useDispatch , useSelector } from "react-redux"
import { taskSlice,Task,RootState,CreateTask } from "../Redux/TasksStore"
import { useState } from "react";
import { Item } from "./item";
import { Navbar } from "./Navbar";
import "../App.css"
import {addDoc,collection} from "firebase/firestore"
import { db } from "../config/firebase-config";
export const ToDoList = ()=>
    {
        const dispatch = useDispatch();
        const [inputvalue,setInputValue]   = useState<string>("") ;
        const taskArr:Task [] = useSelector((state : RootState)=>state.value.tasks);
        const taskId :number = taskArr.length; 
        const  dbTasks = collection(db,"Tasks");
        
        const AddTask = async ()=>
          {
             try
             {
                const data:Task = { id:taskId,task:inputvalue,isCompleted:false}
                await addDoc(dbTasks,data).then(()=>
                {
                  dispatch(taskSlice.actions.AddTask(CreateTask(taskId,inputvalue)))
                });
             }
             catch (err)
             {

             }
          }


        return <>
              <Navbar/>
      <div className="input-container">
        <input  onChange={(event : React.ChangeEvent<HTMLInputElement>)=>{setInputValue(event.target.value)}} placeholder='Enter The Task'/> 
          <button onClick={AddTask}>Add</button>
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
      {
      taskArr.map((task) => ( 
      <Item key={task.id} isCompleted={task.isCompleted} id={task.id} task={task.task} />
      ))}
    </tbody>
        </table>
        </>
    }