'use client';

import { ReactNode } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { MusicPlayer } from '../music/MusicPlayer';

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
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
      <MusicPlayer />
    </div>
  );
}
