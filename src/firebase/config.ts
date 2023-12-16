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

    // test firebase 2
  // apiKey: "AIzaSyCaWanxgNsa8OdwAM35-hA5O4hNb1CpaTo",
  // authDomain: "rs-sisfor.firebaseapp.com",
  // projectId: "rs-sisfor",
  // storageBucket: "rs-sisfor.appspot.com",
  // messagingSenderId: "1021696540932",
  // appId: "1:1021696540932:web:dcb9249f5fac854d711051"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
