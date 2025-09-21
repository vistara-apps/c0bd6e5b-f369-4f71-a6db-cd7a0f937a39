# TuneSphere - Community-Driven Music Platform

A Next.js Base Mini App that enables music enthusiasts and creators to discover, share, and monetize music through dynamic pricing and social interaction on the Base blockchain.

## Features

- **Community Discovery Feed**: Dynamic feed showcasing trending tracks and curated playlists
- **Direct Fan Support**: Tip creators directly for tracks you enjoy
- **Dynamic Track Pricing**: Creators can set prices for their music with fair value exchange
- **Social Sharing & Playlists**: Create and share playlists within the Base/Farcaster ecosystem
- **Creator Monetization**: Subscription tiers and direct fan support mechanisms

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (Ethereum L2)
- **Wallet Integration**: OnchainKit + MiniKit
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tunesphere
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your OnchainKit API key to `.env.local`

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
├── app/                    # Next.js App Router pages
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── layout/           # Layout components
│   ├── music/            # Music-specific components
│   ├── creators/         # Creator profile components
│   └── dashboard/        # Dashboard components
├── lib/                  # Utilities and types
│   ├── types.ts         # TypeScript type definitions
│   ├── utils.ts         # Utility functions
│   └── mock-data.ts     # Mock data for development
└── public/              # Static assets
```

## Key Components

### Music Components
- **TrackCard**: Displays track information with play/tip functionality
- **MusicPlayer**: Bottom music player with full controls
- **MusicFeed**: Grid layout for track discovery
- **TipModal**: Modal for tipping creators

### Layout Components
- **AppShell**: Main application layout wrapper
- **Header**: Top navigation with search and user profile
- **Sidebar**: Left navigation menu

## Design System

The app uses a custom design system with:
- **Colors**: Dark theme with blue/purple gradients
- **Typography**: Modern font hierarchy
- **Components**: Consistent UI components with variants
- **Animations**: Smooth transitions and micro-interactions

## Base Mini App Integration

This app is built as a Base Mini App with:
- MiniKit provider for Base blockchain integration
- OnchainKit components for wallet functionality
- Proper manifest configuration for discovery
- Social-native UX optimized for Base App

## Development

### Adding New Features
1. Define TypeScript types in `lib/types.ts`
2. Create components in appropriate directories
3. Add mock data if needed in `lib/mock-data.ts`
4. Implement proper error handling and loading states

### Styling Guidelines
- Use Tailwind CSS classes
- Follow the established design system
- Ensure mobile-first responsive design
- Use CSS variables for consistent theming

## API Documentation

### Frame Endpoints

#### GET `/frame`
Returns the main TuneSphere frame for Farcaster integration.

**Response**: HTML with frame metadata for music discovery.

#### POST `/api/frame`
Handles frame interactions and button clicks.

**Request Body**: Frame message from Farcaster
**Response**: Updated frame HTML based on user interaction

#### GET `/api/og`
Generates Open Graph images for frame previews.

**Query Parameters**:
- `title`: Title for the OG image
- `description`: Description for the OG image

**Response**: PNG image (1200x630)

### Data Models

#### User
```typescript
{
  userId: string;
  farcasterId: string;
  displayName: string;
  profilePicUrl: string;
  bio: string;
  walletAddress: string;
}
```

#### Track
```typescript
{
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
```

#### Creator
```typescript
{
  creatorId: string;
  userId: string;
  bio: string;
  socialLinks: string[];
  followers: number;
  totalEarnings: number;
}
```

#### Transaction
```typescript
{
  transactionId: string;
  type: 'tip' | 'purchase' | 'subscription';
  amount: number;
  timestamp: string;
  senderAddress: string;
  receiverAddress: string;
  tokenId?: string;
}
```

### Smart Contract Integration

The app integrates with Base blockchain for:
- **Track Ownership**: ERC-721 tokens for track ownership
- **Tipping**: Direct ETH transfers to creators
- **Subscriptions**: Smart contract-based subscription management
- **Dynamic Pricing**: On-chain price updates

### IPFS Integration

Audio files and cover art are stored on IPFS for decentralized hosting:
- **Audio Storage**: MP3/WAV files pinned to IPFS
- **Cover Art**: Image files stored on IPFS
- **Metadata**: Track metadata stored as JSON on IPFS

## Deployment

### Prerequisites
- Node.js 18+
- npm or yarn
- OnchainKit API key
- Base network access

### Environment Variables
```bash
NEXT_PUBLIC_ONCHAINKIT_API_KEY=your_api_key
NEXT_PUBLIC_BASE_RPC_URL=https://mainnet.base.org
NODE_ENV=production
```

### Build & Deploy
```bash
npm run build
npm start
```

The app is optimized for deployment on platforms that support Next.js:
- Vercel (recommended)
- Netlify
- Railway
- Self-hosted

Make sure to set the required environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
