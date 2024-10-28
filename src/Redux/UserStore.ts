import { createSlice ,PayloadAction,configureStore } from "@reduxjs/toolkit";

interface User
{
    email : string
}

const initialValue : User = {email:""};

export const userSlice = createSlice({name:"user",initialState:initialValue,reducers: 
    {
        SubscribeUser:(state:User , email : PayloadAction<User>)=>
            {
                state.email = email.payload.email;
            }
    }}
    )

export const userStore = configureStore({reducer:userSlice.reducer}) 