import { Upload, Music, Users, Settings, Plus } from 'lucide-react';

export const metadata = {
  title: 'Admin Dashboard | ZedTunes',
};

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <button className="flex items-center gap-2 bg-primary text-black px-4 py-2 rounded-md font-semibold hover:bg-primary/90 transition">
          <Upload className="w-4 h-4" />
          Upload Song
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
           <div>
             <p className="text-white/50 text-sm font-medium mb-1">Total Songs</p>
             <p className="text-3xl font-bold">1,248</p>
           </div>
           <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-full flex items-center justify-center">
              <Music className="w-6 h-6" />
           </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
           <div>
             <p className="text-white/50 text-sm font-medium mb-1">Total Users</p>
             <p className="text-3xl font-bold">45.2K</p>
           </div>
           <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6" />
           </div>
        </div>
        <div className="bg-white/5 border border-white/10 p-6 rounded-2xl flex items-center justify-between">
           <div>
             <p className="text-white/50 text-sm font-medium mb-1">Total Plays</p>
             <p className="text-3xl font-bold">2.4M</p>
           </div>
           <div className="w-12 h-12 bg-purple-500/10 text-purple-500 rounded-full flex items-center justify-center">
              <PlayIcon className="w-6 h-6 ml-1" />
           </div>
        </div>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
         <h2 className="text-xl font-bold mb-6">Recent Uploads</h2>
         <div className="text-white/50 text-center py-10">No recent uploads.</div>
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
