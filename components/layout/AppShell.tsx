'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MusicPlayer } from '../music/MusicPlayer';
import { useMusic } from '@/lib/MusicContext';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { currentTrack, isPlaying, playTrack, pauseTrack, nextTrack, previousTrack } = useMusic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-bg via-surface to-bg">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6 pb-24">
          <div className="max-w-4xl mx-auto">
            {children}
          </div>
        </main>
      </div>
      <MusicPlayer
        currentTrack={currentTrack}
        isPlaying={isPlaying}
        onPlay={playTrack}
        onPause={pauseTrack}
        onNext={nextTrack}
        onPrevious={previousTrack}
      />
    </div>
  );
}
