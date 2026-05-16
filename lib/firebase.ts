import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, memoryLocalCache } from 'firebase/firestore';
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

const databaseId = isCustomFirebase 
  ? (process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || '(default)')
  : (appletConfig as any).firestoreDatabaseId;

// Configure Firestore with maximum stability settings for AI Studio environment
export const db = databaseId && databaseId !== '(default)'
  ? initializeFirestore(app, { 
      experimentalForceLongPolling: true,
      useFetchStreams: false,
      localCache: memoryLocalCache()
    } as any, databaseId)
  : initializeFirestore(app, { 
      experimentalForceLongPolling: true,
      useFetchStreams: false,
      localCache: memoryLocalCache()
    } as any);

export const auth = getAuth(app);
export const storage = getStorage(app);

