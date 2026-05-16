export default function TrendingPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trending Now</h1>
      <p className="text-white/50">The most played songs this week.</p>
      {/* List implementation similar to homepage but block layout */}
      <div className="space-y-4 pt-4">
        {[1,2,3,4,5,6,7,8,9,10].map(i => (
           <div key={i} className="flex items-center gap-4 bg-white/5 p-4 rounded-xl hover:bg-white/10 transition group cursor-pointer">
              <span className="w-6 text-center text-white/50 font-medium">{i}</span>
              <div className="w-12 h-12 rounded bg-white/10"></div>
              <div className="flex-1">
                 <h3 className="font-semibold text-white/90">Trending Track {i}</h3>
                 <p className="text-sm text-white/50">Popular Artist</p>
              </div>
              <div className="text-white/50 text-sm hidden sm:block">2,4{i}5,000 plays</div>
           </div>
        ))}
      </div>
    </div>
  );
}
