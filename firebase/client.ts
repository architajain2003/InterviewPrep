// Import the functions you need from the SDKs you need
import { initializeApp,getApp,getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";     
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB7wp666gJGi86FF1Z3V2BfavhnDlGLHn4",
  authDomain: "prepwise-c70eb.firebaseapp.com",
  projectId: "prepwise-c70eb",
  storageBucket: "prepwise-c70eb.firebasestorage.app",
  messagingSenderId: "253034858567",
  appId: "1:253034858567:web:ade066427e2d41a67b0962",
  measurementId: "G-SBFYYH0W94"
};

// Initialize Firebase
const app = !getApps.length? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);
export const auth=getAuth(app);
export const db=getFirestore(app);