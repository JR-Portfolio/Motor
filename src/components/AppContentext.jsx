import React, { useEffect, useState, createContext, useContext } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [signed, setSigned] = useState(false);
  const [signer, setSigner] = useState();
  const [firstname, setFirstName] = useState();

  useEffect(() => {
    setSigned(localStorage.getItem("loggedIn") === "true");
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
