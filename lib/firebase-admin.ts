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
    console.log('[Firebase Admin] Initializing with Project ID:', projectId);
    admin.initializeApp({
      projectId: projectId || undefined,
    });
  } catch (error) {
    console.error('[Firebase Admin] Fatal Initialization Error:', error);
  }
}

console.log('[Firebase Admin] Firestore Database ID Target:', databaseId);

// Access firestore.
let dbInstance;
try {
  if (databaseId && databaseId !== '(default)') {
    console.log('[Firebase Admin] Using named database instance:', databaseId);
    dbInstance = admin.firestore(databaseId);
  } else {
    console.log('[Firebase Admin] Using default database instance');
    dbInstance = admin.firestore();
  }
} catch (e) {
  console.error('[Firebase Admin] Firestore instance creation failed:', e);
  dbInstance = admin.firestore();
}

export const adminDb = dbInstance;
export const adminAuth = admin.auth();
