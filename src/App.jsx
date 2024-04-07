import { useEffect, useState } from "react";
import viteLogo from "/vite.svg";
import "./App.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import firebaseConfig from "../db";
import AddService from "./components/Add";
import {ReadService} from "./components/Read";
import { v4 as uuidv4 } from 'uuid';



// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//const userRef = collection(db, "users");
const motoCollection = collection(db, "ktm");


function App() {
  const [moto, setMoto] = useState([]);
  const [addService, setAddService] = useState(false);
  const [readService, setReadService] = useState(false);
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

  const add = () => {
    setAddService(true);
  };
  const read = () => {
    readService ? setReadService(false) : setReadService(true)
  }

  return (
    <>
      {error ? <h3>{error}</h3> : ""}
      {!addService && !readService && (
        <>
          <div>
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </div>
          <h1>Moto Rekisteri</h1>

          <div key={moto.id}>
            <table style={{ textAlign: "left", marginLeft: "20%" }}>
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
      )}

      {addService && <AddService database={db} application={app} />}
      {readService && <ReadService database={db} application={app} />}
      <Stack
        spacing={2}
        direction="row"
        style={{ paddingTop: "20px", textAlign: "left", marginLeft: "20%" }}
      >
        {!addService && (
          <Button variant="text" onClick={() => add()}>
            Lisää Huolto
          </Button>
        )}
        {!readService && <Button variant="text" onClick = {() => read() }>Huollot</Button>}
        {addService && (
          <Button variant="text" onClick={() => window.location.reload()}>
            Pääsivu
          </Button>
        )}
      </Stack>
    </>
  );
}

export {db}
export default App;
