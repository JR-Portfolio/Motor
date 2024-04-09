import { Outlet, Link } from "react-router-dom";

function Services() {
  return (
    <>
      <nav className="host-nav">
        <Link to="addService">Lisää Huolto</Link>
        <Link to=".">Huollot</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Services;
