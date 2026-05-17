import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import { adminDb, adminAuth } from '@/lib/firebase-admin';

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
  if (!isAuthorized && authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split('Bearer ')[1];
    try {
      const decodedToken = await adminAuth.verifyIdToken(token);
      if (decodedToken) {
        isAuthorized = true;
        console.log('[Cron] Authorized via Firebase Admin for user:', decodedToken.email);
      }
    } catch (e) {
      console.error('[Bot Auth] Admin verification failed:', e);
    }
  }

  if (!isAuthorized) {
    console.warn('[Cron] Unauthorized auto-post attempt');
    return NextResponse.json({ 
      error: 'Unauthorized', 
      details: 'Invalid or missing CRON_SECRET. If you are running this from the dashboard, ensure you are logged in.' 
    }, { status: 401 });
  }

  try {
    console.log('[Cron] Fetching news from Gemini...');
    
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });
    const model = ai.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const response = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: "Generate a breaking news story about the Zambian music scene. " +
                "Include a 'headline' and 'content' (about 3-4 paragraphs). " +
                "Format the response exactly as a JSON object with keys 'headline' and 'content'." }] }],
      generationConfig: {
        responseMimeType: "application/json",
      }
    });

    const rawText = response.response.text();
    let newsData;
    try {
      const cleanText = rawText.replace(/```json\n?|```/g, '').trim();
      newsData = JSON.parse(cleanText);
    } catch (e) {
      console.error('[Cron] JSON parse error. Raw text:', rawText);
      throw new Error('Gemini returned an invalid JSON format');
    }
    
    const seeds = ['music', 'concert', 'studio', 'artist', 'stage', 'microphone', 'guitar'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    const imageUrl = `https://picsum.photos/seed/${randomSeed}-${Date.now()}/800/600`;

    const botPost = {
      headline: newsData.headline,
      content: newsData.content,
      featuredImage: imageUrl,
      userId: 'system-auto-bot',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Save to Firestore using Admin SDK
    const docRef = await adminDb.collection('news').add(botPost);

    console.log('[Cron] Success! Created news post:', docRef.id);

    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      post: newsData 
    });
  } catch (err: any) {
    console.error('[Cron] Error:', err);
    return NextResponse.json({ error: 'Failed auto-posting', details: err.message }, { status: 500 });
  }
}
