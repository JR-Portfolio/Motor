import React, { useEffect, useState, createContext, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase"
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [signer, setSigner] = useState();
  const [firstname, setFirstName] = useState();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setSigned(true)
      }
    });
  }, []);


  useEffect(() => {    
    setSigner(localStorage.getItem("username"));
    setFirstName(localStorage.getItem("firstname"));
  }, []);

  console.log("Signer in AuthContext: ", signer);

  return (
    <AuthContext.Provider
      value={{ signer, signed, setSigned, setSigner, firstname, setFirstName }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
