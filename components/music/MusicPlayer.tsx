'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Track } from '@/lib/types';
import { formatDuration } from '@/lib/utils';
import Image from 'next/image';

interface MusicPlayerProps {
  currentTrack?: Track;
  isPlaying?: boolean;
  onPlay?: () => void;
  onPause?: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
}

export function MusicPlayer({
  currentTrack,
  isPlaying = false,
  onPlay,
  onPause,
  onNext,
  onPrevious
}: MusicPlayerProps) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isLiked, setIsLiked] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [repeatMode, setRepeatMode] = useState<'off' | 'one' | 'all'>('off');
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentTrack]);

  const handlePlayPause = () => {
    if (isPlaying) {
      onPause?.();
    } else {
      onPlay?.();
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!progressRef.current || !audioRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  if (!currentTrack) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-t border-white/10">
      <audio ref={audioRef} src={currentTrack.audioUrl} />
      
      <div className="flex items-center justify-between p-4">
        {/* Track Info */}
        <div className="flex items-center space-x-4 flex-1 min-w-0">
          <Image
            src={currentTrack.coverArtUrl}
            alt={currentTrack.title}
            width={56}
            height={56}
            className="rounded-md"
          />
          <div className="min-w-0">
            <h4 className="text-sm font-medium text-text-primary truncate">{currentTrack.title}</h4>
            <p className="text-xs text-text-secondary truncate">{currentTrack.artistName}</p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className={`h-8 w-8 ${isLiked ? 'text-red-500' : 'text-text-secondary'}`}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
          </Button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center space-y-2 flex-1 max-w-md">
          <div className="flex items-center space-x-4">
            <Button
              size="icon"
              variant="ghost"
              className={`h-8 w-8 ${isShuffled ? 'text-accent' : 'text-text-secondary'}`}
              onClick={() => setIsShuffled(!isShuffled)}
            >
              <Shuffle className="h-4 w-4" />
            </Button>
            
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onPrevious}>
              <SkipBack className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              className="h-10 w-10 rounded-full bg-primary hover:bg-primary/90"
              onClick={handlePlayPause}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>
            
            <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onNext}>
              <SkipForward className="h-4 w-4" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className={`h-8 w-8 ${repeatMode !== 'off' ? 'text-accent' : 'text-text-secondary'}`}
              onClick={() => {
                const modes: Array<'off' | 'one' | 'all'> = ['off', 'one', 'all'];
                const currentIndex = modes.indexOf(repeatMode);
                setRepeatMode(modes[(currentIndex + 1) % modes.length]);
              }}
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center space-x-2 w-full">
            <span className="text-xs text-text-secondary w-10 text-right">
              {formatDuration(Math.floor(currentTime))}
            </span>
            <div
              ref={progressRef}
              className="flex-1 h-1 bg-white/20 rounded-full cursor-pointer"
              onClick={handleProgressClick}
            >
              <div
                className="h-full bg-primary rounded-full transition-all duration-100"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-xs text-text-secondary w-10">
              {formatDuration(Math.floor(duration))}
            </span>
          </div>
        </div>

        {/* Volume Control */}
        <div className="flex items-center space-x-2 flex-1 justify-end">
          <Volume2 className="h-4 w-4 text-text-secondary" />
          <div className="w-20 h-1 bg-white/20 rounded-full">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${volume * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
