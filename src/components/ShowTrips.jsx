import { useState, useEffect } from "react";
import { collection, getDocs} from "firebase/firestore";
import { db } from "../firebase";

export const ShowTrips = () => {
  const [trips, setTrip] = useState([]);
  const [error, setError] = useState("");

  const getTrips = async () => {
    try {
      const tripsRef = collection(db, "matkat");
      const querySnapshot = await getDocs(tripsRef);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setTrip([...doc.data(), doc.data()]);
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
                    <td>Milloin: {t.when}</td>
                    <td>Mistä: {t.from}</td>
                    <td>Minne: {t.to}</td>                  
                    <td>Etapin pituus: {t.etappi}</td>                  
                    <td>Kustannukset: {t.kustannukset}</td>                  
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
