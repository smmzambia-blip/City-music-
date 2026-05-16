import { Upload, Music, Users, Settings, Plus } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | ZedTunes',
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black italic tracking-tighter uppercase">Dashboard Overview</h1>
        <button className="flex items-center gap-2 bg-black text-[#00FF00] px-6 py-3 rounded-full font-black uppercase tracking-widest text-xs hover:bg-zinc-800 transition shadow-lg">
          <Upload className="w-4 h-4" />
          Upload Song
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-3xl flex items-center justify-between shadow-sm">
           <div>
             <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Songs</p>
             <p className="text-4xl font-black italic tracking-tighter">1,248</p>
           </div>
           <div className="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center">
              <Music className="w-7 h-7" />
           </div>
        </div>
        <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-3xl flex items-center justify-between shadow-sm">
           <div>
             <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Streaming Fans</p>
             <p className="text-4xl font-black italic tracking-tighter">45.2K</p>
           </div>
           <div className="w-14 h-14 bg-green-50 text-green-500 rounded-2xl flex items-center justify-center">
              <Users className="w-7 h-7" />
           </div>
        </div>
        <div className="bg-zinc-50 border border-zinc-100 p-8 rounded-3xl flex items-center justify-between shadow-sm">
           <div>
             <p className="text-zinc-400 text-[10px] font-black uppercase tracking-widest mb-2">Total Plays</p>
             <p className="text-4xl font-black italic tracking-tighter">2.4M</p>
           </div>
           <div className="w-14 h-14 bg-purple-50 text-purple-500 rounded-2xl flex items-center justify-center">
              <PlayIcon className="w-7 h-7 ml-1" />
           </div>
        </div>
      </div>

      <div className="bg-zinc-50 border border-zinc-100 rounded-3xl p-8">
         <h2 className="text-lg font-black uppercase tracking-widest mb-8 border-b border-zinc-100 pb-4">Recent Uploads</h2>
         <div className="text-zinc-400 text-center py-20 font-bold uppercase tracking-widest text-xs">No recent uploads.</div>
      </div>
    </div>
  );
}

function PlayIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  );
}
