import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBk_T8RnoS5AgDv2zJjNtL1OkNw7Jl4BYU",
  authDomain: "galeria-b2792.firebaseapp.com",
  projectId: "galeria-b2792",
  storageBucket: "galeria-b2792.appspot.com",
  messagingSenderId: "574084278324",
  appId: "1:574084278324:web:6a8921b1450946d437c261",
};

const firebaseApp = initializeApp(firebaseConfig);

export const store = getStorage(firebaseApp);
