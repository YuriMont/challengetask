import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArVkkLzHZFp2Ek7jXyju7yHclQMfCHVAE",
  authDomain: "tarefas-b06a9.firebaseapp.com",
  projectId: "tarefas-b06a9",
  storageBucket: "tarefas-b06a9.appspot.com",
  messagingSenderId: "51692091328",
  appId: "1:51692091328:web:cc1bc1c85887bc62e6fa25",
  measurementId: "G-LHRE857C3B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
