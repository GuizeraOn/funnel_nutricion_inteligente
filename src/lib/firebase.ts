import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyBzyX7D4tJ4vTNH7U4E56C9xIBQGsNpHHk",
    authDomain: "nutri2-57242.firebaseapp.com",
    projectId: "nutri2-57242",
    storageBucket: "nutri2-57242.firebasestorage.app",
    messagingSenderId: "920086652113",
    appId: "1:920086652113:web:a9371200b46dd7f79791f0",
    measurementId: "G-X97DP6T0GF"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app); // Initialized Firestore
const googleProvider = new GoogleAuthProvider();

let analytics;
if (typeof window !== "undefined") {
    isSupported().then((supported) => {
        if (supported) {
            analytics = getAnalytics(app);
        }
    });
}

export { app, auth, db, googleProvider, analytics }; // Exported db
