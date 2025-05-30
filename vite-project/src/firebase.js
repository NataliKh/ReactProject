import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBythYEyMsGCsM63uEtxNjYD4SpH6InZyY",
  authDomain: "todos-9b83b.firebaseapp.com",
  projectId: "todos-9b83b",
  storageBucket: "todos-9b83b.firebasestorage.app",
  messagingSenderId: "181294409953",
  appId: "1:181294409953:web:f773de8bb647fdaf5d6fa0",
  databaseURL:"https://todos-9b83b-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);