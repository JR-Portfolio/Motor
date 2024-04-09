import { useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";
import Main from "./components/Main";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ServiceLayout from "./components/ServiceLayout";
import AddService from "./components/Add";
import { ReadService } from "./components/Read";
import AddTrip from "./components/AddTrip";
import TripLayout from "./components/TripsLayout";
import ShowTrips from "./components/ShowTrips";

import { nanoid } from "nanoid";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main key={nanoid()} />} />

          <Route path="services" element={<ServiceLayout key={nanoid} />}>
            <Route index element={<ReadService key={nanoid()} />} />
            <Route path="addService" element={<AddService key={nanoid()} />} />
          </Route>

          <Route path="trips" element={<TripLayout key={nanoid} />}>
            <Route index element={<ShowTrips key={nanoid()} />} />
            <Route path="addTrip" element={<AddTrip key={nanoid()} />} />
          </Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
