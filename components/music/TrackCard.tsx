'use client';

import { useState } from 'react';
import { Play, Pause, Heart, Share2, MoreHorizontal, Zap } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent } from '../ui/Card';
import { Track } from '@/lib/types';
import { formatPrice, formatNumber } from '@/lib/utils';
import Image from 'next/image';
import { TipModal } from './TipModal';
import { useMusic } from '@/lib/MusicContext';

interface TrackCardProps {
  track: Track;
  variant?: 'default' | 'compact';
}

export function TrackCard({
  track,
  variant = 'default'
}: TrackCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [showTipModal, setShowTipModal] = useState(false);
  const { currentTrack, isPlaying, playTrack, pauseTrack } = useMusic();

  const handlePlayPause = () => {
    if (isPlaying && currentTrack?.trackId === track.trackId) {
      pauseTrack();
    } else {
      playTrack(track);
    }
  };

  if (variant === 'compact') {
    return (
      <Card className="p-4 hover:bg-surface/70 transition-colors cursor-pointer">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={track.coverArtUrl}
              alt={track.title}
              width={48}
              height={48}
              className="rounded-md"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute inset-0 bg-black/50 hover:bg-black/70 text-white opacity-0 hover:opacity-100 transition-opacity"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
          </div>
          
          <div className="flex-1 min-w-0">
            <h4 className="text-sm font-medium text-text-primary truncate">{track.title}</h4>
            <p className="text-xs text-text-secondary truncate">{track.artistName}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs text-accent font-medium">{formatPrice(track.currentPrice)}</span>
            <Button size="icon" variant="ghost" className="h-8 w-8">
              <MoreHorizontal className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
        <div className="relative">
          <Image
            src={track.coverArtUrl}
            alt={track.title}
            width={300}
            height={300}
            className="w-full aspect-square object-cover"
          />
          
          {/* Play Button Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Button
              size="icon"
              className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 text-white shadow-lg"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6 ml-1" />}
            </Button>
          </div>

          {/* Genre Badge */}
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 text-xs font-medium bg-black/50 text-white rounded-full backdrop-blur-sm">
              {track.genre}
            </span>
          </div>

          {/* Price Badge */}
          <div className="absolute top-3 right-3">
            <span className="px-2 py-1 text-xs font-medium bg-accent text-white rounded-full">
              {formatPrice(track.currentPrice)}
            </span>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-text-primary truncate">{track.title}</h3>
              <p className="text-sm text-text-secondary truncate">{track.artistName}</p>
            </div>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>{formatNumber(track.plays)} plays</span>
              <span>{track.duration}</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className={`h-8 w-8 ${isLiked ? 'text-red-500' : 'text-text-secondary'}`}
                  onClick={() => setIsLiked(!isLiked)}
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <span className="text-xs text-text-secondary">{formatNumber(track.likes)}</span>
              </div>

              <div className="flex items-center space-x-1">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 px-3 text-xs"
                  onClick={() => setShowTipModal(true)}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Tip
                </Button>
                
                <Button size="icon" variant="ghost" className="h-8 w-8">
                  <Share2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <TipModal
        isOpen={showTipModal}
        onClose={() => setShowTipModal(false)}
        track={track}
      />
    </>
  );
}
