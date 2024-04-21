import { useState } from "react";

//import { ref, uploadBytes } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js"
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import "../css/App.css";
import { storage } from "../firebase";

function Upload() {
  const [imageUpload, setImageUpload] = useState(null);
  const [folder, setFolder] = useState(null);

  const uploadImage = () => {
    if (imageUpload === null) return;
    console.log("folder: ", folder + ", image: " + imageUpload.name);

    const fileRef = ref(storage, `${folder}/${imageUpload.name + v4()}`);
    uploadBytes(fileRef, imageUpload).then(() => {
      alert("Kuva ladattu");
      console.log("image after upload...: ", imageUpload.name);
      setImageUpload(null);
    });
    console.log("imageUpload: ", imageUpload);
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
