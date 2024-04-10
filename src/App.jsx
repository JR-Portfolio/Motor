import Main from "./components/Main";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./Layouts/Layout";

import ServiceLayout from "./Layouts/ServiceLayout";
import AddService from "./components/AddService";
import ReadService from "./components/ReadService";

import TripLayout from "./Layouts/TripsLayout";
import AddTrip from "./components/AddTrip";
import {ShowTrips} from "./components/ShowTrips";

import { nanoid } from "nanoid";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main key={nanoid()} />} />

          <Route path="services" element={<ServiceLayout key={nanoid} />}>
            <Route index element={<ReadService key={nanoid()} />} />
            <Route path="readService" element={<ReadService key={nanoid()} />} />
            <Route path="addService" element={<AddService key={nanoid()} />} />
          </Route>

          <Route path="trips" element={<TripLayout key={nanoid} />}>
            <Route index element={<ShowTrips key={nanoid()} />} />
            <Route path="showTrips" element={<ShowTrips key={nanoid()} />} />
            <Route path="addTrip" element={<AddTrip key={nanoid()} />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
