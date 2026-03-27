// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAK6FiG5aH6TKDyQs-h2pNAYAFvB7zE6n0",
  authDomain: "myevent-1df4e.firebaseapp.com",
  projectId: "myevent-1df4e",
  storageBucket: "myevent-1df4e.firebasestorage.app",
  messagingSenderId: "399007999088",
  appId: "1:399007999088:web:16a4aa9c20df00981e80b5",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
