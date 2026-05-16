import { db } from '@/lib/firebase';
import { collection, query, orderBy, getDocs, limit } from 'firebase/firestore';
import Image from 'next/image';
import Link from 'next/link';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function NewsPage() {
  let newsPosts: any[] = [];
  
  try {
    const q = query(
      collection(db, 'news'),
      orderBy('createdAt', 'desc'),
      limit(20)
    );
    const snapshot = await getDocs(q);
    newsPosts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching news:", error);
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">
          Latest <span className="text-zinc-400">News</span>
        </h1>
      </div>

      {newsPosts.length === 0 ? (
        <div className="text-center py-20 bg-zinc-50 rounded-3xl border border-zinc-100">
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">No news available at the moment.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsPosts.map((post) => (
            <div key={post.id} className="group bg-white border border-zinc-100 rounded-[2rem] overflow-hidden hover:border-[var(--color-primary)]/50 transition-all shadow-sm hover:shadow-xl flex flex-col">
              {post.featuredImage && (
                <div className="relative h-48 w-full bg-zinc-100 overflow-hidden">
                  <Image 
                    src={post.featuredImage} 
                    alt={post.headline} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
              )}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-[var(--color-primary)] mb-3">
                    {post.createdAt?.toDate ? post.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}
                  </div>
                  <h2 className="text-xl font-bold mb-3 leading-tight group-hover:text-[var(--color-primary)] transition-colors line-clamp-2">
                    {post.headline}
                  </h2>
                  <p className="text-zinc-500 text-sm line-clamp-3 mb-4 leading-relaxed">
                    {post.content}
                  </p>
                </div>
                <div className="pt-4 border-t border-zinc-50 flex justify-between items-center mt-auto">
                    <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">Read More</span>
                    <div className="w-8 h-8 rounded-full bg-zinc-50 flex items-center justify-center group-hover:bg-[var(--color-primary)] group-hover:text-black transition-colors">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
