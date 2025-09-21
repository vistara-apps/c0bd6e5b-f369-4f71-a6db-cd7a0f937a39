'use client';

import { Home, Compass, Heart, Music, User, TrendingUp, Radio } from 'lucide-react';
import { Button } from '../ui/Button';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const navigation = [
  { name: 'Home', icon: Home, href: '/', current: true },
  { name: 'Discover', icon: Compass, href: '/discover', current: false },
  { name: 'Trending', icon: TrendingUp, href: '/trending', current: false },
  { name: 'Radio', icon: Radio, href: '/radio', current: false },
  { name: 'Liked', icon: Heart, href: '/liked', current: false },
  { name: 'Playlists', icon: Music, href: '/playlists', current: false },
  { name: 'Profile', icon: User, href: '/profile', current: false },
];

export function Sidebar() {
  const [currentPath, setCurrentPath] = useState('/');

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto bg-surface/30 backdrop-blur-sm border-r border-white/10">
        <nav className="mt-5 flex-1 px-4 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive = currentPath === item.href;
            
            return (
              <Button
                key={item.name}
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start text-left',
                  isActive 
                    ? 'bg-primary text-white' 
                    : 'text-text-secondary hover:text-text-primary hover:bg-surface/50'
                )}
                onClick={() => setCurrentPath(item.href)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="px-4 py-4 border-t border-white/10">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Tracks Owned</span>
              <span className="text-text-primary font-medium">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-text-secondary">Total Spent</span>
              <span className="text-accent font-medium">0.45 ETH</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
