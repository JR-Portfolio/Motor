import React, {useEffect} from "react"
import Main from "./components/Main";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";
import ErrorPage from "./components/ErrorPage.jsx";

import ServiceLayout from "./Layouts/ServiceLayout";
import AddService from "./components/AddService";
import ReadService from "./components/ReadService";

import TripLayout from "./Layouts/TripsLayout";
import AddTrip from "./components/AddTrip";
import { ShowTrips } from "./components/ShowTrips";

import { nanoid } from "nanoid";
import Login from "./components/Login";
import Logout from "./components/Logout";
import AddUser from "./components/AddUser.jsx";
import AuthRequired from "./Layouts/AuthRequired";
import { AuthProvider } from "./components/AppContentext.jsx";

function App() {
 
  const resizeWindow = async () => {
    // Set the desired width and height for the window
    const desiredWidth = 400;
    const desiredHeight = 500;

    // Resize the window
    window.resizeTo(desiredWidth, desiredHeight);
  }

  useEffect(() => {
    resizeWindow()
    }, [])


  return (
    <HashRouter>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login key={nanoid()} />} />
            <Route path="/logout" element={<Logout key={nanoid()} />} />
            <Route element={<AuthRequired />}></Route>
            <Route path="/" element={<Main key={nanoid()} />} />

            <Route path="services" element={<ServiceLayout key={nanoid} />}>
              <Route index element={<ReadService key={nanoid()} />} />
              <Route
                path="readService"
                element={<ReadService key={nanoid()} />}
              />
              <Route
                path="addService"
                element={<AddService key={nanoid()} />}
              />
            </Route>

            <Route path="addUser" element={<AddUser key={nanoid()} />} />

            <Route path="trips" element={<TripLayout key={nanoid} />}>
              <Route index element={<ShowTrips key={nanoid()} />} />
              <Route path="showTrips" element={<ShowTrips key={nanoid()} />} />
              <Route path="addTrip" element={<AddTrip key={nanoid()} />} />
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;
