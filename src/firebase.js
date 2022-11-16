// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAeQyD_EzlDuPV4ThMlrnSfCMh1TbMQKlA",
  authDomain: "chat-14bec.firebaseapp.com",
  projectId: "chat-14bec",
  storageBucket: "chat-14bec.appspot.com",
  messagingSenderId: "1060608821681",
  appId: "1:1060608821681:web:3850126baf1e5f7e0b9590",
  measurementId: "G-YZDPBV5D32"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth=getAuth();
export const storage=getStorage();
export const db= getFirestore();