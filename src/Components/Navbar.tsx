import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase-config";
import { useDispatch } from "react-redux";
import { userSlice } from "../Redux/UserStore";
import { useNavigate } from "react-router-dom";
export const Navbar = ()=>
    {
        const dispatch = useDispatch();
        const navigate = useNavigate();

        const handleLogout = async () => {
            try {
              await signOut(auth); // Sign out from Firebase
              dispatch(userSlice.actions.UnsubscribeUser()); // Clear user email from Redux store
              navigate("/"); // Redirect to login page
            } catch (error) {
              console.error("Error signing out:", error);
            }
          };

        return <div className="navbar">
                <div>
                <p>To-Do List App</p>
                </div>
                <div>
                <button onClick={handleLogout} >Logout</button>
                <Link to={"/List"}>Your List</Link>
                    </div>

             
               </div>
  
    }