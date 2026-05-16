'use client';

import { usePlayerStore } from '@/lib/store/usePlayerStore';
import { Play, Pause, SkipForward, SkipBack, Volume2, Plus } from 'lucide-react';
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
    <footer className="h-24 bg-black border-t border-white/10 px-6 flex items-center justify-between fixed bottom-0 left-0 right-0 z-50">
      <audio ref={audioRef} src={currentSong.audioUrl} onEnded={() => togglePlay()} />
      
      {/* Song Info */}
      <div className="flex items-center gap-4 w-72">
        <div className="w-14 h-14 bg-[#222] rounded-md overflow-hidden flex-shrink-0 relative">
          <img src={currentSong.coverImage} alt={currentSong.title} className="object-cover w-full h-full" />
        </div>
        <div className="overflow-hidden">
          <p className="text-sm font-bold truncate">{currentSong.title}</p>
          <p className="text-xs text-white/40 truncate">{currentSong.artist}</p>
        </div>
        <button className="text-white/40 hover:text-[#00FF00] ml-2 transition-colors">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex flex-col items-center gap-2 max-w-xl w-full hidden md:flex">
        <div className="flex items-center gap-6">
          <button className="text-white/40 hover:text-white transition-colors"><SkipBack className="w-5 h-5 fill-current" /></button>
          <button 
            onClick={togglePlay}
            className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-6 h-6 fill-current ml-1" />}
          </button>
          <button className="text-white/40 hover:text-white transition-colors"><SkipForward className="w-5 h-5 fill-current" /></button>
        </div>
        <div className="flex items-center gap-3 w-full">
          <span className="text-[10px] font-medium text-white/40 w-8 text-right">0:00</span>
          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden relative cursor-pointer">
             <div className="absolute top-0 left-0 h-full bg-[#00FF00] w-1/3"></div>
          </div>
          <span className="text-[10px] font-medium text-white/40 w-8">3:45</span>
        </div>
      </div>

      {/* Volume/Actions */}
      <div className="flex items-center gap-4 w-72 justify-end hidden sm:flex">
        <Volume2 className="w-5 h-5 text-white/40" />
         <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer">
             <div className="h-full bg-white w-2/3"></div>
          </div>
          <button className="bg-[#00FF00] text-black px-4 py-1.5 rounded text-[10px] font-black uppercase tracking-wider hover:bg-white transition-colors">
            Download
          </button>
      </div>
    </footer>
  );
}

