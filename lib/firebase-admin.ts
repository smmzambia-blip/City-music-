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
    console.log('[Firebase Admin] Initializing for project:', projectId);
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
  // If we have a specific databaseId and it's not '(default)', try to use it.
  if (databaseId && databaseId !== '(default)') {
    console.log('[Firebase Admin] Connecting to database:', databaseId);
    try {
      dbInstance = admin.firestore(databaseId);
    } catch (innerError) {
      console.warn('[Firebase Admin] Specific database connection failed, falling back to default:', innerError);
      dbInstance = admin.firestore();
    }
  } else {
    console.log('[Firebase Admin] Connecting to default database');
    dbInstance = admin.firestore();
  }
} catch (e) {
  console.error('[Firebase Admin] Firestore provider failed:', e);
  dbInstance = admin.firestore();
}

export const adminDb = dbInstance;
export const adminAuth = admin.auth();
