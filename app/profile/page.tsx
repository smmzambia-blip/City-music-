export const metadata = { title: 'Profile | ZedTunes' };

export default function ProfilePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-6">
         <div className="w-24 h-24 rounded-full bg-white/10"></div>
         <div>
            <h1 className="text-3xl font-bold">User Profile</h1>
            <p className="text-white/50">user@example.com</p>
         </div>
      </div>
    </div>
  );
}
