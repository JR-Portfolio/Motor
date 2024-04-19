import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageLogin from "/avatar-icon.png";
import ImageLogout from "/logout.png";
import AddUser from "/addUser.png";
import Signed from "/signed.png";
import { useAuth } from "../components/AppContentext";
import "../css/App.css"

export default function Header() {
  const { signer, signed, setSigned, setSigner, firstname } = useAuth();
  const [isHovered, setIsHovered] = useState(false)

  const handleHover = () => {
    setIsHovered(!isHovered)  
  }

  return (
    <header>
      <Link className="site-logo" to="/">
        #JRLA
      </Link>
      <nav>
        {!signed && (
          <>
            <Link to="/login">
              <img src={ImageLogin} width="40" height="40" />
            </Link>            
          </>
        )}

        {signed && (
          <>
            <Link to="/">Pääsivu</Link>
            <Link to="/services">Huollot</Link>
            <Link to="/trips">Matkat</Link>
            <Link to="/addUser">
              <img src={AddUser} />
            </Link>
            <Link to="/logout">
              <img src={Signed} onMouseOver={handleHover} onMouseLeave={handleHover}/><br />
              {isHovered && <p className="hoveredText">{firstname}</p>}               
            </Link>            
          </>
        )}
      </nav>
    </header>
  );
}
