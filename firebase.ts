import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBIDeBB_GzrXk4kMrkhKozsMzRMdjtwcQc",
  authDomain: "cross-talk-app.firebaseapp.com",
  projectId: "cross-talk-app",
  storageBucket: "cross-talk-app.appspot.com",
  messagingSenderId: "221789914354",
  appId: "1:221789914354:web:627011d701c075d6fa3c6b",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };
