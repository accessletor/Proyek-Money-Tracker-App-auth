// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
 
const firebaseConfig = {
    apiKey: "AIzaSyAcSKVEYG-yH9Sh98_4wKAPmVlB3r8lqmU",
    authDomain: "money-tracker-app-5c369.firebaseapp.com",
    projectId: "money-tracker-app-5c369",
    storageBucket: "money-tracker-app-5c369.appspot.com",
    messagingSenderId: "107371096161",
    appId: "1:107371096161:web:025363f5e3a8ff1d9f2220"
  };
 
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
 
export { app, auth, db };