// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDBoQqQkInbqwnU-J6z9Bgeu_qY1P9lQY",
  authDomain: "wedding-moments-ab947.firebaseapp.com",
  projectId: "wedding-moments-ab947",
  storageBucket: "wedding-moments-ab947.firebasestorage.app",
  messagingSenderId: "69910165054",
  appId: "1:69910165054:web:3a6f905bda398c82c2436f",
  measurementId: "G-Q2MXKXH22H",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebase = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const getFirebaseAuthError = (errorCode: string) => {
  return errorCode;
};
