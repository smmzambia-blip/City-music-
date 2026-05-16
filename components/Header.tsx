'use client';

import { Search } from 'lucide-react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="h-16 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md sticky top-0 z-10 w-full">
      <div className="relative w-96">
        <input 
          type="text" 
          placeholder="Search artists, songs, genres..." 
          className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00FF00]/50 transition-all text-white placeholder:text-white/40"
        />
        <Search className="w-4 h-4 absolute left-3.5 top-2.5 text-white/40" />
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right mr-2 hidden sm:block">
          <p className="text-[10px] font-bold text-white/40 uppercase">Trending Now</p>
          <p className="text-sm font-semibold text-white">Yo Maps - Somone</p>
        </div>
        <Link href="/login" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all text-white">
          <span className="text-xs font-bold">U</span>
        </Link>
      </div>
    </header>
  );
}
