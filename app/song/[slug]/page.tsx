import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PlayButton from './PlayButton';
import { Download, Heart, Share2, MessageCircle, FileText } from 'lucide-react';
import { db } from '../../../lib/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';

const getSong = async (slug: string) => {
  try {
    const q = query(collection(db, 'songs'), where('slug', '==', slug), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      return null;
    }
    
    const docSnap = querySnapshot.docs[0];
    const data = docSnap.data();
    
    return {
      id: docSnap.id,
      slug: data.slug,
      title: data.title,
      artist: data.artist,
      coverImage: data.coverImage,
      audioUrl: data.audioUrl,
      genre: data.genre || 'Unknown Genre',
      releaseDate: data.createdAt?.toDate?.()?.toISOString() || new Date().toISOString(),
      viewCount: data.plays || 0,
      downloadCount: 0,
      description: data.description || '',
    };
  } catch (error) {
    console.error("Error fetching song:", error);
    return null;
  }
};

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const song = await getSong(params.slug);
  if (!song) return {};

  return {
    title: `${song.title} by ${song.artist}`,
    description: `Listen to and download ${song.title} by ${song.artist} on ZedTunes.`,
    openGraph: {
        title: `${song.title} by ${song.artist} - ZedTunes`,
        description: `Listen to and download ${song.title} by ${song.artist} on ZedTunes.`,
        images: [{ url: song.coverImage }],
    }
  }
}

export default async function SongPage({ params }: { params: { slug: string } }) {
  const song = await getSong(params.slug);

  if (!song) {
    notFound();
  }

  // Ensure SSR HTML matches request constraints
  return (
    <article className="max-w-4xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-80 flex-shrink-0">
          <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl bg-white/5">
             <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex-1 flex flex-col pt-2">
          <div className="mb-2 text-sm font-medium text-primary uppercase tracking-wider">{song.genre}</div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2">{song.title}</h1>
          <h2 className="text-2xl text-white/60 mb-6">{song.artist}</h2>

          <div className="flex flex-wrap items-center gap-4 mb-8">
             <PlayButton song={song} />
             <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-medium transition cursor-pointer">
                <Download className="w-5 h-5" />
                Download ({song.downloadCount.toLocaleString()})
             </button>
          </div>

          <div className="flex items-center gap-6 text-white/50 text-sm border-t border-white/10 pt-6">
            <span className="flex flex-col items-start gap-1">
              <span className="text-white/30 text-xs">Released</span>
              {new Date(song.releaseDate).toLocaleDateString()}
            </span>
            <span className="flex flex-col items-start gap-1">
               <span className="text-white/30 text-xs">Plays</span>
               {song.viewCount.toLocaleString()}
            </span>
            <div className="flex-1 flex justify-end gap-3">
               <button className="p-2 bg-white/5 rounded-full hover:text-white transition"><Heart className="w-5 h-5" /></button>
               <button className="p-2 bg-white/5 rounded-full hover:text-white transition"><Share2 className="w-5 h-5" /></button>
            </div>
          </div>
        </div>
      </div>

      {song.description && (
        <section className="bg-white/5 rounded-2xl p-6 md:p-10 font-mono">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><FileText className="w-5 h-5" /> Description</h3>
            <div className="whitespace-pre-wrap text-white/70 leading-relaxed text-sm md:text-base">
                {song.description}
            </div>
        </section>
      )}
    </article>
  );
}
