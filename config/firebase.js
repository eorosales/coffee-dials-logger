// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBs_PbikLv_hBt-fH9WQ14OdbKw3B5JoFg",
  authDomain: "coffee-dials-logger-57e5f.firebaseapp.com",
  projectId: "coffee-dials-logger-57e5f",
  storageBucket: "coffee-dials-logger-57e5f.appspot.com",
  messagingSenderId: "798297125034",
  appId: "1:798297125034:web:76028090ed07e9e11320d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
