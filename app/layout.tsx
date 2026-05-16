import type { Metadata } from 'next';
import './globals.css';
import { PlayerProvider } from '@/components/PlayerProvider';
import Navbar from '@/components/Navbar';
import Header from '@/components/Header';
import BottomPlayer from '@/components/BottomPlayer';

export const metadata: Metadata = {
  title: {
    default: 'ZedTunes | Modern Music Streaming Platform',
    template: '%s | ZedTunes',
  },
  description: 'The fastest modern SEO-optimized music platform in Zambia.',
  openGraph: {
    title: 'ZedTunes',
    description: 'Listen to the best new music, trending songs, and top artists.',
    url: 'https://zedtunes.com',
    siteName: 'ZedTunes',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#0A0A0A] text-white font-sans overflow-hidden h-screen flex flex-col">
        <PlayerProvider>
          <div className="flex flex-1 overflow-hidden pb-24">
            <Navbar />
            <main className="flex-1 flex flex-col overflow-auto relative bg-[#0A0A0A]">
              <Header />
              <div className="flex-1 p-8 overflow-x-hidden">
                {children}
              </div>
            </main>
          </div>
          <BottomPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
