// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database';
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8LY4FW6IZBUbxOPt9CSyDiLoJbqC-48M",
  authDomain: "kinopoisk-ff4bc.firebaseapp.com",
  databaseURL: "https://kinopoisk-ff4bc-default-rtdb.firebaseio.com",
  projectId: "kinopoisk-ff4bc",
  storageBucket: "kinopoisk-ff4bc.appspot.com",
  messagingSenderId: "150205344269",
  appId: "1:150205344269:web:3da0189a763c063904c344"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service

export const db = getDatabase(app); 
export const auth = getAuth();