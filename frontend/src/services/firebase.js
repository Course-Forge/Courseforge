import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA_9UpBbCpaLGEq4UJoK0_bx-ByqfFIyhM",
    authDomain: "courseforge-46c46.firebaseapp.com",
    projectId: "courseforge-46c46",
    storageBucket: "courseforge-46c46.appspot.com",
    messagingSenderId: "932066014247",
    appId: "1:932066014247:web:a2a3b3aa28b66066b1ca02",
    measurementId: "G-255HK123PQ"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app)

export { db, auth };
