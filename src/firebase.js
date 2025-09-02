// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDhrEtq07dHT6SgCzsQYU-_ZmmM8f6X9q0",
  authDomain: "koleje-d4eab.firebaseapp.com",
  projectId: "koleje-d4eab",
  storageBucket: "koleje-d4eab.firebasestorage.app",
  messagingSenderId: "309355263671",
  appId: "1:309355263671:web:3639a9bf51fa8d49e1ff32"
};

// Inicializace Firebase
const app = initializeApp(firebaseConfig);

// Export Firestore a Storage
export const db = getFirestore(app);

// Export Auth
export const auth = getAuth();
export { signInWithEmailAndPassword, onAuthStateChanged, signOut };