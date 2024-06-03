// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCql3IiwPU-PmSYO2XMuGDBnYPHQb7_T4E",
  authDomain: "login-d46d2.firebaseapp.com",
  projectId: "login-d46d2",
  storageBucket: "login-d46d2.appspot.com",
  messagingSenderId: "660410907160",
  appId: "1:660410907160:web:de2aefde20bbb7e536a16d",
  measurementId: "G-36QJ7RSB3T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

