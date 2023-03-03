// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCrwO2ev_WgvLKIuWVpmFeU4mVz0kPhUDc",
  authDomain: "drawdb-e1d21.firebaseapp.com",
  projectId: "drawdb-e1d21",
  storageBucket: "drawdb-e1d21.appspot.com",
  messagingSenderId: "269352284895",
  appId: "1:269352284895:web:144b45d0c4f2136670af6a",
  measurementId: "G-6TGSXL2PGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
const analytics = getAnalytics(app);


export const dbCollections = {
  users: "users"
}