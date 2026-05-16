'use client';

import Link from 'next/link';
import { Search, UserCircle2, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Trending', href: '/trending' },
    { name: 'Discover', href: '/genres' },
    { name: 'Artists', href: '/artists' },
  ];

  return (
    <nav className="bg-white border-b border-zinc-100 sticky top-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section - Top Center */}
        <div className="flex justify-center py-4 border-b border-zinc-50 md:py-6">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-black rounded-lg flex items-center justify-center text-[#00FF00] font-black italic underline transform group-hover:rotate-6 transition-transform">Z</div>
            <span className="text-3xl font-black tracking-tighter text-black italic">ZEDTUNES</span>
          </Link>
        </div>

        <div className="flex justify-between h-14 md:h-16 items-center">
          
          {/* Left Side: Desktop Menu */}
          <div className="hidden md:flex items-center space-x-10 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:tracking-[0.3em] ${
                  isActive(link.href) ? 'text-[#00FF00] border-b-2 border-[#00FF00]' : 'text-zinc-500 hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions for Mobile - Hamburger */}
          <div className="flex md:hidden items-center justify-between w-full">
             <div className="flex items-center gap-4">
                <button 
                  className="p-2 text-zinc-500 hover:text-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
             </div>
             {/* Removed login link for users */}
          </div>

          {/* Right Side: Search - Desktop */}
          <div className="hidden md:flex items-center justify-end space-x-6">
            <div className="flex items-center relative group">
               <Search className="w-4 h-4 absolute left-3 text-zinc-300 group-focus-within:text-[#00FF00] transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search library..." 
                 className="bg-zinc-50 border-zinc-100 border rounded-full py-1.5 pl-9 pr-4 text-[10px] uppercase font-bold tracking-widest w-48 focus:w-64 transition-all outline-none focus:ring-1 focus:ring-[#00FF00]/30"
               />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-32 px-6 animate-in slide-in-from-top duration-300">
           <button 
             className="absolute top-8 left-6 p-2 text-zinc-800"
             onClick={() => setIsMobileMenuOpen(false)}
           >
             <X className="w-8 h-8" />
           </button>
           
           <div className="space-y-6 flex flex-col items-center">
             {navLinks.map((link) => (
               <Link
                 key={link.name}
                 href={link.href}
                 onClick={() => setIsMobileMenuOpen(false)}
                 className={`text-2xl font-black uppercase tracking-[0.2em] ${
                   isActive(link.href) ? 'text-[#00FF00]' : 'text-zinc-800'
                 }`}
               >
                 {link.name}
               </Link>
             ))}
             <div className="pt-8 w-full border-t border-zinc-100 flex flex-col items-center gap-6">
                <Link
                  href="/login"
                  className="text-sm font-bold uppercase tracking-widest text-zinc-300 hover:text-black"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Login
                </Link>
             </div>
           </div>
        </div>
      )}
    </nav>
  );
}

