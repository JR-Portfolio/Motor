import React, { useState, useEffect } from "react";

import { useAuth } from "./AppContentext";

import { useNavigate } from "react-router-dom";
import "../css/Login.css";
import bcrypt from "bcryptjs";
import Main from "./Main";
import { doc, collection, getDocs, updateDoc } from "firebase/firestore";
import { db } from "./Main";
import Header from "../Layouts/Header";
import Logout from "./Logout";

const Login = () => {
  const navigate = useNavigate();
  const { setSigned } = useAuth();

  const [loginFormData, setLoginFormData] = useState({
    username: "",
    password: "",
  });

  const [docId, setDocId] = useState(0);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);

  const userRef = collection(db, "Users");

  const getUsers = async () => {
    try {
      const querySnapshot = await getDocs(userRef);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        setUsers(doc.data());
        setDocId(doc.id);
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError("Failed to retrieve records, ", error);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  function credentials(loginFormData) {
    const saltRounds = 10;
    const { username, password } = loginFormData;
    let unameValidate = false;

    if (
      (username.includes(".com") || username.includes(".fi")) &&
      username.includes("@")
    ) {
      unameValidate = true;
      console.log("username is ", unameValidate);
    }

    const storedHash = localStorage.getItem("hash");

    bcrypt.compare(password, users.hash, function (err, result) {
      setSigned(result);

      if (result) {
        setLoggedIn(result);
        localStorage.setItem("loggedIn", true);
        localStorage.setItem("username", username);
        const updateUserRef = doc(db, "Users", docId);
        updateDoc(updateUserRef, {
          loggedIn: result,
        });
      }

      if (!result) {
        throw {
          message: "The password validation failed",
          statusText: "Invalid password",
          status: 403,
        };
      }
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    credentials(loginFormData);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div>
      {!loggedIn && (
        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="username"
            onChange={handleChange}
            type="email"
            placeholder="Email address"
            value={loginFormData.username}
          />
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Password"
            value={loginFormData.password}
          />
          <button>Log in</button>
        </form>
      )}
      {loggedIn && <Main />}
    </div>
  );
};

export default Login