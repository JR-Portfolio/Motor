import React, { useState } from "react";
import { Link } from "react-router-dom";
import ImageLogin from "/avatar-icon.png";
import ImageLogout from "/logout.png";
import Upload from "/upload.png";
import Home from "/Home.png";
import Travel from "/travel.png"
import Service from "/service.png"
import AddUser from "/addUser.png";
import Signed from "/signed.png";
import { useAuth } from "../components/AppContentext";
import "../css/App.css";

export default function Header() {
  const { signer, signed, setSigned, setSigner, firstname } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

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
            <Link to="/"><img src={Home} /></Link>
            <Link to="/services"><img src={Service} /></Link>
            <Link to="/trips"><img src = {Travel} /></Link>
            <Link to="/galleria">
              <img src={Upload} width="48" height="48" />
            </Link>
            <Link to="/addUser">
              <img src={AddUser} />
            </Link>
            <Link to="/logout">
              <img
                src={Signed}
                onMouseOver={handleHover}
                onMouseLeave={handleHover}
              />
              <br />
              {isHovered && <p className="hoveredText">{firstname}</p>}
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
