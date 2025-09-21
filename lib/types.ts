export interface User {
  userId: string;
  farcasterId: string;
  displayName: string;
  profilePicUrl: string;
  bio: string;
  walletAddress: string;
}

export interface Track {
  trackId: string;
  creatorId: string;
  title: string;
  artistName: string;
  audioUrl: string;
  coverArtUrl: string;
  genre: string;
  currentPrice: number;
  isMinted: boolean;
  likes: number;
  plays: number;
  duration: string;
}

export interface Creator {
  creatorId: string;
  userId: string;
  bio: string;
  socialLinks: string[];
  followers: number;
  totalEarnings: number;
}

export interface Playlist {
  playlistId: string;
  userId: string;
  name: string;
  description: string;
  trackIds: string[];
  coverArt: string;
  isPublic: boolean;
}

export interface Transaction {
  transactionId: string;
  type: 'tip' | 'purchase' | 'subscription';
  amount: number;
  timestamp: string;
  senderAddress: string;
  receiverAddress: string;
  tokenId?: string;
}

export interface Subscription {
  subscriptionId: string;
  creatorId: string;
  subscriberId: string;
  startDate: string;
  endDate: string;
  tier: 'basic' | 'premium' | 'vip';
  price: number;
}
