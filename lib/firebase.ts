// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9CWNdurRjut4dwwhYkRLnjPwM6cRgTog",
  authDomain: "nfpltc.firebaseapp.com",
  projectId: "nfpltc",
  storageBucket: "nfpltc.firebasestorage.app",
  messagingSenderId: "561202327501",
  appId: "1:561202327501:web:e227107a8a8bccc1e85e84",
  measurementId: "G-XWHF4BGRDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);