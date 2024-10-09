import { Link } from "react-router-dom";

export const Navbar = ()=>
    {
        return <div className="navbar">
                <div>
                <p>To-Do List App</p>
                </div>
                <div>
                <Link to={"/"}>Login</Link>
                <Link to={"/List"}>Your List</Link>
                    </div>

             
               </div>
  
    }