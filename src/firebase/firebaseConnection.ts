
import { initializeApp } from "firebase/app";

import {
  getFirestore, 
  addDoc, 
  collection, 
  onSnapshot, 
  doc, 
  getDoc,
  query, 
  where, 
  orderBy,
 deleteDoc,
 getDocs
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: "tarefas-8293b.firebaseapp.com",
  projectId: "tarefas-8293b",
  storageBucket: "tarefas-8293b.firebasestorage.app",
  messagingSenderId: "817398233288",
  appId: "1:817398233288:web:236d944a1cefd9eccccdfd"
};
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export {
  db, 
  addDoc, 
  collection, 
  onSnapshot, 
  doc,
  query, 
  where,
  orderBy,
  deleteDoc,
  getDoc,
  getDocs
}