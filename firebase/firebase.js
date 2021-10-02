// Import the functions you need from the SDKs you need

import firebase from "firebase";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAiOlI1EUvBI6QjUIeebpThrG-jcKXJxmA",
  authDomain: "floppa-expo.firebaseapp.com",
  projectId: "floppa-expo",
  storageBucket: "floppa-expo.appspot.com",
  messagingSenderId: "854917775797",
  appId: "1:854917775797:web:d239882dc32b6369b299fc"
};

// Initialize Firebase

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp
