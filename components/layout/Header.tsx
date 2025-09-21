'use client';

import { useState } from 'react';
import { Search, Bell, Menu, User } from 'lucide-react';
import { Button } from '../ui/Button';
import { mockUser } from '@/lib/mock-data';
import Image from 'next/image';

export function Header() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-surface/80 backdrop-blur-md">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <span className="text-white font-bold text-sm">T</span>
            </div>
            <span className="text-xl font-bold text-text-primary">TuneSphere</span>
          </div>
        </div>

        {/* Search */}
        <div className="flex-1 max-w-md mx-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
            <input
              type="text"
              placeholder="Search tracks, artists, playlists..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-bg/50 border border-white/20 rounded-lg text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
          </Button>
          
          <div className="flex items-center space-x-2">
            <Image
              src={mockUser.profilePicUrl}
              alt={mockUser.displayName}
              width={32}
              height={32}
              className="rounded-full"
            />
            <span className="hidden md:block text-sm text-text-primary">{mockUser.displayName}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
