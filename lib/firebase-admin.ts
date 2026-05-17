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
    console.log('[Firebase Admin] Initializing with Project:', projectId);
    admin.initializeApp({
      projectId: projectId,
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

// Access firestore.
let dbInstance;
try {
  if (isCustomFirebase && databaseId && databaseId !== '(default)') {
    dbInstance = admin.firestore(databaseId);
  } else if (!isCustomFirebase) {
    // For AI Studio apps, the default instance usually auto-connects to the correctly provisioned database.
    // Explicitly using the long long ID from config often causes NOT_FOUND in Admin SDK.
    dbInstance = admin.firestore();
  } else {
    dbInstance = admin.firestore();
  }
} catch (e) {
  dbInstance = admin.firestore();
}

export const adminDb = dbInstance;
export const adminAuth = admin.auth();
