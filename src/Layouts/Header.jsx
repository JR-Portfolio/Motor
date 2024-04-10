import { Link} from "react-router-dom";

export default function Header() {
  return (
    <header className="headerNavi">
      <Link className="site-logo" to="/">#JRLA</Link>
      <nav>   
        <Link to="/">Pääsivu</Link>
        <Link to="/services">Huollot</Link>
        <Link to="/trips">Matkat</Link>
      </nav>
    </header>
  );
}




