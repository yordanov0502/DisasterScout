import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const FIREBASE_API_KEY = `${import.meta.env.VITE_FIREBASE_API_KEY}`;
const FIREBASE_AUTH_DOMAIN = `${import.meta.env.VITE_FIREBASE_AUTH_DOMAIN}`;  
const FIREBASE_PROJECT_ID = `${import.meta.env.VITE_FIREBASE_PROJECT_ID}`;  
const FIREBASE_STORAGE_BUCKET = `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}`;  
const FIREBASE_MESSAGING_SENDER_ID = `${import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID}`; 
const FIREBASE_APP_ID = `${import.meta.env.VITE_FIREBASE_APP_ID}`; 


const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig); // Initialize Firebase
export const storage = getStorage(app);