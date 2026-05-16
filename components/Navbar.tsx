'use client';

import Link from 'next/link';
import { Home, Compass, TrendingUp, Users, Disc, Shield, UserCircle2 } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="w-64 border-r border-white/10 flex flex-col bg-[#0A0A0A] h-full flex-shrink-0 hidden md:flex">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-8 h-8 bg-[#00FF00] rounded-sm flex items-center justify-center text-black font-black italic underline">Z</div>
          <h1 className="text-2xl font-black tracking-tight text-[#00FF00]">ZEDTUNES</h1>
        </div>
        
        <nav className="space-y-1">
          <Link href="/" className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${isActive('/') ? 'bg-white/5 text-[#00FF00]' : 'text-white/60 hover:text-white'}`}>
            <Home className="w-5 h-5" /> Home
          </Link>
          <Link href="/genres" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/genres') ? 'bg-white/5 text-[#00FF00]' : 'text-white/60 hover:text-white'}`}>
            <Compass className="w-5 h-5" /> Discover Music
          </Link>
          <Link href="/trending" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/trending') ? 'bg-white/5 text-[#00FF00]' : 'text-white/60 hover:text-white'}`}>
            <TrendingUp className="w-5 h-5" /> Trending
          </Link>
          <Link href="/artists" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/artists') ? 'bg-white/5 text-[#00FF00]' : 'text-white/60 hover:text-white'}`}>
            <Users className="w-5 h-5" /> Artists
          </Link>
          <Link href="/albums" className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive('/albums') ? 'bg-white/5 text-[#00FF00]' : 'text-white/60 hover:text-white'}`}>
            <Disc className="w-5 h-5" /> Albums
          </Link>
        </nav>

        <div className="mt-8 pt-8 border-t border-white/5">
          <p className="px-3 text-[10px] font-bold text-white/30 uppercase tracking-[2px] mb-4">Account</p>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-white/60 hover:text-white transition-colors">
            <div className="w-5 h-5 border border-white/20 rounded flex items-center justify-center text-[10px] font-bold">A</div>
            Admin Panel
          </Link>
          <Link href="/login" className="flex items-center gap-3 px-3 py-2 text-white/60 hover:text-white transition-colors">
            <UserCircle2 className="w-5 h-5" />
            Login
          </Link>
        </div>

        <div className="mt-auto">
          <div className="bg-gradient-to-br from-[#00FF00]/20 to-transparent p-4 rounded-xl border border-[#00FF00]/10">
            <p className="text-xs font-bold text-[#00FF00] mb-1">SEO Health: 98%</p>
            <p className="text-[10px] text-white/40 leading-relaxed">All active songs are statically generated for Google indexing.</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

