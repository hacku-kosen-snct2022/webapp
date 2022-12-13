// Import the functions you need from the SDKs you need
import { getAnalytics } from 'firebase/analytics'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBwzQFq_Hv6FwjPrKbdqKhW8zyKEko1lLQ',
  appId: '1:888588673875:web:7a687e8c14a09a80d737a6',
  authDomain: 'hackukosen.firebaseapp.com',
  databaseURL: 'https://hackukosen-default-rtdb.asia-southeast1.firebasedatabase.app',
  measurementId: 'G-PWV58MM1TM',
  messagingSenderId: '888588673875',
  projectId: 'hackukosen',
  storageBucket: 'hackukosen.appspot.com'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
const analytics = getAnalytics(app)
