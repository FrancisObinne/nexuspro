// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAa2G2VyYmPRdM_1DtDt74Qa3MYDwRV-kw",
  authDomain: "nexuspro-562d6.firebaseapp.com",
  projectId: "nexuspro-562d6",
  storageBucket: "nexuspro-562d6.firebasestorage.app",
  messagingSenderId: "797822462239",
  appId: "1:797822462239:web:e21b2316d310d53690682a",
  measurementId: "G-5JT6QGY831"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);