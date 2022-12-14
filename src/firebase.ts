// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBwzQFq_Hv6FwjPrKbdqKhW8zyKEko1lLQ",
    authDomain: "hackukosen.firebaseapp.com",
    databaseURL: "https://hackukosen-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "hackukosen",
    storageBucket: "hackukosen.appspot.com",
    messagingSenderId: "888588673875",
    appId: "1:888588673875:web:7a687e8c14a09a80d737a6",
    measurementId: "G-PWV58MM1TM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
const analytics = getAnalytics(app);
