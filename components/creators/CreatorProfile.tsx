'use client';

import { useState } from 'react';
import { Users, Music, DollarSign, ExternalLink, Heart, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { TrackCard } from '../music/TrackCard';
import { Creator, Track } from '@/lib/types';
import { formatNumber, formatPrice } from '@/lib/utils';
import { mockTracks } from '@/lib/mock-data';
import Image from 'next/image';

interface CreatorProfileProps {
  creator: Creator;
}

export function CreatorProfile({ creator }: CreatorProfileProps) {
  const [isFollowing, setIsFollowing] = useState(false);
  const [activeTab, setActiveTab] = useState<'tracks' | 'about'>('tracks');
  
  // Filter tracks by creator
  const creatorTracks = mockTracks.filter(track => track.creatorId === creator.creatorId);

  return (
    <div className="space-y-6">
      {/* Creator Header */}
      <Card className="overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/20 to-accent/20"></div>
        <CardContent className="relative -mt-16 pb-6">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-surface border-4 border-surface shadow-lg flex items-center justify-center">
                <Music className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <div className="flex-1 mt-4 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-text-primary">Creator Profile</h1>
                  <p className="text-text-secondary">{creator.bio}</p>
                </div>
                
                <div className="flex items-center space-x-3 mt-4 md:mt-0">
                  <Button
                    variant={isFollowing ? 'outline' : 'default'}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFollowing ? 'fill-current' : ''}`} />
                    {isFollowing ? 'Following' : 'Follow'}
                  </Button>
                  
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Followers</p>
                <p className="text-xl font-bold text-text-primary">{formatNumber(creator.followers)}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-accent/20 rounded-lg">
                <Music className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Tracks</p>
                <p className="text-xl font-bold text-text-primary">{creatorTracks.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-text-secondary">Total Earnings</p>
                <p className="text-xl font-bold text-text-primary">{formatPrice(creator.totalEarnings)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/10">
        <nav className="flex space-x-8">
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tracks'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('tracks')}
          >
            Tracks ({creatorTracks.length})
          </button>
          <button
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'about'
                ? 'border-primary text-primary'
                : 'border-transparent text-text-secondary hover:text-text-primary'
            }`}
            onClick={() => setActiveTab('about')}
          >
            About
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'tracks' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {creatorTracks.map((track) => (
            <TrackCard key={track.trackId} track={track} />
          ))}
        </div>
      )}

      {activeTab === 'about' && (
        <Card>
          <CardHeader>
            <CardTitle>About the Artist</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-text-secondary">{creator.bio}</p>
            
            <div className="space-y-2">
              <h4 className="font-medium text-text-primary">Social Links</h4>
              <div className="flex flex-wrap gap-2">
                {creator.socialLinks.map((link, index) => (
                  <Button key={index} variant="outline" size="sm">
                    <ExternalLink className="h-3 w-3 mr-2" />
                    {link}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
