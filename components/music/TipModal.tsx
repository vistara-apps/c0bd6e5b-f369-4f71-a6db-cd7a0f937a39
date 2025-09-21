'use client';

import { useState } from 'react';
import { X, Zap, Heart } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Track } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import Image from 'next/image';

interface TipModalProps {
  isOpen: boolean;
  onClose: () => void;
  track: Track;
}

const tipAmounts = [0.001, 0.005, 0.01, 0.05];

export function TipModal({ isOpen, onClose, track }: TipModalProps) {
  const [selectedAmount, setSelectedAmount] = useState(0.005);
  const [customAmount, setCustomAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleTip = async () => {
    setIsProcessing(true);
    
    // Simulate transaction processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsProcessing(false);
    onClose();
    
    // Show success notification (in a real app, this would be handled by a toast system)
    alert(`Successfully tipped ${formatPrice(selectedAmount)} to ${track.artistName}!`);
  };

  const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="flex items-center space-x-2">
            <Zap className="h-5 w-5 text-accent" />
            <span>Tip Artist</span>
          </CardTitle>
          <Button size="icon" variant="ghost" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Track Info */}
          <div className="flex items-center space-x-3">
            <Image
              src={track.coverArtUrl}
              alt={track.title}
              width={48}
              height={48}
              className="rounded-md"
            />
            <div>
              <h4 className="font-medium text-text-primary">{track.title}</h4>
              <p className="text-sm text-text-secondary">{track.artistName}</p>
            </div>
          </div>

          {/* Tip Amount Selection */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-text-primary">Select Amount</label>
            <div className="grid grid-cols-2 gap-2">
              {tipAmounts.map((amount) => (
                <Button
                  key={amount}
                  variant={selectedAmount === amount ? 'default' : 'outline'}
                  className="h-12"
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                >
                  {formatPrice(amount)}
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Custom Amount (ETH)</label>
            <input
              type="number"
              step="0.001"
              min="0.001"
              placeholder="0.000"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value);
                setSelectedAmount(0);
              }}
              className="w-full px-3 py-2 bg-bg border border-white/20 rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Message (Optional)</label>
            <textarea
              placeholder="Say something nice to the artist..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-bg border border-white/20 rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>

          {/* Total */}
          <div className="flex items-center justify-between p-3 bg-bg/50 rounded-md">
            <span className="text-sm text-text-secondary">Total Tip</span>
            <span className="font-medium text-accent">{formatPrice(finalAmount)}</span>
          </div>

          {/* Actions */}
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              className="flex-1" 
              onClick={handleTip}
              disabled={isProcessing || finalAmount <= 0}
            >
              {isProcessing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Heart className="h-4 w-4" />
                  <span>Send Tip</span>
                </div>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
