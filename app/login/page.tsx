import Link from 'next/link';

export const metadata = { title: 'Login | ZedTunes' };

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto pt-10">
      <h1 className="text-3xl font-bold text-center mb-6">Login to ZedTunes</h1>
      <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
        <button className="w-full bg-white text-black font-semibold py-3 rounded-full hover:bg-white/90 transition">
          Sign In with Google
        </button>
        <div className="text-center text-white/50 text-sm">
           By signing in, you agree to our <Link href="/terms" className="underline">Terms</Link>
        </div>
      </div>
    </div>
  );
}
