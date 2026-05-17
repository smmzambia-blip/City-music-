import { adminDb } from './firebase-admin';

let isRunning = false;

export async function startBackgroundBot() {
  if (isRunning) return;
  isRunning = true;

  console.log('[Background Bot] Starting worker loop...');

  // Run every 15 minutes
  setInterval(async () => {
    try {
      await checkAndRunAutoPost();
    } catch (err) {
      console.error('[Background Bot] error in interval:', err);
    }
  }, 15 * 60 * 1000);

  // Run once on startup after a small delay
  setTimeout(async () => {
    try {
      await checkAndRunAutoPost();
    } catch (err) {
      console.error('[Background Bot] error in initial run:', err);
    }
  }, 10000);
}

async function checkAndRunAutoPost() {
  console.log('[Background Bot] Checking for scheduled posts...');
  try {
    const settingsDoc = await adminDb.collection('settings').doc('auto-post').get();
    if (!settingsDoc.exists) {
      console.log('[Background Bot] No auto-post settings found in DB.');
      return;
    }

    const settings = settingsDoc.data();
    if (!settings || !settings.enabled) {
      console.log('[Background Bot] Auto-post is disabled.');
      return;
    }

    const now = Date.now();
    const intervalMs = (settings.intervalHours || 24) * 60 * 60 * 1000;
    const lastRun = settings.lastRun?.toDate?.()?.getTime() || 0;

    if (now - lastRun >= intervalMs) {
      console.log('[Background Bot] Time to auto-post!');
      
      const secret = process.env.CRON_SECRET || 'zedtunes-internal-secret';
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/cron/auto-post?secret=${secret}`);
      
      const data = await res.json();
      if (res.ok && data.success) {
        console.log('[Background Bot] Auto-post successful:', data.post.headline);
        await adminDb.collection('settings').doc('auto-post').set({
          lastRun: new Date()
        }, { merge: true });
      } else {
        console.error('[Background Bot] Auto-post failed:', data);
      }
    }
  } catch (err: any) {
    console.error('[Background Bot] error in checkAndRunAutoPost:', err.message || err);
    if (err.message?.includes('5 NOT_FOUND')) {
      console.error('[Background Bot] This usually means the Firestore database ID is incorrect or the database does not exist.');
    }
  }
}
