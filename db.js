
const firebaseConfig = {
  apiKey: import.meta.env.VITE_JRLA_MOTO_API_KEY,
  authDomain: import.meta.env.VITE_JRLA_MOTO_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_JRLA_MOTO_PROJECT_ID,
  storageBucket: import.meta.env.VITE_JRLA_MOTO_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_JRLA_MOTO_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_JRLA_MOTO_APP_ID,
};

export default firebaseConfig;
