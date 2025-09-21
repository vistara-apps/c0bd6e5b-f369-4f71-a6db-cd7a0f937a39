'use client';

import { useState } from 'react';
import { Plus, Play, MoreHorizontal, Lock, Globe } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Playlist } from '@/lib/types';
import { mockPlaylists } from '@/lib/mock-data';
import Image from 'next/image';

interface PlaylistsProps {
  playlists?: Playlist[];
}

export function Playlists({ playlists = mockPlaylists }: PlaylistsProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-text-primary">My Playlists</h2>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Playlist
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {playlists.map((playlist) => (
          <Card
            key={playlist.playlistId}
            className="group cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => setSelectedPlaylist(playlist)}
          >
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg overflow-hidden">
                {playlist.coverArt ? (
                  <Image
                    src={playlist.coverArt}
                    alt={playlist.name}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-6xl opacity-50">🎵</div>
                  </div>
                )}

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button size="icon" className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90">
                    <Play className="h-6 w-6 ml-1" />
                  </Button>
                </div>

                {/* Privacy Indicator */}
                <div className="absolute top-3 right-3">
                  {playlist.isPublic ? (
                    <Globe className="h-5 w-5 text-white/80" />
                  ) : (
                    <Lock className="h-5 w-5 text-white/80" />
                  )}
                </div>
              </div>
            </div>

            <CardContent className="p-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-text-primary truncate">{playlist.name}</h3>
                <p className="text-sm text-text-secondary line-clamp-2">{playlist.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-secondary">
                    {playlist.trackIds.length} tracks
                  </span>
                  <Button size="icon" variant="ghost" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty State */}
      {playlists.length === 0 && (
        <Card className="p-12 text-center">
          <div className="space-y-4">
            <div className="text-6xl opacity-50">🎵</div>
            <h3 className="text-xl font-semibold text-text-primary">No playlists yet</h3>
            <p className="text-text-secondary">Create your first playlist to start organizing your favorite tracks.</p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Your First Playlist
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}

