import React, { useEffect, useState, createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [signer, setSigner] = useState("")

  let signedOne = ""

  useEffect(() => {
    setSigned(localStorage.getItem("loggedIn") === "true")
    setSigner(localStorage.getItem("username"))
  }, [])
  
  
  return (
    <AuthContext.Provider value={{ signed, setSigned }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};


export {AuthProvider, useAuth}

