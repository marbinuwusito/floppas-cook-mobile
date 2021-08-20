import firebase from "firebase";

// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyB6y6YYDhhgLxM5KfL7M1SLmhAFmvmbmJs",
  authDomain: "floppa-test-1.firebaseapp.com",
  projectId: "floppa-test-1",
  storageBucket: "floppa-test-1.appspot.com",
  messagingSenderId: "136609825225",
  appId: "1:136609825225:web:fec4737e8fb3b907b32818",
};

// Initialize Firebase

const fb = firebase.initializeApp(firebaseConfig);

export default fb;
