import { Track, Creator, User, Playlist } from './types';

export const mockTracks: Track[] = [
  {
    trackId: '1',
    creatorId: 'creator1',
    title: 'Cosmic Dreams',
    artistName: 'Stellar Beats',
    audioUrl: '/audio/cosmic-dreams.mp3',
    coverArtUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    genre: 'Electronic',
    currentPrice: 0.05,
    isMinted: true,
    likes: 1247,
    plays: 8934,
    duration: '3:42'
  },
  {
    trackId: '2',
    creatorId: 'creator2',
    title: 'Neon Nights',
    artistName: 'CyberWave',
    audioUrl: '/audio/neon-nights.mp3',
    coverArtUrl: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop',
    genre: 'Synthwave',
    currentPrice: 0.03,
    isMinted: true,
    likes: 892,
    plays: 5621,
    duration: '4:15'
  },
  {
    trackId: '3',
    creatorId: 'creator3',
    title: 'Digital Horizon',
    artistName: 'Future Sound',
    audioUrl: '/audio/digital-horizon.mp3',
    coverArtUrl: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&h=400&fit=crop',
    genre: 'Ambient',
    currentPrice: 0.02,
    isMinted: false,
    likes: 634,
    plays: 3421,
    duration: '5:28'
  },
  {
    trackId: '4',
    creatorId: 'creator1',
    title: 'Bass Revolution',
    artistName: 'Stellar Beats',
    audioUrl: '/audio/bass-revolution.mp3',
    coverArtUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop',
    genre: 'Bass',
    currentPrice: 0.08,
    isMinted: true,
    likes: 2156,
    plays: 12847,
    duration: '3:21'
  }
];

export const mockCreators: Creator[] = [
  {
    creatorId: 'creator1',
    userId: 'user1',
    bio: 'Electronic music producer exploring the cosmos through sound',
    socialLinks: ['@stellarbeats', 'stellarbeats.com'],
    followers: 15420,
    totalEarnings: 12.45
  },
  {
    creatorId: 'creator2',
    userId: 'user2',
    bio: 'Synthwave artist bringing retro-futuristic vibes',
    socialLinks: ['@cyberwave', 'cyberwave.io'],
    followers: 8934,
    totalEarnings: 8.92
  },
  {
    creatorId: 'creator3',
    userId: 'user3',
    bio: 'Ambient soundscapes for digital meditation',
    socialLinks: ['@futuresound'],
    followers: 5621,
    totalEarnings: 4.33
  }
];

export const mockUser: User = {
  userId: 'current-user',
  farcasterId: 'fc123456',
  displayName: 'Music Lover',
  profilePicUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face',
  bio: 'Discovering amazing music on Base',
  walletAddress: '0x1234567890123456789012345678901234567890'
};

export const mockPlaylists: Playlist[] = [
  {
    playlistId: '1',
    userId: 'current-user',
    name: 'Cosmic Vibes',
    description: 'Electronic tracks for space exploration',
    trackIds: ['1', '3'],
    coverArt: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=400&fit=crop',
    isPublic: true
  },
  {
    playlistId: '2',
    userId: 'current-user',
    name: 'Night Drive',
    description: 'Perfect synthwave for late night cruising',
    trackIds: ['2', '4'],
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=400&fit=crop',
    isPublic: true
  }
];
