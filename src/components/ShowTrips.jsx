import { useState, useEffect } from "react";
//import { collection, getDocs } from "firebase/firestore";
import { collection, getDocs} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
//import { ref, onValue } from "firebase/database";
//import firebaseConfig from "../../db";
import { db } from "./Main";

export const ShowTrips = () => {
  const [trips, setTrip] = useState([]);
  const [error, setError] = useState("");

  const getTrips = async () => {
    try {
      const tripsRef = collection(db, "matkat");
      const querySnapshot = await getDocs(tripsRef);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setTrip(doc.data());
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Failed to retrieve service records, ", error);
    }
  };

  useEffect(() => {
    getTrips();
  }, []);

  return (
    <>
      {error && <h3>{error}</h3>}
      <>
        <div>
          <table style={{ textAlign: "left", marginLeft: "0%", fontSize: "8px" }}>
            {trips.length === 1 ? (
              trips.map((t) => (
                <tbody key={t.id}>
                  <tr>
                    <td>Kuvaus: {t.kuvaus}</td>
                  </tr>
                  <tr>
                    <td>Milloin: {t.when}</td>
                  </tr>
                  <tr>
                    <td>Mistä: {t.from}</td>
                  </tr>

                  <tr>
                    <td>Minne: {t.to}</td>
                  </tr>
                  <tr>
                    <td>Etapin pituus: {t.etappi}</td>
                  </tr>
                  <tr>
                    <td>Kustannukset: {t.kustannukset}</td>
                  </tr>
                  <tr>
                    <td>Matkaajat: {t.matkaajat}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody key={2}>
                <tr>
                  <td>{trips.id}</td>
                  <td>Kuvaus: {trips.kuvaus}</td>
                  <td>Milloin: {trips.when}</td>
                  <td>Mistä: {trips.from}</td>
                  <td>Minne: {trips.to}</td>
                  <td>Etapin pituus: {trips.etappi}</td>
                  <td>Kustannukset: {trips.kustannukset}</td>
                  <td>Matkaajat: {trips.matkaajat}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </>
    </>
  );
};
