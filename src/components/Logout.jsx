import { useState } from "react";
import { useAuth } from "./AppContentext";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";
import {getAuth, signOut} from "firebase/auth"

function Logout() {
  const [message, setMessage] = useState(null)
  const navigate = useNavigate()
  localStorage.clear();
  
  const auth = getAuth()
  signOut(auth).then(() => setMessage("Olette potkittu ulos"))

  setTimeout(() => navigate('/login'), 1000)

  return (
    <div className="logout-container">      
    {message ? <h3 style = {{textAlign:"center"}}>{message}</h3> : <h3>Olette viellä kirjautuneena</h3>}
    </div>
  );
}

export default Logout;
