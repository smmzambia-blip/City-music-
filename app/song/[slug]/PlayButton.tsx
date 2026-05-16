'use client';

import { usePlayerStore } from '@/lib/store/usePlayerStore';
import { Play } from 'lucide-react';

export default function PlayButton({ song }: { song: any }) {
  const { playSong } = usePlayerStore();

  return (
    <button 
      onClick={() => playSong(song)}
      className="flex items-center justify-center gap-2 px-8 py-3 bg-primary text-black rounded-full font-bold hover:scale-105 transition"
    >
      <Play className="w-5 h-5 fill-current ml-1" />
      Play Now
    </button>
  );
}
