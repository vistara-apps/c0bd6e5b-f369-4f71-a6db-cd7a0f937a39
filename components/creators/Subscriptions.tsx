'use client';

import { useState } from 'react';
import { Crown, Star, Zap, Check } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Creator } from '@/lib/types';
import { formatPrice } from '@/lib/utils';

interface SubscriptionTier {
  id: string;
  name: string;
  price: number;
  period: 'monthly' | 'yearly';
  features: string[];
  icon: React.ReactNode;
  popular?: boolean;
}

const subscriptionTiers: SubscriptionTier[] = [
  {
    id: 'basic',
    name: 'Basic Fan',
    price: 0.005,
    period: 'monthly',
    features: [
      'Early access to new tracks',
      'Exclusive behind-the-scenes content',
      'Direct artist communication',
    ],
    icon: <Star className="h-5 w-5" />,
  },
  {
    id: 'premium',
    name: 'Premium Supporter',
    price: 0.02,
    period: 'monthly',
    features: [
      'All Basic features',
      'Monthly exclusive tracks',
      'Virtual meet & greets',
      'Custom artwork downloads',
      'Priority support',
    ],
    icon: <Zap className="h-5 w-5" />,
    popular: true,
  },
  {
    id: 'vip',
    name: 'VIP Patron',
    price: 0.05,
    period: 'monthly',
    features: [
      'All Premium features',
      'Quarterly virtual concerts',
      'Personalized shoutouts',
      'Exclusive merchandise',
      'Direct collaboration opportunities',
      'Private Discord access',
    ],
    icon: <Crown className="h-5 w-5" />,
  },
];

interface SubscriptionsProps {
  creator: Creator;
}

export function Subscriptions({ creator }: SubscriptionsProps) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubscribe = async (tierId: string) => {
    setIsProcessing(true);
    setSelectedTier(tierId);

    // Simulate subscription processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsProcessing(false);
    setSelectedTier(null);

    // Show success message
    alert(`Successfully subscribed to ${subscriptionTiers.find(t => t.id === tierId)?.name}!`);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-4">
        <h2 className="text-3xl font-bold text-text-primary">Support {creator.bio.split(' ')[0]}</h2>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto">
          Join the exclusive community of supporters and get access to premium content,
          early releases, and direct interaction with the artist.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {subscriptionTiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative ${tier.popular ? 'ring-2 ring-primary' : ''}`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                  Most Popular
                </span>
              </div>
            )}

            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-2">
                <div className={`p-3 rounded-full ${tier.popular ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'}`}>
                  {tier.icon}
                </div>
              </div>
              <CardTitle className="text-xl">{tier.name}</CardTitle>
              <div className="text-3xl font-bold text-primary">
                {formatPrice(tier.price)}
                <span className="text-sm font-normal text-text-secondary">/{tier.period}</span>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {tier.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-text-secondary">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className="w-full"
                variant={tier.popular ? 'default' : 'outline'}
                onClick={() => handleSubscribe(tier.id)}
                disabled={isProcessing}
              >
                {isProcessing && selectedTier === tier.id ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  `Subscribe ${tier.popular ? 'Now' : ''}`
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-6 text-center">
          <h3 className="text-xl font-semibold text-text-primary mb-2">Why Subscribe?</h3>
          <p className="text-text-secondary mb-4">
            Your support directly helps artists create more music and build meaningful connections with their fans.
            Every subscription contributes to the growth of the music community on Base.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span>100% goes to artists</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span>Cancel anytime</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Secure blockchain payments</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

