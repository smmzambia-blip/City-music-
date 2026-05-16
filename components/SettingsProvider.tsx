'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface AppSettings {
  primaryColor: string;
  siteTitle: string;
  tagline: string;
}

const defaultSettings: AppSettings = {
  primaryColor: '#00FF00',
  siteTitle: 'ZedTunes',
  tagline: "Zambia's Pure Music Experience",
};

const SettingsContext = createContext<AppSettings>(defaultSettings);

export const useSettings = () => useContext(SettingsContext);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AppSettings>(defaultSettings);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const unsub = onSnapshot(doc(db, 'settings', 'general'), (snap) => {
      if (snap.exists()) {
        setSettings((prev) => ({ ...prev, ...snap.data() }));
      }
    }, (err) => {
      console.error("Settings error:", err);
    });
    return () => unsub();
  }, []);

  return (
    <SettingsContext.Provider value={settings}>
      {mounted && (
        <style dangerouslySetInnerHTML={{__html: `
          :root {
            --color-primary: ${settings.primaryColor};
          }
        `}} />
      )}
      {children}
    </SettingsContext.Provider>
  );
}
