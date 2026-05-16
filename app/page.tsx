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
    <div className="flex-1 space-y-8">
      {/* Hero Section */}
      <div className="relative h-48 rounded-2xl overflow-hidden mb-8 group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent z-10"></div>
        <div className="absolute inset-0 bg-[#111] flex items-center justify-center text-8xl md:text-9xl font-black text-white/5">FEATURED</div>
        <div className="relative z-20 h-full flex flex-col justify-center p-8">
          <span className="bg-[#00FF00] text-black text-[10px] font-black px-2 py-0.5 rounded uppercase w-fit mb-3">Featured Release</span>
          <h2 className="text-3xl md:text-4xl font-black mb-1">Zambian Soul Sessions Vol. 2</h2>
          <p className="text-white/60 mb-4 text-sm md:text-base">Featuring Chef 187, Macky 2, and Cleo Ice Queen</p>
          <button className="bg-white text-black px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 hover:bg-[#00FF00] transition-all w-fit">
            <Play className="w-4 h-4 fill-current ml-1" />
            Listen Now
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Songs Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold tracking-tight">Latest Uploads</h3>
            <Link href="/trending" className="text-xs font-bold text-[#00FF00] uppercase tracking-wider hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {mockSongs.map((song) => (
              <div key={song.id} className="bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-all group">
                <Link href={`/song/${song.slug}`} className="block relative">
                  <div className="aspect-square bg-[#222] rounded-lg mb-3 relative overflow-hidden">
                    <img
                      src={song.cover}
                      alt={song.title}
                      className="absolute inset-0 object-cover w-full h-full transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-10 h-10 bg-[#00FF00] rounded-full flex items-center justify-center text-black shadow-lg translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                        <Play className="w-5 h-5 fill-current ml-1" />
                      </div>
                    </div>
                  </div>
                  <p className="font-bold text-sm truncate text-white">{song.title}</p>
                  <p className="text-xs text-white/40 truncate">{song.artist}</p>
                </Link>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-[10px] text-white/20">{song.plays} plays</span>
                  <button className="text-[#00FF00] hover:text-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Side Trends */}
        <div className="w-full lg:w-64">
          <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-6">Popular Genres</h3>
          <div className="flex flex-wrap gap-2">
            {['Kalindula', 'Zed Beats', 'Hip Hop', 'Gospel', 'Amapiano'].map(genre => (
              <Link key={genre} href="/genres" className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-medium hover:bg-[#00FF00] hover:text-black hover:border-transparent transition-all cursor-pointer">
                {genre}
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <h3 className="text-sm font-bold text-white/40 uppercase tracking-widest mb-4">Zambia Top 5</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-white/20 italic">01</span>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">Single for the Night</p>
                  <p className="text-[10px] text-white/40 truncate">Yo Maps</p>
                </div>
                <div className="text-[10px] font-bold text-[#00FF00]">+14%</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-white/20 italic">02</span>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">Akatonitaka</p>
                  <p className="text-[10px] text-white/40 truncate">F Jay</p>
                </div>
                <div className="text-[10px] font-bold text-white/20 text-xs">-</div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-black text-white/20 italic">03</span>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate">Somone</p>
                  <p className="text-[10px] text-white/40 truncate">Yo Maps</p>
                </div>
                <div className="text-[10px] font-bold text-[#00FF00]">+5%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
