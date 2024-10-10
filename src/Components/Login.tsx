import React, { useState } from "react"
import {auth}from "../config/firebase-config"
import { signInWithEmailAndPassword ,signInWithPopup} from "firebase/auth"
import { useNavigate } from "react-router-dom"
export const Login =()=>
    {
        const [email,setEmail] = useState<string>("")
        const [password,setPassword] =useState<string>("")
        const navigate=useNavigate();
        const signIn= async ()=>
            {
                try
                {
                    await signInWithEmailAndPassword(auth,email,password).then(()=>
                        {
                            navigate("/List")
                        })
                }
                catch (err)
                {
                    alert(err);
                }
             
            }

        return (<div  style={{padding:"87px",borderRadius:"50px",position:"absolute",left:"50%" , top:"50% ", transform:"translate(-50%, -50%)",display:"flex" ,flexDirection:"column" , alignItems:"center" ,backgroundColor:"#eb93a9" , width:"500px"}} className="input-container">
            <p style={{color:"#252729"}}>Welcome</p>
            <input onChange={(e : React.ChangeEvent<HTMLInputElement>)=>
                {
                    setEmail(e.target.value);
                }} 
                placeholder="Enter Your Email"/>
            <input type="password"onChange={(e:React.ChangeEvent<HTMLInputElement>)=>
                {
                    setPassword(e.target.value)
                }} placeholder="Password"/>
            <button onClick={()=>{signIn()}}>Login</button>
        </div>
        )
    }