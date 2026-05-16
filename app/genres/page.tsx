export const metadata = {
  title: 'Genres',
  description: 'Explore music by genre on ZedTunes.',
};

export default function GenresPage() {
  const genres = ['Afrobeat', 'Hip Hop', 'R&B', 'Pop', 'Gospel', 'Dancehall'];
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Browse Genres</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {genres.map(g => (
          <div key={g} className="bg-white/5 hover:bg-white/10 transition p-6 rounded-2xl flex items-center justify-center min-h-[120px] cursor-pointer">
             <h3 className="text-xl font-bold tracking-tight">{g}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
