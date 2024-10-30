import { useDispatch , useSelector } from "react-redux"
import { taskSlice,Task,TaskModel,RootState,CreateTask ,dbTasks} from "../Redux/TasksStore"
import { useEffect, useState } from "react";
import { Item } from "./item";
import { Navbar } from "./Navbar";
import "../App.css"
import {addDoc,getDocs} from "firebase/firestore"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { userSlice, UserState } from "../Redux/UserStore";
import { useNavigate } from "react-router-dom";



async function fetchuserData () : Promise<Task []> 
{
    const snapShot = await getDocs(dbTasks);
    const tasksData: Task[] = snapShot.docs.map((doc) => ({
      fbId : doc.id,
      model : {id: doc.data().id,Task: doc.data().Task,isCompleted: doc.data().isCompleted ,email: doc.data().email}
  }));

  return tasksData; 
}

export const ToDoList = ()=>
    {
        const navigate=useNavigate();
        const dispatch = useDispatch();
        const [inputvalue,setInputValue] = useState<string>("") ;
        const taskArr:Task [] = useSelector((state : RootState)=>state.value.tasks);
        const taskId :number = taskArr.length; 
        const userMail :string | null = useSelector((state:UserState)=>state.email)

        useEffect(()=>
        {
          dispatch(taskSlice.actions.ClearLocalData())
          const unsubscribe = onAuthStateChanged(auth,(user)=>
            {
              if(user)
              {
                dispatch(userSlice.actions.SubscribeUser({email:user.email}))

                fetchuserData().then((tasks : Task[])=>
                  {
                    tasks.forEach((task) => {
                      dispatch(taskSlice.actions.AddTask({
                        fbId:task.fbId,
                        model:{id: task.model.id, Task: task.model.Task,isCompleted: task.model.isCompleted , email:task.model.email}
                    }));
                  });
      
                  })
      
              }
              else
              {
                navigate("/");
                dispatch(userSlice.actions.UnsubscribeUser())
              }
            })

     
            return ()=> unsubscribe()
        },[dispatch,navigate])
        
        const AddTask = async ()=>
          {
             try
             {
              console.log(`call ai soneya ${userMail}`)
                const data:TaskModel = {id:taskId,Task:inputvalue,isCompleted:false,email:userMail}
                await addDoc(dbTasks,data).then((res)=>
                {
                
                  dispatch(taskSlice.actions.AddTask(CreateTask(res.id,taskId,inputvalue,userMail,false)))
                });
             }
             catch (err)
             {
                alert(err)
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
      <Item key={task.model.id} fbId={task.fbId} model={{id: task.model.id, Task: task.model.Task,isCompleted: task.model.isCompleted , email:task.model.email}} />
      ))}
    </tbody>
        </table>
        </>
    }