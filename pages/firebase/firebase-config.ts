import { initializeApp } from "@firebase/app";
// @ts-ignore
import { getDatabase, connectDatabaseEmulator } from "@firebase/database";
import { getFirestore, connectFirestoreEmulator } from "@firebase/firestore";
import { getStorage, connectStorageEmulator } from "@firebase/storage";
import { getFunctions, connectFunctionsEmulator } from "@firebase/functions";
import { getMoralisAuth } from "@moralisweb3/client-firebase-auth-utils";
import { getAuth, connectAuthEmulator } from "@firebase/auth";
import { doc, setDoc } from "firebase/firestore";
// Import the functions you need from the SDKs you need

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// todo: aman - use proper env variables

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCWNvV3rhAc_91dqzgbp6y5nuHZlcaWsn8",
  authDomain: "neoverse-classic.firebaseapp.com",
  databaseURL:
    "https://neoverse-classic-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "neoverse-classic",
  storageBucket: "neoverse-classic.appspot.com",
  messagingSenderId: "192866913449",
  appId: "1:192866913449:web:ea0bcc4e38ae44ee416db8",
  measurementId: "G-QG3SCZRXBT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let at = getAuth(app);
let rdb = getDatabase(app);
let db = getFirestore(app);
let st = getStorage(app);
let fn = getFunctions(app);
let ma = getMoralisAuth(app, { regionOrCustomDomain: "asia-south1" });

try {
  if (!process.env.NEXT_PUBLIC_DEBUG) {
    connectAuthEmulator(at, "http://localhost:9099");
    connectDatabaseEmulator(rdb, "localhost", 9000);
    connectFirestoreEmulator(db, "localhost", 8080);
    connectStorageEmulator(st, "localhost", 9199);
    connectFunctionsEmulator(fn, "localhost", 5001);
  }
} catch (error) {
  console.log(error);
}

export const database = db;
export const realTimeDatabase = rdb;
export const storage = st;
export const auth = at;
export const functions = fn;
export const moralisAuth = ma;
