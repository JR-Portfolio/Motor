import React, { useState } from "react";
import { db, storage } from "./Main";
//import { ref, uploadBytes } from "firebase/storage";
import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { v4 } from "uuid";
import "../css/App.css";

function Upload() {
  const [imageUpload, setImageUpload] = useState(null);
  const [folder, setFolder] = useState(null);
  const uploadImage = () => {
    if (imageUpload === null) return;

    const fileRef = ref(storage, `${folder}/${imageUpload.name + v4()}`);
    uploadBytes(fileRef, imageUpload).then(() => {
      alert("Image uploaded");
      setImageUpload(null);
    });
  };

  return (
    <div className="uploader">
      <input
        type="file"
        onChange={(event) => setImageUpload(event.target.files[0])}
      />
      <input
        required
        type="text"
        onChange={(event) => setFolder(event.target.value)}
        placeholder="Kansio mihin ladataan"
      />

      <button
        style={{ marginTop: "10px", backgroundColor: "gray" }}
        onClick={uploadImage}
      >
        Lataa kuva
      </button>
    </div>
  );
}

export default Upload;
