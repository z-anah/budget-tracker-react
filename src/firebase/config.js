// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCA2c3JM0chy-bhHhqbsRjGs8_v003q16c',
  authDomain: 'budgettracker-8f928.firebaseapp.com',
  projectId: 'budgettracker-8f928',
  storageBucket: 'budgettracker-8f928.firebasestorage.app',
  messagingSenderId: '961606643931',
  appId: '1:961606643931:web:e455405f6d0fd24b779cfe',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };