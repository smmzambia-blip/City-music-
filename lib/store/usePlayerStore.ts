'use client';

import { create } from 'zustand';

interface Song {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  audioUrl: string;
}

interface PlayerStore {
  currentSong: Song | null;
  isPlaying: boolean;
  playSong: (song: Song) => void;
  togglePlay: () => void;
  pause: () => void;
}

export const usePlayerStore = create<PlayerStore>((set) => ({
  currentSong: null,
  isPlaying: false,
  playSong: (song) => set({ currentSong: song, isPlaying: true }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  pause: () => set({ isPlaying: false }),
}));
