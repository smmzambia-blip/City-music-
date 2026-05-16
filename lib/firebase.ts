import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9GPdY9HtLnm5EO4i6awmLSuHtwQAAD0g",
  authDomain: "gen-lang-client-0729602720.firebaseapp.com",
  projectId: "gen-lang-client-0729602720",
  storageBucket: "gen-lang-client-0729602720.firebasestorage.app",
  messagingSenderId: "844084132270",
  appId: "1:844084132270:web:644fffe2436860b556703f"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);
export const auth = getAuth(app);
