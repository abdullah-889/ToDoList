import { configureStore,PayloadAction,createSlice } from "@reduxjs/toolkit";


export const CreateTask = (id:number,task:string) : Task =>(
    {
        id,
        task,
        isCompleted: false // default value
    })

export interface Task
{
   id : number,
   task : string,
   isCompleted : boolean  
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

export const taskSlice = createSlice({name:"task",initialState:initialValue,reducers:
    {
        AddTask:(state:UserTasks,taskName : PayloadAction<Task>)=>
            {
                state.value.tasks.push(taskName.payload);
            } ,

        RemoveTask:(state:UserTasks , taskToDelete : PayloadAction<number>)=>
        {
            state.value.tasks= state.value.tasks.filter((task)=>
                {
                    return task.id!==taskToDelete.payload;
                })
        } ,
        EditTask : (state:UserTasks,taskToEdit:PayloadAction<Task>)=>
            {
                state.value.tasks[taskToEdit.payload.id-1]= taskToEdit.payload; //{id:taskToEdit.payload.id,task:taskToEdit.payload.task};

                console.log(state.value.tasks[taskToEdit.payload.id-1]);
            }
    }});

export const taskStore= configureStore({reducer:taskSlice.reducer});

export type RootState = ReturnType<typeof taskStore.getState>