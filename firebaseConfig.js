import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
    getFirestore, collection, addDoc, setDoc, doc, query, where, getDocs, getDoc,
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyCo-x2X5psB5Lo0PRVLmeH2lD5sHF9XhlA",
  authDomain: "fir-auth-75c2b.firebaseapp.com",
  projectId: "fir-auth-75c2b",
  storageBucket: "fir-auth-75c2b.appspot.com",
  messagingSenderId: "536264298898",
  appId: "1:536264298898:web:09860a09338f0c3014b14b"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {
    auth,
    app,
    db,
    getFirestore,
    collection,
    addDoc,
    setDoc,
    doc,
    getDoc,
    getAuth,
    createUserWithEmailAndPassword,
    query,
    where,
    getDocs,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
};