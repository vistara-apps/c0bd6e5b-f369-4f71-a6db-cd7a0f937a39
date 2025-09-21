'use client';

import { useState } from 'react';
import { TrackCard } from './TrackCard';
import { Track } from '@/lib/types';
import { mockTracks } from '@/lib/mock-data';

interface MusicFeedProps {
  tracks?: Track[];
}

export function MusicFeed({ tracks = mockTracks }: MusicFeedProps) {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">Trending Tracks</h2>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-text-secondary">Sort by:</span>
          <select className="bg-surface border border-white/20 rounded-md px-3 py-1 text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary">
            <option>Most Popular</option>
            <option>Newest</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {tracks.map((track) => (
          <TrackCard
            key={track.trackId}
            track={track}
            isPlaying={isPlaying && currentTrack?.trackId === track.trackId}
            onPlay={handlePlay}
            onPause={handlePause}
          />
        ))}
      </div>
    </div>
  );
}
