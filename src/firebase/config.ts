import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  // apiKey: "AIzaSyA_POmCg1VlAw1X8Bfmf2ZM_mzP3CTjZAE",
  // authDomain: "rs-florest-sisfor.firebaseapp.com",
  // projectId: "rs-florest-sisfor",
  // storageBucket: "rs-florest-sisfor.appspot.com",
  // messagingSenderId: "936982607524",
  // appId: "1:936982607524:web:55043893f2b6e384e35831",

  // test firebase
  // apiKey: "AIzaSyCvEL6g6f4CjI6Nc_jTagrSnqm8CJDLivk",
  // authDomain: "rs-florest.firebaseapp.com",
  // projectId: "rs-florest",
  // storageBucket: "rs-florest.appspot.com",
  // messagingSenderId: "390116881289",
  // appId: "1:390116881289:web:c2ad820e409e144d002758",
  // measurementId: "G-QQFDBYGKRT"

  // test firebase 2
  // apiKey: "AIzaSyCaWanxgNsa8OdwAM35-hA5O4hNb1CpaTo",
  // authDomain: "rs-sisfor.firebaseapp.com",
  // projectId: "rs-sisfor",
  // storageBucket: "rs-sisfor.appspot.com",
  // messagingSenderId: "1021696540932",
  // appId: "1:1021696540932:web:dcb9249f5fac854d711051"

  // test firebase 3
  // apiKey: "AIzaSyDIbI86K5XW445d4zWCszSuGyApfzvnTEs",
  // authDomain: "rspelorest.firebaseapp.com",
  // projectId: "rspelorest",
  // storageBucket: "rspelorest.appspot.com",
  // messagingSenderId: "327341936044",
  // appId: "1:327341936044:web:f4571cf8badaeffe907e09",

  // test firebase 4
  apiKey: "AIzaSyD7E9yI7KyCo_-mtPPoZtN_nUp0Kv5UG0U",
  authDomain: "rsfloresta-654e7.firebaseapp.com",
  projectId: "rsfloresta-654e7",
  storageBucket: "rsfloresta-654e7.appspot.com",
  messagingSenderId: "419550967922",
  appId: "1:419550967922:web:4cda6787bd0e6960f62aeb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
