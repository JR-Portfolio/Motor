import React, { useState } from "react";
import { db, storage } from "./Main";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "../css/App.css";

function Upload() {
  const [imageUpload, setImageUpload] = useState(null);
  const uploadImage = () => {
    if (imageUpload === null) return;

    const fileRef = ref(storage, `Test/${imageUpload.name + v4()}`);
    uploadBytes(fileRef, imageUpload).then(() => {
      alert("Image uploaded");
      setImageUpload(null)
    });
  };

  return (
    <div className="uploader">
      <input
        type="file"
        onChange={(event) => setImageUpload(event.target.files[0])}
      />
      <button onClick={uploadImage}>Lataa kuva</button>
    </div>
  );
}

export default Upload;
