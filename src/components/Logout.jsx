import { useContext, useEffect } from "react";
import { useAuth } from "./AppContentext";
import "../css/Login.css";
import { useNavigate } from "react-router-dom";

function Logout() {
  const {setSigned, setSigner} = useAuth()
  const navigate = useNavigate()
  localStorage.clear();
  setSigned(false)
  setSigner("")
  

  setTimeout(() => navigate('/login'), 1000)

  return (
    <div className="logout-container">      
    <h3 style = {{textAlign:"center"}}>Olette poistuneet</h3>
    </div>
  );
}

export default Logout;
