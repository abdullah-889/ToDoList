// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOUbc0xonCgSHDLByLrnu7b9amUGrZ3pM",
  authDomain: "to-do-list-6014e.firebaseapp.com",
  projectId: "to-do-list-6014e",
  storageBucket: "to-do-list-6014e.appspot.com",
  messagingSenderId: "453502699478",
  appId: "1:453502699478:web:8f6375f392dcc2bf92c677",
  measurementId: "G-BEEQ8RG2T4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
