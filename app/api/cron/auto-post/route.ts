import { NextResponse } from 'next/server';

// This API Route acts as a Cron Job handler.
// To run this automatically, use a free service like cron-job.org
// and point it to your production URL + /api/cron/auto-post.
// If using CRON_SECRET, add an Authorization header in your cron service:
// Authorization: Bearer YOUR_CRON_SECRET
export async function GET(request: Request) {
  // 1. Security: Ensure only authorized webhook/cron schedulers can trigger this
  const authHeader = request.headers.get('authorization');
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn('[Cron] Unauthorized auto-post attempt');
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    console.log('[Cron] Executing auto-post routine...');
    
    // 2. Fetch live data (e.g., from NewsAPI, rapidapi, or web scraping)
    // const res = await fetch(`https://newsapi.org/v2/top-headlines?category=sports&apiKey=${process.env.NEWS_API_KEY}`);
    // const data = await res.json();
    // const article = data.articles[0];

    // 3. ENFORCE COVER ART:
    // If the fetched article doesn't have an image, we assign a rich fallback image automatically.
    const fallbackImage = `https://picsum.photos/seed/${Date.now()}/800/600`;
    // const finalCoverArt = article.urlToImage || fallbackImage;
    const finalCoverArt = fallbackImage;

    const botPost = {
      headline: `Automated Update: ${new Date().toLocaleTimeString()}`,
      content: "This is an automated background post. It will ALWAYS include cover art, regardless of whether the original source provided an image.",
      featuredImage: finalCoverArt, // GUARANTEED COVER ART
      userId: 'system-auto-bot',    // Bot identifier
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // 4. Save to Database:
    // IMPORTANT: Since this runs in the background (no logged-in user), 
    // it will fail your Firestore Security Rules if you use the standard client SDK.
    // Instead, you must install and initialize 'firebase-admin' to securely push data:
    // 
    // import * as admin from 'firebase-admin';
    // await admin.firestore().collection('news').add(botPost);

    console.log('[Cron] Generated post with cover art:', botPost.featuredImage);

    return NextResponse.json({ 
      success: true, 
      message: 'Background auto-posting completed with guaranteed cover art.',
      post: botPost 
    });
  } catch (err: any) {
    console.error('[Cron] Error:', err);
    return NextResponse.json({ error: 'Failed auto-posting' }, { status: 500 });
  }
}
