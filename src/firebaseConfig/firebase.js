import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore"; // Import getFirestore from firebase/firestore

const firebaseConfig = {
  apiKey: "AIzaSyBSnpJ-cWj0PDFSJdfzNrTKEEUVEuHlVl8",
  authDomain: "auth-auditzy.firebaseapp.com",
  projectId: "auth-auditzy",
  storageBucket: "auth-auditzy.appspot.com",
  messagingSenderId: "844767059298",
  appId: "1:844767059298:web:3768bd8c20b6768cde203b",
  databaseURL: "https://auth-auditzy-default-rtdb.firebaseio.com/",
  // apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  // authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  // projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  // storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  // messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  // appId: process.env.REACT_APP_FIREBASE_APP_ID,
  // databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getDatabase(app);
export const firestore = getFirestore(app);
