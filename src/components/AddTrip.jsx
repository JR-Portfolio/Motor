import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Box,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

//import { doc, set, setDoc } from "firebase/firestore";
import { db } from "./Main";
import { collection, addDoc } from "firebase/firestore";

export default function AddTrip(props) {
  const { application } = props;
  const [data, setData] = useState({});

  const handleChange = (event) => {
    const { id, value } = event.target;
    setData({ ...data, [id]: value });
  };

  //https://firebase.google.com/docs/firestore/quickstart
  const saveTrips = async () => {
    console.log("data: ", data);
    try {
      const tripRef = await addDoc(collection(db, "matkat"), data);
      console.log("document written with id: ", tripRef.id);
    } catch (e) {
      console.error("Error adding document ", e);
    }
  };

  return (
    <div className="inputForm">

      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { mb: -5, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          style={{ width: "200px", margin: "5px", mt: "-5" }}
          id="when"
          type="date"
          label="PVM"
          variant="outlined"
          onChange={handleChange}
        />
        <br />

        <TextField
          style={{ width: "200px", margin: "5px" }}
          id="matkaajat"
          type="text"
          label="Matkaajat"
          variant="outlined"
          onChange={handleChange}
        />

        <br></br>
        <TextField
          style={{ width: "200px", margin: "5px", mt: "-5" }}
          id="from"
          type="text"
          label="Mistä:"
          variant="outlined"
          onChange={handleChange}
        />

        <br></br>

        <TextField
          style={{ width: "200px", margin: "5px" }}
          id="to"
          type="text"
          label="Minne:"
          variant="outlined"
          onChange={handleChange}
        />
        <br />
        <TextField
          style={{ width: "200px", margin: "5px" }}
          id="etappi"
          type="number"
          label="Stintin pituus:"
          variant="outlined"
          onChange={handleChange}
        />
        <br />

        <TextField
          style={{ width: "200px", margin: "5px", mt: "-5" }}
          id="kustannukset"
          type="number"
          label="Kustannukset:"
          variant="outlined"
          onChange={handleChange}
          row="5"
        />

        <br />
        <TextField
          style={{ width: "300px", margin: "5px" }}
          id="kuvaus"
          type="text"
          label="Kuvaus:"
          variant="outlined"
          multiline
          rows={5}
          onChange={handleChange}
        />
        <br />
        <Button variant="contained" color="primary" onClick={() => saveTrips()}>
          TALLETA
        </Button>
      </Box>
    </div>
  );
}
