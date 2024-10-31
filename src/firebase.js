// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA03ZLN3IYe81xHKHr8Y4DNaZtdTB8Bh_U",
  authDomain: "task9-2e2bb.firebaseapp.com",
  projectId: "task9-2e2bb",
  storageBucket: "task9-2e2bb.appspot.com",
  messagingSenderId: "326891575145",
  appId: "1:326891575145:web:f0e9f0fc6cd070bd0fcff8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut };