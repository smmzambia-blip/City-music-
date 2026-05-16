import Link from 'next/link';

export const FooterLogo = () => (
  <div className="flex items-center gap-3 group">
    <div className="relative flex items-center justify-center w-12 h-12">
      <div className="absolute inset-0 bg-[#00FF00] rounded-br-[1.2rem] rounded-tl-[1.2rem] transform group-hover:rotate-180 transition-transform duration-700"></div>
      <div className="absolute inset-1 bg-black rounded-br-lg rounded-tl-lg flex items-center justify-center">
         <svg className="w-5 h-5 text-[#00FF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm12-3c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
      </div>
    </div>
    <div className="flex flex-col">
      <span className="text-3xl font-black tracking-tighter leading-none text-white">
        ZED<span className="text-zinc-500">TUNES</span>
      </span>
      <span className="text-[9px] font-black tracking-[0.4em] text-[#00FF00] uppercase pt-1">Zambia's Pure Music</span>
    </div>
  </div>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-24 pb-36 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 border-b border-zinc-800 pb-16">
          
          <div className="md:col-span-12 lg:col-span-5 space-y-6">
            <FooterLogo />
            <p className="text-zinc-400 text-sm max-w-sm leading-relaxed">
              Zambia's premier digital music destination. Discover, stream, and download the latest hits from across the country in high fidelity.
            </p>
            <div className="pt-4 flex gap-4">
               {/* Example social circle icons */}
               <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-[#00FF00] hover:text-[#00FF00] transition-colors"><span className="sr-only">Twitter</span><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
               <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-[#00FF00] hover:text-[#00FF00] transition-colors"><span className="sr-only">Facebook</span><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg></a>
               <a href="#" className="w-10 h-10 rounded-full border border-zinc-800 flex items-center justify-center text-zinc-400 hover:border-[#00FF00] hover:text-[#00FF00] transition-colors"><span className="sr-only">Instagram</span><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"/></svg></a>
            </div>
          </div>
          
          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Music</h4>
            <ul className="space-y-3 text-sm font-medium text-zinc-300">
              <li><Link href="/trending" className="hover:text-[#00FF00] hover:translate-x-1 transition-all inline-block">Trending</Link></li>
              <li><Link href="/" className="hover:text-[#00FF00] hover:translate-x-1 transition-all inline-block">Latest Hits</Link></li>
              <li><Link href="/artists" className="hover:text-[#00FF00] hover:translate-x-1 transition-all inline-block">Artists</Link></li>
              <li><Link href="/albums" className="hover:text-[#00FF00] hover:translate-x-1 transition-all inline-block">Albums</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Company</h4>
            <ul className="space-y-3 text-sm font-medium text-zinc-300">
              <li><Link href="/about" className="hover:text-[#00FF00] hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-[#00FF00] hover:translate-x-1 transition-all inline-block">Contact</Link></li>
              <li><Link href="/privacy" className="hover:text-[#00FF00] hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
              <li><Link href="/dmca" className="hover:text-[#00FF00] hover:translate-x-1 transition-all inline-block">DMCA Takedown</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Admin</h4>
            <p className="text-sm text-zinc-400 mb-4 line-clamp-2">Got new tracks to distribute? Access the CMS using the secure portal.</p>
            <Link href="/wp-admin" className="inline-block bg-zinc-900 border border-zinc-800 text-zinc-300 px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all transform active:scale-95">
              Portal Login
            </Link>
          </div>

        </div>
        
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest">© {new Date().getFullYear()} ZedTunes. All Rights Reserved.</p>
          <div className="text-xs font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
            Designed for <span className="text-zinc-500 inline-block">Zambia</span> <span className="inline-block w-2 h-2 rounded-full bg-[#00FF00] ml-1"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
