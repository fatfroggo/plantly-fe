// Import the functions you need from the SDKs you need

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getAnalytics } from "firebase/analytics";
// import { Constants } from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBUW_q0N0xKx7Kyqr963H67eZ56TPQvMWk",
  authDomain: "plantforlife-1533c.firebaseapp.com",
  projectId: "plantforlife-1533c",
  storageBucket: "plantforlife-1533c.appspot.com",
  messagingSenderId: "112706276870",
  appId: "1:112706276870:web:f0bb9a8c9151d781447d87",
  measurementId: "G-47LW6K4FDD",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export { firebase };
