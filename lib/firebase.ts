import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

import appletConfig from '../firebase-applet-config.json';

const isCustomFirebase = !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const firebaseConfig = isCustomFirebase ? {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} : appletConfig;

const app = !getApps().length ? initializeApp(firebaseConfig as any) : getApp();

export const db = isCustomFirebase 
  ? getFirestore(app) 
  : getFirestore(app, (appletConfig as any).firestoreDatabaseId);

export const auth = getAuth(app);
export const storage = getStorage(app);
