import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA_POmCg1VlAw1X8Bfmf2ZM_mzP3CTjZAE",
  authDomain: "rs-florest-sisfor.firebaseapp.com",
  projectId: "rs-florest-sisfor",
  storageBucket: "rs-florest-sisfor.appspot.com",
  messagingSenderId: "936982607524",
  appId: "1:936982607524:web:55043893f2b6e384e35831",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
