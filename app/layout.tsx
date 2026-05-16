import type { Metadata } from 'next';
import './globals.css';
import { PlayerProvider } from '@/components/PlayerProvider';
import Navbar from '@/components/Navbar';
import BottomPlayer from '@/components/BottomPlayer';
import Footer from '@/components/Footer';

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
    <html lang="en">
      <body className="bg-white text-black font-sans min-h-screen flex flex-col relative pb-32">
        <PlayerProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            {children}
          </main>
          <Footer />
          <BottomPlayer />
        </PlayerProvider>
      </body>
    </html>
  );
}
