import { Link } from "react-router-dom";
import ImageLogin from "/avatar-icon.png";
import ImageLogout from "/logout.png";
import AddUser from "/addUser.png";
import { useAuth } from "../components/AppContentext";

export default function Header() {
  const { signed } = useAuth();
  console.log("isAuthenticated: ", signed);
  //let isLoggedIn = localStorage.getItem("isLoggedIn"); //Fetch from the db

  return (
    <header className="headerNavi">
      <Link className="site-logo" to="/">
        #JRLA
      </Link>
      <nav>
        <Link to="/">Pääsivu</Link>
        {!signed && (
          <Link to="/login">
            <img src={ImageLogin} width="40" height="40" />
          </Link>
        )}
        <Link to="/addUser">
          <img src={AddUser} />
        </Link>

        {signed && (
          <>
            <Link to="/logout">
              <img src={ImageLogout} width="40" height="40" />
            </Link>

            <Link to="/services">Huollot</Link>
            <Link to="/trips">Matkat</Link>
          </>
        )}
      </nav>
    </header>
  );
}
