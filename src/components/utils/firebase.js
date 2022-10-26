
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBnIQQzcWKxvbwJWe-R4KBN-I21tu2vR-8",
  authDomain: "letterbox-1bf8c.firebaseapp.com",
  projectId: "letterbox-1bf8c",
  storageBucket: "letterbox-1bf8c.appspot.com",
  messagingSenderId: "37389044640",
  appId: "1:37389044640:web:9ebc6a696a3fd966dc72c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;