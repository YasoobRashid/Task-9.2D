import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCI8Ctg6B4raicrI5dtbIpDsxr4Zje3XwE",
  authDomain: "task8-379e3.firebaseapp.com",
  projectId: "task8-379e3",
  storageBucket: "task8-379e3.appspot.com",
  messagingSenderId: "626094284650",
  appId: "1:626094284650:web:aa18e12c488512fb2a4f13",
  measurementId: "G-4KGQLR2S7X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth, signOut };
