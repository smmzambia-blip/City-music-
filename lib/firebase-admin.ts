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
    // Try auto-initialization first (standard for Cloud Run / AI Studio)
    console.log('[Firebase Admin] Attempting auto-initialization...');
    admin.initializeApp();
  } catch (error) {
    console.log('[Firebase Admin] Auto-init failed, using manual config with project:', projectId);
    admin.initializeApp({
      projectId: projectId,
    });
  }
}

// Access firestore. Use the databaseId if provided.
let dbInstance;
try {
  console.log('[Firebase Admin] Connecting to database:', databaseId);
  dbInstance = admin.firestore(databaseId);
} catch (e) {
  console.error('[Firebase Admin] Failed specific database connection, falling back to default:', e);
  dbInstance = admin.firestore();
}

export const adminDb = dbInstance;
export const adminAuth = admin.auth();
