import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 py-12 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2">
          <Link href="/" className="text-2xl font-black text-black italic underline tracking-tighter decoration-[#00FF00]">
            ZEDTUNES
          </Link>
          <p className="mt-4 text-zinc-500 text-sm max-w-xs">
            Zambia's premier music destination. Discover, stream, and download the latest hits from across the country.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Platform</h4>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li><Link href="/genres" className="hover:text-black">Genres</Link></li>
            <li><Link href="/trending" className="hover:text-black">Trending</Link></li>
            <li><Link href="/artists" className="hover:text-black">Artists</Link></li>
            <li><Link href="/albums" className="hover:text-black">Albums</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Support</h4>
          <ul className="space-y-2 text-sm text-zinc-600">
            <li><Link href="/about" className="hover:text-black">About</Link></li>
            <li><Link href="/privacy" className="hover:text-black">Privacy</Link></li>
            <li><Link href="/dmca" className="hover:text-black">DMCA</Link></li>
            <li><Link href="/login" className="hover:text-black">Account</Link></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-zinc-400">© 2026 ZedTunes. Built for the culture.</p>
        <div className="flex gap-6">
          {/* Social links placeholder */}
        </div>
      </div>
    </footer>
  );
}
