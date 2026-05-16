'use client';

import { usePlayerStore } from '@/lib/store/usePlayerStore';
import { Play, Pause, SkipForward, SkipBack, Volume2, Plus, Download } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function BottomPlayer() {
  const { currentSong, isPlaying, togglePlay } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSong]);

  if (!currentSong) return null;

  return (
    <footer className="h-24 bg-white border-t border-zinc-100 px-6 flex items-center justify-between fixed bottom-0 left-0 right-0 z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.05)]">
      <audio ref={audioRef} src={currentSong.audioUrl} onEnded={() => togglePlay()} />
      
      {/* Song Info */}
      <div className="flex items-center gap-4 w-72">
        <div className="w-14 h-14 bg-zinc-100 rounded-lg overflow-hidden flex-shrink-0 relative shadow-sm border border-zinc-50">
          <img src={currentSong.coverImage} alt={currentSong.title} className="object-cover w-full h-full" />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-black truncate text-black">{currentSong.title}</p>
          <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider truncate">{currentSong.artist}</p>
        </div>
        <button className="text-zinc-300 hover:text-[#00FF00] ml-2 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 max-w-xl w-full hidden md:flex px-8">
        <div className="flex items-center gap-8">
          <button className="text-zinc-300 hover:text-black transition-colors"><SkipBack className="w-5 h-5 fill-current" /></button>
          <button 
            onClick={togglePlay}
            className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-[#00FF00] hover:scale-110 transition-transform shadow-lg active:scale-95"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
          <button className="text-zinc-300 hover:text-black transition-colors"><SkipForward className="w-5 h-5 fill-current" /></button>
        </div>
        <div className="flex items-center gap-4 w-full">
          <span className="text-[10px] font-bold text-zinc-300 w-10 text-right">0:00</span>
          <div className="flex-1 h-1.5 bg-zinc-100 rounded-full overflow-hidden relative cursor-pointer">
             <div className="absolute top-0 left-0 h-full bg-[#00FF00] w-1/3 rounded-full shadow-[0_0_8px_rgba(0,255,0,0.5)]"></div>
          </div>
          <span className="text-[10px] font-bold text-zinc-300 w-10">3:45</span>
        </div>
      </div>

      {/* Volume/Actions */}
      <div className="flex items-center gap-6 w-72 justify-end hidden sm:flex">
        <div className="flex items-center gap-3">
          <Volume2 className="w-4 h-4 text-zinc-300" />
          <div className="w-20 h-1 bg-zinc-100 rounded-full overflow-hidden cursor-pointer">
               <div className="h-full bg-black w-2/3"></div>
          </div>
        </div>
        <button className="bg-black text-[#00FF00] px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-colors shadow-sm flex items-center gap-2">
          <Download className="w-3 h-3" />
          Get MP3
        </button>
      </div>
    </footer>
  );
}

