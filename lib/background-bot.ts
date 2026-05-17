import { db } from './firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';

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
  setTimeout(() => checkAndRunAutoPost(), 10000);
}

async function checkAndRunAutoPost() {
  const settingsDoc = await getDoc(doc(db, 'settings', 'auto-post'));
  if (!settingsDoc.exists()) return;

  const settings = settingsDoc.data();
  if (!settings.enabled) return;

  const now = Date.now();
  const intervalMs = (settings.intervalHours || 24) * 60 * 60 * 1000;
  const lastRun = settings.lastRun?.toDate?.()?.getTime() || 0;

  if (now - lastRun >= intervalMs) {
    console.log('[Background Bot] Time to auto-post!');
    
    // Trigger the internal API route
    try {
      // Since we are inside the same process, we could call the logic directly,
      // but hitting the API route is easier to reuse the existing logic.
      // We'll need the CRON_SECRET or bypass auth if called locally.
      const secret = process.env.CRON_SECRET || 'zedtunes-internal-secret';
      
      // Note: in local dev, the hostname might be tricky.
      // We'll try to use localhost:3000
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
      const res = await fetch(`${baseUrl}/api/cron/auto-post?secret=${secret}`);
      
      const data = await res.json();
      if (res.ok && data.success) {
        console.log('[Background Bot] Auto-post successful:', data.post.headline);
        await setDoc(doc(db, 'settings', 'auto-post'), {
          lastRun: serverTimestamp()
        }, { merge: true });
      } else {
        console.error('[Background Bot] Auto-post failed:', data);
      }
    } catch (err) {
      console.error('[Background Bot] Failed to trigger auto-post API:', err);
    }
  }
}
