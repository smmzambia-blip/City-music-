'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { auth, db } from '../../lib/firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default function WPAdminClient() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Special rule: hilzmg70@gmail.com is auto admin.
      // Also we check if they are explicitly in the admins collection.
      const isAdminEmail = user.email === 'hilzmg70@gmail.com';
      
      let isAdmin = isAdminEmail;
      
      if (!isAdmin) {
        const adminDoc = await getDoc(doc(db, 'admins', user.uid));
        isAdmin = adminDoc.exists();
      } else {
        // Automatically add them to the admins collection if they are the bootstrap admin
        // so they show up in dashboards if necessary
        try {
          const adminDoc = await getDoc(doc(db, 'admins', user.uid));
          if (!adminDoc.exists()) {
            await setDoc(doc(db, 'admins', user.uid), {
              email: user.email,
              role: 'admin'
            });
          }
        } catch (e) {
          console.error('Failed to create admin record, but logging in anyway due to rules', e);
        }
      }

      if (isAdmin) {
        router.push('/admin');
      } else {
        auth.signOut();
        setError('Unauthorized access. Admin privileges required.');
      }
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#f0f0f1] min-h-[80vh] flex flex-col items-center justify-center p-4 -mt-10 mb-[-10rem] z-50 relative">
      <div className="w-full max-w-[320px]">
        {/* WP Logo Replacement / ZedTunes Logo */}
        <div className="flex justify-center mb-6">
          <Link href="/" className="flex items-center gap-2 group mx-auto">
            <div className="relative flex items-center justify-center w-16 h-16 shadow-lg rounded-full bg-white">
              <div className="absolute inset-1 bg-black rounded-full flex items-center justify-center">
                 <svg className="w-8 h-8 text-[var(--color-primary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3zm12-3c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"/></svg>
              </div>
            </div>
          </Link>
        </div>

        {/* WP Login Box */}
        <div className="bg-white border border-[#c3c4c7] shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
          <div className="space-y-4">
            {error && (
              <div className="bg-[#fcf0f1] border-l-4 border-[#d63638] p-3 text-[13px] text-[#3c434a]">
                {error}
              </div>
            )}
            <div className="text-center text-[#3c434a] text-[13px] mb-4">
               Please authenticate with your secure provider to access the dashboard.
            </div>
            
            <button 
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-[#2271b1] text-white border border-[#2271b1] hover:bg-[#135e96] hover:border-[#135e96] px-4 py-2.5 rounded-sm font-medium text-[14px] shadow-sm transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? 'Authenticating...' : 'Sign in with Google'}
            </button>
          </div>
        </div>

        {/* Links below */}
        <div className="mt-4 px-2 space-y-2 text-[13px]">
          <Link href="/" className="block text-[#2271b1] hover:text-[#0a4b78] hover:underline flex items-center gap-1">
            <span>&larr;</span> Go to ZedTunes
          </Link>
        </div>
      </div>
    </div>
  );
}
