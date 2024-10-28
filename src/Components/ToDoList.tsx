import { useDispatch , useSelector } from "react-redux"
import { taskSlice,Task,TaskModel,RootState,CreateTask ,dbTasks} from "../Redux/TasksStore"
import { useEffect, useState } from "react";
import { Item } from "./item";
import { Navbar } from "./Navbar";
import "../App.css"
import {addDoc,getDocs} from "firebase/firestore"




async function fetchuserData () : Promise<Task []> 
{

    const snapShot = await getDocs(dbTasks);
    const tasksData: Task[] = snapShot.docs.map((doc) => ({
      fbId : doc.id,
      id: doc.data().id,
      Task: doc.data().Task,
      isCompleted: doc.data().isCompleted
  }));

  return tasksData; 
}

export const ToDoList = ()=>
    {
        const dispatch = useDispatch();
        const [inputvalue,setInputValue] = useState<string>("") ;
        const taskArr:Task [] = useSelector((state : RootState)=>state.value.tasks);
        const taskId :number = taskArr.length; 
   

        useEffect(()=>
        {
        
          fetchuserData().then((tasks : Task[])=>
            {
              tasks.forEach((task) => {
                dispatch(taskSlice.actions.AddTask({
                  fbId:task.fbId,
                  id: task.id,
                  Task: task.Task,
                  isCompleted: task.isCompleted
              }));
            });

            })
            
       
        },[])
        
        const AddTask = async ()=>
          {
             try
             {
                const data:TaskModel = {id:taskId,Task:inputvalue,isCompleted:false}
                await addDoc(dbTasks,data).then((res)=>
                {
                
                  dispatch(taskSlice.actions.AddTask(CreateTask(res.id,taskId,inputvalue,false)))
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
      <Item key={task.id} fbId={task.fbId} isCompleted={task.isCompleted} id={task.id} Task={task.Task} />
      ))}
    </tbody>
        </table>
        </>
    }