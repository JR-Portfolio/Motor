import { useState, useEffect } from "react";

import {
  collection,
  getDocs,
} from "firebase/firestore";;

import {
  ref,
  onValue,
} from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

import { db } from "../firebase";

const ReadService = (props) => {
  const [service, setService] = useState([]);
  const [error, setError] = useState("");

  const getServices = async () => {
    try {
      const huoltoRef = collection(db, "huolto");
      const querySnapshot = await getDocs(huoltoRef);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setService(doc.data());
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error)
    }
  };

  useEffect(() => {
    getServices();
  }, []);

  return (
    <>
      {error && <h3>{error}</h3>}
      <>
        <div>
          <table style={{ textAlign: "left", marginLeft: "12%" }}>
            {service.length === 1 ? (
              service.map((s) => (
                <tbody key={s.id}>
                  <tr>
                    <td>Huolto: {s.huolto}</td>
                  </tr>
                  <tr>
                    <td>Km: {s.km}</td>
                  </tr>

                  <tr>
                    <td>Huoltopaikka: {s.huoltopaikka}</td>
                  </tr>
                  <tr>
                    <td>Kustannukset: {s.kustannukset}</td>
                  </tr>
                  <tr>
                    <td>Maksettu: {s.maksettu}</td>
                  </tr>
                  <tr>
                    <td>Huolto pvm: {s.pvm}</td>
                  </tr>
                  <tr>
                    <td>Huolto pvm: {s.huoltaja}</td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody key={2}>
                <tr>
                  <td>Huolto: {service.huolto}</td>
                </tr>
                <tr>
                  <td>Km: {service.km}</td>
                </tr>
                <tr>
                  <td>Huoltopaikka: {service.huoltopaikka}</td>
                </tr>
                <tr>
                  <td>Kustannukset: {service.kustannukset}</td>
                </tr>
                <tr>
                  <td>Maksettu: {service.maksettu}</td>
                </tr>
                <tr>
                  <td>Huolto pvm: {service.pvm}</td>
                </tr>
                <tr>
                  <td>Huolto pvm: {service.huoltaja}</td>
                </tr>
              </tbody>
            )}
          </table>
        </div>
      </>
    </>
  );
};

export default ReadService;
