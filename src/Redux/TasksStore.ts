import { configureStore,PayloadAction,createSlice } from "@reduxjs/toolkit";
import {collection} from "firebase/firestore"
import { db } from "../config/firebase-config";

export const CreateTask = ( fbId:string,id:number,Task:string ,email:string|null,isCompleted :boolean) : Task =>(
    {
        fbId,
        model : {id:id,Task:Task,isCompleted:false,email:email} // default value
    })

export interface Task
{
   fbId: string,
   model:TaskModel
}

export interface TaskModel
{
   id : number,
   Task : string,
   isCompleted : boolean
   email:  string | null
}
interface UserTasksValue
{
    tasks : Task []
}

interface UserTasks
{
    value : UserTasksValue
}


const initialValue : UserTasks= {value:{tasks:[]}}

export const dbTasks = collection(db,"Tasks");

export const taskSlice = createSlice({name:"task",initialState:initialValue,reducers:
    {
        ClearLocalData : (state : UserTasks)=>
            {

                while(state.value.tasks.length>0)
                {
                    state.value.tasks.pop()
                }
              
            },
        AddTask:(state:UserTasks,taskName : PayloadAction<Task>)=>
            {
                state.value.tasks.push(taskName.payload);
            } ,

        RemoveTask:(state:UserTasks , taskToDelete : PayloadAction<number>)=>
        {
            state.value.tasks= state.value.tasks.filter((task)=>
                {
                    return task.model.id!==taskToDelete.payload;
                })
        } ,
        EditTask : (state:UserTasks,taskToEdit:PayloadAction<Task>)=>
            {
                state.value.tasks[taskToEdit.payload.model.id-1]= taskToEdit.payload; //{id:taskToEdit.payload.id,task:taskToEdit.payload.task};

                console.log(state.value.tasks[taskToEdit.payload.model.id-1]);
            }
    }});

export const taskStore= configureStore({reducer:taskSlice.reducer});

export type RootState = ReturnType<typeof taskStore.getState>