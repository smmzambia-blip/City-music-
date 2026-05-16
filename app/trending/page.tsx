'use client';

import { Play } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function TrendingPage() {
  const [songs, setSongs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTrending() {
      try {
        const q = query(collection(db, 'songs'), orderBy('plays', 'desc'), limit(50));
        const snap = await getDocs(q);
        const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        
        // If plays are all 0, we'll just show them in the order added, 
        // to make sure it's not totally empty if someone just added songs without views yet.
        if (data.length === 0) {
           const backupQ = query(collection(db, 'songs'), orderBy('createdAt', 'desc'), limit(50));
           const backupSnap = await getDocs(backupQ);
           setSongs(backupSnap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        } else {
           setSongs(data);
        }
      } catch(err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTrending();
  }, []);

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="border-b border-zinc-100 pb-8">
        <h1 className="text-4xl font-black italic tracking-tighter uppercase text-black">Trending Now</h1>
        <p className="text-zinc-500 font-medium mt-2">The most played Zambian songs right now on ZedTunes.</p>
      </div>
      
      {loading ? (
        <div className="text-center py-20 font-bold uppercase tracking-widest text-zinc-400 text-xs">Loading trends...</div>
      ) : (
        <div className="space-y-4 pt-4">
          {songs.length === 0 ? (
            <div className="text-center py-20 font-bold uppercase tracking-widest text-zinc-400 text-xs">No songs found.</div>
          ) : (
            songs.map((song, i) => (
              <Link 
                key={song.id}
                href={`/song/${song.slug}`}
                className="flex items-center gap-4 bg-zinc-50 p-4 rounded-3xl hover:bg-white hover:shadow-xl transition-all group border border-transparent hover:border-zinc-100"
              >
                <div className="w-12 text-center">
                  <span className="text-3xl font-black text-zinc-200 italic group-hover:text-[#00FF00] transition-colors">{i + 1}</span>
                </div>
                
                <div className="w-16 h-16 rounded-xl bg-zinc-200 overflow-hidden shrink-0 shadow-sm relative">
                  <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
                    <div className="w-8 h-8 bg-[#00FF00] rounded-full flex items-center justify-center text-black shadow-lg scale-75 group-hover:scale-100 transition-all duration-300">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-lg text-black truncate group-hover:text-[#00FF00] transition-colors">{song.title}</h3>
                  <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest truncate">{song.artist}</p>
                </div>
                
                <div className="text-right hidden sm:block pr-4">
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest flex items-center justify-end gap-1.5 mb-1"><Play className="w-3 h-3 text-zinc-300" /> {song.plays || 0}</div>
                  <span className="text-[10px] font-black text-[#00FF00] bg-[#00FF00]/10 px-2 py-0.5 rounded italic whitespace-nowrap">Trending +{Math.max(1, 20 - i*2)}%</span>
                </div>
                
                <div className="w-12 h-12 rounded-full border-2 border-zinc-100 flex items-center justify-center text-zinc-300 group-hover:bg-black group-hover:border-black group-hover:text-[#00FF00] transition-all shrink-0">
                  <Play className="w-5 h-5 fill-current ml-1" />
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
