'use client';

import { AppShell } from '@/components/layout/AppShell';
import { MusicFeed } from '@/components/music/MusicFeed';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Sparkles, TrendingUp, Music } from 'lucide-react';
import { mockTracks } from '@/lib/mock-data';

export default function HomePage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 p-8">
          <div className="relative z-10">
            <div className="flex items-center space-x-2 mb-4">
              <Sparkles className="h-6 w-6 text-accent" />
              <span className="text-sm font-medium text-accent">Welcome to TuneSphere</span>
            </div>
            <h1 className="text-4xl font-bold text-text-primary mb-4">
              Discover, Share, and Monetize Music
            </h1>
            <p className="text-lg text-text-secondary mb-6 max-w-2xl">
              Join the community-driven music platform on Base where creators and fans connect through dynamic pricing and social interaction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90">
                <Music className="h-5 w-5 mr-2" />
                Start Listening
              </Button>
              <Button size="lg" variant="outline">
                <TrendingUp className="h-5 w-5 mr-2" />
                Explore Trending
              </Button>
            </div>
          </div>
          
          {/* Floating Elements */}
          <div className="absolute top-4 right-4 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
          <div className="absolute bottom-8 right-12 w-12 h-12 bg-accent/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 right-8 w-16 h-16 bg-primary/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Featured Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <span>Trending Now</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-bg/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
                    <span className="text-sm text-text-primary">Electronic music is gaining momentum</span>
                  </div>
                  <span className="text-xs text-accent">+24%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                    <span className="text-sm text-text-primary">New creators joining daily</span>
                  </div>
                  <span className="text-xs text-primary">+18%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-bg/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-text-primary">Community tips increasing</span>
                  </div>
                  <span className="text-xs text-green-500">+31%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Music className="h-4 w-4 mr-2" />
                Upload Track
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Sparkles className="h-4 w-4 mr-2" />
                Create Playlist
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <TrendingUp className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Music Feed */}
        <MusicFeed tracks={mockTracks} />
      </div>
    </AppShell>
  );
}
