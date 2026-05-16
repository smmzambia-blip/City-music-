import Link from 'next/link';
import { Lock } from 'lucide-react';

export const metadata = { title: 'Log In &lsaquo; ZedTunes &#8212; WordPress' };

export default function WPAdminPage() {
  return (
    <div className="bg-[#f0f0f1] min-h-[80vh] flex flex-col items-center justify-center p-4 -mt-10 mb-[-10rem] z-50 relative">
      <div className="w-full max-w-[320px]">
        {/* WP Logo Replacement / ZedTunes Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2 group mx-auto">
            <div className="relative flex items-center justify-center w-16 h-16 shadow-lg rounded-full bg-white">
              <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                 <svg className="w-8 h-8 text-[#00FF00]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm12-3c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
              </div>
            </div>
          </Link>
        </div>

        {/* WP Login Box */}
        <div className="bg-white border border-[#c3c4c7] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
          <form className="space-y-4">
            <div>
              <label className="block text-sm text-[#3c434a] mb-2">Username or Email Address</label>
              <input 
                type="text" 
                className="w-full border border-[#8c8f94] bg-white px-3 py-2 text-xl rounded-sm focus:border-[#2271b1] focus:ring-[1px] focus:ring-[#2271b1] outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.07)]"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm text-[#3c434a]">Password</label>
              </div>
              <div className="relative">
                <input 
                  type="password" 
                  className="w-full border border-[#8c8f94] bg-white px-3 py-2 text-xl rounded-sm focus:border-[#2271b1] focus:ring-[1px] focus:ring-[#2271b1] outline-none transition-all shadow-[inset_0_1px_2px_rgba(0,0,0,0.07)]"
                />
                <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 p-1 border border-[#2271b1] rounded-sm text-[#2271b1] bg-[#f6f7f7] hover:bg-[#f0f0f1] text-[13px] hidden">
                  <Lock className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 border-[#8c8f94] rounded-sm text-[#2271b1] focus:ring-[#2271b1]" />
                <span className="text-sm text-[#3c434a]">Remember Me</span>
              </label>
              <button 
                type="button" 
                className="bg-[#2271b1] text-white border border-[#2271b1] hover:bg-[#135e96] hover:border-[#135e96] px-4 py-1.5 rounded-sm font-medium text-[13px] shadow-sm transition-colors cursor-pointer"
              >
                Log In
              </button>
            </div>
          </form>
        </div>

        {/* Links below */}
        <div className="mt-4 px-2 space-y-2 text-[13px]">
          <a href="#" className="block text-[#2271b1] hover:text-[#0a4b78] hover:underline">Lost your password?</a>
          <Link href="/" className="block text-[#2271b1] hover:text-[#0a4b78] hover:underline flex items-center gap-1">
            <span>&larr;</span> Go to ZedTunes
          </Link>
        </div>
      </div>
    </div>
  );
}
