// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAVZXkfTvsy0xkCgwfVj-AqKKZxc1-clw",
  authDomain: "bdaplicacion-fdcaf.firebaseapp.com",
  projectId: "bdaplicacion-fdcaf",
  storageBucket: "bdaplicacion-fdcaf.appspot.com",
  messagingSenderId: "744204490156",
  appId: "1:744204490156:web:8fe0bfcc717a6f4e889609"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };