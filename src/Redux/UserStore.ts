import { createSlice ,PayloadAction,configureStore } from "@reduxjs/toolkit";

interface User
{
    email : string|null
}

const initialValue : User = {email:""};

export const userSlice = createSlice({name:"user",initialState:initialValue,reducers: 
    {
        SubscribeUser:(state:User , action : PayloadAction<User>)=>
            {
                state.email = action.payload.email;
            }
            ,UnsubscribeUser:(state:User)=>
                {
                    state.email="";
                    // LOGOUT HERE
                }
    }}
    )

export const userStore = configureStore({reducer:userSlice.reducer}) 

export type UserState = ReturnType<typeof userStore.getState>