import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAcUAuCiDn1Lp3tQEaFewMIgHmQ9CdZi0E",
  authDomain: "pinia-tasks-2b2da.firebaseapp.com",
  projectId: "pinia-tasks-2b2da",
  storageBucket: "pinia-tasks-2b2da.appspot.com",
  messagingSenderId: "474366281228",
  appId: "1:474366281228:web:c0804a2a755fa9749ad029",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
