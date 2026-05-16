import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';
import appletConfig from '@/firebase-applet-config.json';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || appletConfig.projectId,
  });
}

const dbId = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || (appletConfig as any).firestoreDatabaseId || '(default)';
const db = getFirestore(dbId === '(default)' ? undefined : dbId);

export async function GET(request: Request) {
  // Security check
  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);
  const querySecret = url.searchParams.get('secret');

  // Allow if no secret is set, OR if one of the secrets matches
  const secret = process.env.CRON_SECRET;
  if (secret && authHeader !== `Bearer ${secret}` && querySecret !== secret) {
    console.warn('[Cron] Unauthorized auto-post attempt');
    return NextResponse.json({ 
      error: 'Unauthorized', 
      details: 'Invalid or missing CRON_SECRET. If you are running this from the dashboard, make sure the CRON_SECRET matches your environment.' 
    }, { status: 401 });
  }

  try {
    console.log('[Cron] Fetching news from Gemini...');
    
    const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY as string });
    
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: "Generate a breaking news story about the Zambian music scene. " +
                "Include a 'headline' and 'content' (about 3-4 paragraphs). " +
                "Format the response exactly as a JSON object with keys 'headline' and 'content'.",
      config: {
        responseMimeType: "application/json",
      }
    });

    const rawText = response.text;
    let newsData;
    try {
      // Clean up markdown code blocks if present
      const cleanText = rawText.replace(/```json\n?|```/g, '').trim();
      newsData = JSON.parse(cleanText);
    } catch (e) {
      console.error('[Cron] JSON parse error. Raw text:', rawText);
      throw new Error('Gemini returned an invalid JSON format');
    }
    
    // Choose a random music-related image from placeholder
    const seeds = ['music', 'concert', 'studio', 'artist', 'stage', 'microphone', 'guitar'];
    const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
    const imageUrl = `https://picsum.photos/seed/${randomSeed}-${Date.now()}/800/600`;

    const botPost = {
      headline: newsData.headline,
      content: newsData.content,
      featuredImage: imageUrl,
      userId: 'system-auto-bot',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Save to Firestore using Admin SDK
    const docRef = await db.collection('news').add(botPost);

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
