'use client';

import { MiniKitProvider } from '@coinbase/minikit';
import { OnchainKitProvider } from '@coinbase/onchainkit';
import { base } from 'wagmi/chains';
import { MusicProvider } from '@/lib/MusicContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MiniKitProvider
      chain={base}
      apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-key'}
    >
      <OnchainKitProvider
        apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY || 'demo-key'}
        chain={base}
      >
        <MusicProvider>
          {children}
        </MusicProvider>
      </OnchainKitProvider>
    </MiniKitProvider>
  );
}
