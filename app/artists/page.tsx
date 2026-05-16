export const metadata = {
  title: 'Artists',
  description: 'Browse all artists on ZedTunes.',
};

export default function ArtistsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Featured Artists</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {/* Placeholder for artists */}
        {[1,2,3,4,5].map(i => (
          <div key={i} className="flex flex-col items-center gap-3 group cursor-pointer">
             <div className="w-full aspect-square rounded-full bg-white/5 overflow-hidden">
                <img src={`https://images.unsplash.com/photo-1542204165-65bf26472b9b?auto=format&fit=crop&q=80&w=300&h=300`} className="w-full h-full object-cover group-hover:scale-105 transition" />
             </div>
             <span className="font-semibold text-white/90">Artist Name {i}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
