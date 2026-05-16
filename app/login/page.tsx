import Link from 'next/link';

export const metadata = { title: 'Admin Login | ZedTunes' };

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto pt-20 pb-40">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-[#00FF00] font-black italic underline text-2xl mx-auto mb-4">Z</div>
        <h1 className="text-3xl font-black tracking-tighter italic">ADMIN LOGIN</h1>
        <p className="text-zinc-500 text-sm mt-2 font-bold uppercase tracking-widest">Authorized Access Only</p>
      </div>
      
      <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-100 shadow-xl space-y-6">
        <button className="w-full bg-black text-[#00FF00] font-black py-4 rounded-full hover:bg-zinc-800 transition shadow-lg uppercase tracking-widest text-xs">
          Sign In with Admin Google Account
        </button>
        <div className="text-center text-zinc-400 text-[10px] font-bold uppercase tracking-widest leading-relaxed">
           By signing in, you access the management dashboard. <br/>All actions are logged.
        </div>
      </div>
      <div className="mt-8 text-center">
        <Link href="/" className="text-xs font-bold text-zinc-400 hover:text-black transition-colors uppercase tracking-widest">
           Back to Music
        </Link>
      </div>
    </div>
  );
}
