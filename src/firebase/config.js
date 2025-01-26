// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhJ7DgPgbjFdgHGEUBRno3cmlmAHn5lBE",
  authDomain: "react-jornal-ddfc4.firebaseapp.com",
  projectId: "react-jornal-ddfc4",
  storageBucket: "react-jornal-ddfc4.firebasestorage.app",
  messagingSenderId: "798937327430",
  appId: "1:798937327430:web:af833c8108c2a70a8e2747"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth( FirebaseApp );
export const FirebaseDB = getFirestore( FirebaseApp );
