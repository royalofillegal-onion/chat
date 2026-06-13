// firebase-config.js

import { initializeApp } from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
 getAuth
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
 getFirestore
} from
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDKR_oReh_lHle5wJutF_ydtdCPTvoCQUc",
  authDomain: "roimusic-auth.firebaseapp.com",
  projectId: "roimusic-auth",
  storageBucket: "roimusic-auth.firebasestorage.app",
  messagingSenderId: "1089504419003",
  appId: "1:1089504419003:web:c1641eed56bb12983a5d9e",
  measurementId: "G-0R3Z5EP79B"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
