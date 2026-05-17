import * as admin from 'firebase-admin';
import appletConfig from '../firebase-applet-config.json';

const isCustomFirebase = !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;

const projectId = isCustomFirebase 
  ? process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID 
  : (appletConfig as any).projectId;

const databaseId = isCustomFirebase 
  ? (process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || '(default)')
  : (appletConfig as any).firestoreDatabaseId;

if (!admin.apps.length) {
  try {
    if (isCustomFirebase) {
      console.log('[Firebase Admin] Initializing with custom project:', projectId);
      admin.initializeApp({ projectId });
    } else {
      // In AI Studio, zero-config init behaves best
      console.log('[Firebase Admin] Initializing with default config');
      admin.initializeApp();
    }
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

// Access firestore.
let dbInstance;
try {
  // If we have a specific databaseId, use it.
  if (databaseId && databaseId !== '(default)') {
    console.log('[Firebase Admin] Connecting to database:', databaseId);
    dbInstance = admin.firestore(databaseId);
  } else {
    console.log('[Firebase Admin] Connecting to default database');
    dbInstance = admin.firestore();
  }
} catch (e) {
  console.error('[Firebase Admin] Firestore connection failed:', e);
  dbInstance = admin.firestore();
}

export const adminDb = dbInstance;
export const adminAuth = admin.auth();
