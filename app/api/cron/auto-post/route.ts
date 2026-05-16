import { NextResponse } from 'next/server';
import { GoogleGenAI } from "@google/genai";
import * as admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// Initialize Firebase Admin
if (!admin.apps.length) {
  admin.initializeApp({
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'thermal-pursuit-s07pf',
  });
}
const db = getFirestore('ai-studio-63b9b9ad-19dc-4719-ada9-985e7f65a884');

export async function GET(request: Request) {
  // Security check
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn('[Cron] Unauthorized auto-post attempt');
    return new NextResponse('Unauthorized', { status: 401 });
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

    const newsData = JSON.parse(response.text);
    
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
