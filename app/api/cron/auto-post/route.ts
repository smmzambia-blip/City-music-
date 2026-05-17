import { NextResponse } from 'next/server';
import { adminDb, adminAuth } from '@/lib/firebase-admin';

import { runAutoPostBot } from '@/lib/bot-actions';

export async function GET(request: Request) {
  // Security check
  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);
  const querySecret = url.searchParams.get('secret');

  const secret = process.env.CRON_SECRET || 'zedtunes-internal-secret';
  let isAuthorized = false;

  // 1. Check if cron secret matches (standard cron job)
  if (secret) {
    if (authHeader === `Bearer ${secret}` || querySecret === secret) {
      isAuthorized = true;
    }
  }

  // 2. If not authorized by secret, try verifying Firebase ID Token (dashboard manual trigger)
  let authError = null;
  if (!isAuthorized && authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      if (decodedToken) {
        isAuthorized = true;
        console.log('[Cron] Authorized via Firebase Admin for user:', decodedToken.email);
      }
    } catch (e: any) {
      authError = e.message;
      console.error('[Bot Auth] Admin verification failed:', e);
    }
  }

  if (!isAuthorized) {
    console.warn('[Cron] Unauthorized auto-post attempt.');
    return NextResponse.json({ 
      success: false,
      error: 'Unauthorized', 
      details: 'Invalid or missing CRON_SECRET or auth token.',
      authError: authError,
      debug: {
        hasSecret: !!secret,
        hasAuthHeader: !!authHeader,
        hasQuerySecret: !!querySecret
      }
    }, { status: 401 });
  }

  try {
    const result = await runAutoPostBot();
    return NextResponse.json({ 
      success: true, 
      id: result.id,
      post: result.post 
    });
  } catch (err: any) {
    console.error('[Cron] Error:', err);
    return NextResponse.json({ error: 'Failed auto-posting', details: err.message }, { status: 500 });
  }
}
