import React from 'react'
import { Link} from "react-router-dom";

export default function Header() {
  return (
    <header className="headerNavi">
      <Link className="site-logo" to="/">#JRLA</Link>
      <nav>   
        <Link to="/">Pääsivu</Link>
        <Link to="/addService">Lisää huolto</Link>
        <Link to="/readService">Huollot</Link>
        <Link to="/addTrip">Lisää matka</Link>                
      </nav>
    </header>
  );
}




