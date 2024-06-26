
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth"


const firebaseConfig = {
  apiKey: import.meta.env.VITE_JRLA_MOTO_API_KEY,
  authDomain: import.meta.env.VITE_JRLA_MOTO_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_JRLA_MOTO_PROJECT_ID,
  storageBucket: import.meta.env.VITE_JRLA_MOTO_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_JRLA_MOTO_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_JRLA_MOTO_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app)