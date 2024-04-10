import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
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
          <table style={{ textAlign: "left", marginLeft: "12%" }}>
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
                  <td>Kuvaus: {trips.kuvaus}</td>
                </tr>
                <tr>
                  <td>Milloin: {trips.when}</td>
                </tr>
                <tr>
                  <td>Mistä: {trips.from}</td>
                </tr>

                <tr>
                  <td>Minne: {trips.to}</td>
                </tr>
                <tr>
                  <td>Etapin pituus: {trips.etappi}</td>
                </tr>
                <tr>
                  <td>Kustannukset: {trips.kustannukset}</td>
                </tr>
                <tr>
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
