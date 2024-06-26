import { Outlet, Link } from "react-router-dom";

function Trips() {
  return (
    <>
      <nav className="host-nav">
        <Link to="addTrip">Lisää matka</Link>
        <Link to="showTrips">Matkat</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Trips;
