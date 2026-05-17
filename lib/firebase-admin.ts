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
    // Standard initialization with explicit projectId from config
    console.log('[Firebase Admin] Initializing for project:', projectId);
    admin.initializeApp({
      projectId: projectId,
      // For some environments, explicitly providing the project ID is enough
      // but we ensure it's not re-declared if already exists
    });
  } catch (error) {
    console.error('Firebase Admin initialization error:', error);
  }
}

// Access firestore. Use the databaseId if provided and not '(default)'.
let dbInstance;
try {
  if (databaseId && databaseId !== '(default)') {
    console.log('[Firebase Admin] Connecting to database:', databaseId);
    dbInstance = admin.firestore(databaseId);
  } else {
    console.log('[Firebase Admin] Connecting to default database');
    dbInstance = admin.firestore();
  }
} catch (e) {
  console.error('[Firebase Admin] Failed specific database connection, falling back to default:', e);
  dbInstance = admin.firestore();
}

export const adminDb = dbInstance;
export const adminAuth = admin.auth();
