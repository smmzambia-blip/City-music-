'use client';

import Link from 'next/link';
import { Search, UserCircle2, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export const NavLogo = () => (
  <div className="flex items-center gap-3 md:gap-4 group cursor-pointer">
    <div className="relative flex items-center justify-center w-10 h-10 md:w-12 md:h-12">
      <div className="absolute inset-0 bg-[#00FF00] rounded-br-[1rem] rounded-tl-[1rem] transform group-hover:rotate-180 transition-transform duration-700"></div>
      <div className="absolute inset-1 bg-black rounded-br-lg rounded-tl-lg flex items-center justify-center">
         <svg className="w-5 h-5 md:w-6 md:h-6 text-[#00FF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm12-3c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-2xl md:text-3xl font-black tracking-tighter leading-none text-black">
        ZED<span className="text-zinc-400">TUNES</span>
      </span>
      <span className="text-[8px] md:text-[9px] font-black tracking-[0.4em] text-[#00FF00] uppercase pt-0.5 md:pt-1">Zambia's Pure Music</span>
    </div>
  </div>
);

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => pathname === path;

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Trending', href: '/trending' },
    { name: 'Artists', href: '/artists' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="bg-white border-b border-zinc-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo Section - Top Center */}
        <div className="flex justify-center py-4 border-b border-zinc-50 md:py-6 relative z-50 bg-white">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
            <NavLogo />
          </Link>
        </div>

        <div className="flex justify-between h-14 md:h-16 items-center">
          
          {/* Left Side: Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-xs font-black uppercase tracking-[0.2em] transition-all hover:tracking-[0.3em] py-2 ${
                  isActive(link.href) ? 'text-[#00FF00] border-b-2 border-[#00FF00]' : 'text-zinc-500 hover:text-black border-b-2 border-transparent'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions for Mobile - Hamburger */}
          <div className="flex md:hidden items-center justify-start w-full absolute top-6 left-4 z-[60]">
             <button 
               className="p-2 text-black bg-zinc-50 rounded-full hover:bg-zinc-100 transition-colors shadow-sm"
               onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
             >
               {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
             </button>
          </div>

          {/* Right Side: Search - Desktop */}
          <div className="hidden md:flex items-center justify-end space-x-6 flex-1 absolute right-6">
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
        <div className="md:hidden fixed inset-0 z-40 bg-white pt-28 px-6 animate-in slide-in-from-top duration-300 overflow-y-auto pb-40">
           <div className="space-y-8 flex flex-col items-center">
             {navLinks.map((link) => (
               <Link
                 key={link.name}
                 href={link.href}
                 onClick={() => setIsMobileMenuOpen(false)}
                 className={`text-3xl font-black uppercase tracking-[0.2em] ${
                   isActive(link.href) ? 'text-[#00FF00]' : 'text-zinc-800'
                 }`}
               >
                 {link.name}
               </Link>
             ))}
             <div className="pt-8 w-full border-t border-zinc-100 flex flex-col items-center gap-6">
                <Link
                  href="/wp-admin"
                  className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-black transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Admin Portal
                </Link>
             </div>
           </div>
        </div>
      )}
    </nav>
  );
}

