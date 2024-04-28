import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../firebase";

//import { collection, addDoc } from "firebase/firestore";
import {
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";
import "../css/Login.css";
import bcrypt from "bcryptjs";

function AddUser() {
  const navigate = useNavigate();
  const [newUserData, setNewUserData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    //password: "",
  });
  const [error, setError] = useState(null);

  const addCredentials = async (newUserData) => {
    const saltRounds = 10;
    console.log(saltRounds);
    const username = newUserData.username;
    const password = newUserData.password;
    let unameValidate = false;

    if (
      (username?.includes(".com") || username?.includes(".fi")) &&
      username?.includes("@")
    ) {
      unameValidate = true;
    }

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err && unameValidate) {
        console.error(err);
        throw {
          message: "The password hash operation failed",
          statusText: "Invalid code",
          status: 500,
        };
      } else {
        console.log("Saving to the session storage ", hash);
        localStorage.setItem("hash", hash);
        localStorage.setItem("salt", saltRounds);
        localStorage.setItem("username", username);
        newUserData.hash = hash;
        delete newUserData.password;
        const userRef = addDoc(collection(db, "Users"), newUserData);
        if (!userRef) {
          throw {
            message: "Vituiks mäni eli käyttäjää ei lisätty kantaa",
            status: 400,
            statusText: "Bad Request",
          };
        }

        resetForm();
        navigate("/login");
      }
    });
  };

  function resetForm() {
    setNewUserData({ firstname: "", lastname: "", username: "", password: "" });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //addCredentials(newUserData);
    await createUserWithEmailAndPassword(
      auth,
      newUserData.username,
      newUserData.password
    )
      .then((userCredential) => {
        const user = userCredential.user;
        alert(`The new user ${newUserData.username} created`);
        console.log(user);
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setError(errorMessage);
      });
    resetForm();
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setNewUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  return (
    <div className="login-container">
      {!error && (
        <form onSubmit={handleSubmit} className="login-form">
          <input
            name="firstname"
            onChange={handleChange}
            type="text"
            placeholder="Etunimi"
            value={newUserData.firstname}
          />
          <br />
          <input
            name="lastname"
            onChange={handleChange}
            type="text"
            placeholder="Sukunimi"
            value={newUserData.lastname}
          />
          <br />
          <input
            name="username"
            onChange={handleChange}
            type="email"
            placeholder="Email address / username"
            value={newUserData.username}
          />
          <br />
          <input
            name="password"
            onChange={handleChange}
            type="password"
            placeholder="Salasana"
            value={newUserData.password}
          />
          <button>Lisää käyttäjä</button>
        </form>
      )}{" "}
      :{}
    </div>
  );
}

export default AddUser;
