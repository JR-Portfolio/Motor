import { useEffect, useState } from "react";

import AddService from "./components/Add";
import { ReadService } from "./components/Read";
import AddTrip from "./components/Trips";
import { v4 as uuidv4 } from "uuid";
import Main from "./components/Main";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { nanoid } from "nanoid";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Main key={nanoid()} />} />
          <Route path="/addService" element={<AddService key={nanoid()} />} />
          <Route path="/readService" element={<ReadService key={nanoid()} />} />
          <Route path="/addTrip" element={<AddTrip key={nanoid()} />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
