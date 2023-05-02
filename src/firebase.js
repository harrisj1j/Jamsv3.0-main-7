// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore, collection} from "@firebase/firestore"
import { getStorage } from "firebase/storage";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBKLRLY10ItTUONjTPn1gcsjjVLtHMJ0Jc",
  authDomain: "jams-auth.firebaseapp.com",
  projectId: "jams-auth",
  storageBucket: "jams-auth.appspot.com",
  messagingSenderId: "602490835973",
  appId: "1:602490835973:web:ab5758eeecf76f45ce386c",
  measurementId: "G-Q7SZSEQWHQ"

};



// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app);
export const usersCollectionRef = collection(db,'users');
export const addDoc = firebase.firestore.addDoc;
export const createUserWithEmailAndPassword = auth.createUserWithEmailAndPassword;

