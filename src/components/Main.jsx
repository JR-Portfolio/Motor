import { useEffect, useState } from "react";
import "../css/App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  Timestamp,
} from "firebase/firestore";
import {db } from "../firebase";
import { v4 as uuidv4 } from "uuid";


//const motoCollection = collection(db, "ktm");

function Main() {
  const [moto, setMoto] = useState([]);
  const [error, setError] = useState("");

  const getKtmGen = async () => {
    const docRef = doc(db, "ktm", "1");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("docSnap: ", docSnap.data());
      setMoto(docSnap.data());
    } else {
      setError("Datan haku epäonnistui!");
    }
  };

  useEffect(() => {
    getKtmGen();
  }, []);

  return (
    <>
      {error ? <h3>{error}</h3> : ""}

      <>
        <h3 style={{ marginLeft: "15%" }}>KTM 1290 SUPERADVENTURE S</h3>

        <div key={moto.id}>
          <table style={{ textAlign: "left", marginLeft: "15%" }}>
            <tbody>
              <tr>
                <td>Merkki: {moto.make}</td>
              </tr>
              <tr>
                <td>Malli: {moto.model}</td>
              </tr>
              <tr>
                <td>Väri: {moto.color}</td>
              </tr>
              <tr>
                <td>Km: {moto.km}</td>
              </tr>
              <tr>
                <td>Vuosi: {moto.year}</td>
              </tr>
              <tr>
                <td>Edellinen huolto: 31-3-2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </>
    </>
  );
}

export default Main;
