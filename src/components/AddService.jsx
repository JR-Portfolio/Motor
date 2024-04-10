import { useState } from "react";
import {
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

import "../App.css"
//import { doc, set, setDoc } from "firebase/firestore";
import { db } from "./Main";
import { collection, addDoc } from "firebase/firestore";

export default function AddService() {
  const [data, setData] = useState({});

  const handleChange = (event) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  //https://firebase.google.com/docs/firestore/quickstart
  const saveService = async () => {
    console.log("data: ", data)
    try {
      const huoltoRef = await addDoc(collection(db, "huolto"), data);
      console.log("document written with id: ", huoltoRef.id);
    } catch (e) {
      console.error("Error adding document ", e);
    }
  };

  return (
    <div className="inputForm">
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mt: -5, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          style={{ width: "200px", margin: "5px", mt: "-5" }}
          id="km"
          type="number"
          label="km"
          variant="outlined"
          onChange={handleChange}
        />
        <br></br>
        <TextField
          style={{ width: "200px", margin: "5px" }}
          id="pvm"
          type="date"
          label="pvm"
          variant="outlined"
          onChange={handleChange}
        />
        <br />
      <TextField
          style={{ width: "200px", margin: "5px", mt: "-5" }}
          id="kustannukset"
          type="number"
          label="Kustannukset"
          variant="outlined"
          onChange={handleChange}
          />
      
        <br></br>
        <TextField
          style={{ width: "300px", margin: "5px" }}
          id="huoltaja"
          type="text"
          label="Huoltaja/Huoltofirma"
          variant="outlined"
          onChange={handleChange}
        />
        <br />
        <TextField
          style={{ width: "300px", margin: "5px" }}
          id="huoltopaikka"
          type="text"
          label="Huoltopaikka"
          variant="outlined"
          onChange={handleChange}
        />
        <br />
        <TextField
          style={{ width: "300px", margin: "5px" }}
          id="tilaus"
          type="text"
          label="Osien tilauspaikka"
          variant="outlined"
          onChange={handleChange}
        />
        <br />
        <FormControlLabel
          style={{ width: "200px", margin: "5px" }}
          control={<Checkbox id = "maksettu"/>}
          label="Maksettu"
          onChange={handleChange}
        />
        <br />
        <TextField
          style={{ width: "300px", margin: "5px" }}
          id="huolto"
          type="text"
          label="Huolto"
          variant="outlined"
          multiline
          rows={10}
          onChange={handleChange}
        />
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => saveService()}
        >
          TALLETA
        </Button>
      </Box>
    </div>
  );
}
