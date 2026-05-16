import Link from 'next/link';
import { Play } from 'lucide-react';

const mockSongs = [
  { id: '1', slug: 'blinding-lights', title: 'Blessed', artist: 'Pompi feat. Mag44', plays: '1.2k', cover: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '2', slug: 'chikonko', title: 'Chikonko', artist: 'Micky 2', plays: '840', cover: 'https://images.unsplash.com/photo-1493225457124-a1a2a5f5cb46?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '3', slug: 'nalutekwa', title: 'Nalutekwa', artist: 'Chile One MrZambia', plays: '2.5k', cover: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=300&h=300' },
  { id: '4', slug: 'pempelo', title: 'Pempelo', artist: 'Chef 187', plays: '1.9k', cover: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=300&h=300' },
];

export default function HomePage() {
  return (
    <div className="flex-1 space-y-12">
      {/* Hero Section */}
      <div className="relative h-64 rounded-3xl overflow-hidden mb-12 group cursor-pointer shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-zinc-900/60 to-transparent z-10"></div>
        <div className="absolute inset-x-0 bottom-0 top-0 bg-white/5 flex items-center justify-center text-8xl md:text-9xl font-black text-black/5 select-none transition-transform group-hover:scale-110 duration-700">FEATURED</div>
        <div className="relative z-20 h-full flex flex-col justify-center p-10">
          <span className="bg-[#00FF00] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase w-fit mb-4 shadow-sm">Hot Release</span>
          <h2 className="text-4xl md:text-5xl font-black mb-2 text-white">Zambian Soul Sessions</h2>
          <p className="text-zinc-400 mb-6 text-sm md:text-base max-w-md">Featuring Chef 187, Macky 2, and Cleo Ice Queen. The rhythm of the nation.</p>
          <button className="bg-[#00FF00] text-black px-8 py-3 rounded-full text-sm font-black flex items-center gap-2 hover:bg-white transition-all w-fit shadow-lg active:scale-95">
            <Play className="w-4 h-4 fill-current ml-0.5" />
            LISTEN NOW
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Songs Section */}
        <div className="flex-1 space-y-12">
          {/* Trending Section */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-[#00FF00]"></div>
                <h3 className="text-2xl font-black tracking-tighter uppercase italic">Trending Now</h3>
              </div>
              <Link href="/trending" className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-[#00FF00] transition-colors">See Trending</Link>
            </div>
            
            <div className="space-y-4">
              {mockSongs.slice(0, 3).map((song, i) => (
                <Link 
                  key={`trending-${song.id}`}
                  href={`/song/${song.slug}`}
                  className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all group border border-transparent hover:border-zinc-100"
                >
                  <span className="text-3xl font-black text-zinc-100 italic w-12 text-center group-hover:text-[#00FF00] transition-colors">0{i+1}</span>
                  <div className="w-20 h-20 bg-zinc-100 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                    <img src={song.cover} alt={song.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-lg text-black truncate">{song.title}</h4>
                    <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{song.artist}</p>
                    <div className="flex items-center gap-4 mt-2">
                       <span className="text-[10px] font-black text-[#00FF00] bg-[#00FF00]/10 px-2 py-0.5 rounded italic">Trending +{15 - i*2}%</span>
                       <span className="text-[10px] font-bold text-zinc-300 uppercase">{song.plays} Plays</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-zinc-100 flex items-center justify-center text-zinc-200 group-hover:bg-[#00FF00] group-hover:border-transparent group-hover:text-black transition-all">
                    <Play className="w-5 h-5 fill-current ml-1" />
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* Latest Hits Grid */}
          <section>
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-1 h-8 bg-zinc-800"></div>
                <h3 className="text-2xl font-black tracking-tighter uppercase italic text-zinc-800">Latest Hits</h3>
              </div>
              <Link href="/trending" className="text-[10px] font-black text-zinc-400 uppercase tracking-widest hover:text-black transition-colors">View All</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mockSongs.map((song) => (
                <Link 
                  key={song.id} 
                  href={`/song/${song.slug}`}
                  className="group block p-4 bg-zinc-50 rounded-2xl hover:bg-white hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-transparent hover:border-zinc-100"
                >
                  <div className="aspect-square bg-zinc-200 rounded-xl mb-4 relative overflow-hidden shadow-sm">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="absolute inset-0 object-cover w-full h-full transition duration-500 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                      <div className="w-12 h-12 bg-[#00FF00] rounded-full flex items-center justify-center text-black shadow-2xl scale-75 group-hover:scale-100 transition-all duration-300">
                        <Play className="w-6 h-6 fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                  <div>
                     <p className="font-extrabold text-base truncate text-black mb-0.5 tracking-tight">{song.title}</p>
                     <p className="text-xs font-bold text-zinc-400 truncate uppercase tracking-wider">{song.artist}</p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-3">
                    <span className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">{song.plays} Plays</span>
                    <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-[#00FF00]/10 group-hover:text-[#00FF00] transition-colors">
                       <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Side Trends */}
        <div className="w-full lg:w-72 space-y-10">
          <div>
            <h3 className="text-xs font-black text-zinc-300 uppercase tracking-[3px] mb-6">Explore Genres</h3>
            <div className="flex flex-wrap gap-2">
              {['Kalindula', 'Zed Beats', 'Hip Hop', 'Gospel', 'Amapiano', 'Dancehall'].map(genre => (
                <Link key={genre} href="/genres" className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-lg text-xs font-bold text-zinc-600 hover:bg-[#00FF00] hover:text-black hover:border-transparent transition-all shadow-sm active:scale-95">
                  {genre}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100">
            <h3 className="text-xs font-black text-zinc-300 uppercase tracking-[3px] mb-6 underline decoration-[#00FF00] decoration-2 underline-offset-8">Zambia Top 5</h3>
            <div className="space-y-6">
              {[
                { rank: '01', title: 'Single for the Night', artist: 'Yo Maps', stat: '+14%' },
                { rank: '02', title: 'Akatonitaka', artist: 'F Jay', stat: '-' },
                { rank: '03', title: 'Somone', artist: 'Yo Maps', stat: '+5%' },
                { rank: '04', title: 'Blessed', artist: 'Pompi', stat: '+2%' },
                { rank: '05', title: 'Pempelo', artist: 'Chef 187', stat: 'New' },
              ].map(item => (
                <div key={item.rank} className="flex items-center gap-4 group cursor-pointer">
                  <span className="text-2xl font-black text-zinc-200 italic group-hover:text-[#00FF00] transition-colors">{item.rank}</span>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-black truncate text-zinc-800">{item.title}</p>
                    <p className="text-[10px] font-bold text-zinc-400 truncate uppercase mt-0.5">{item.artist}</p>
                  </div>
                  <div className={`text-[10px] font-black ${item.stat === '-' ? 'text-zinc-300' : 'text-[#00FF00]'}`}>{item.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
