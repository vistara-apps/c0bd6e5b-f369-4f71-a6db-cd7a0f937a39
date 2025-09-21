'use client';

import { useState } from 'react';
import { Upload, Music, Image as ImageIcon, DollarSign, Tag } from 'lucide-react';
import { Button } from '../ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { formatPrice } from '@/lib/utils';

interface UploadTrackProps {
  onUpload?: (trackData: any) => void;
}

export function UploadTrack({ onUpload }: UploadTrackProps) {
  const [formData, setFormData] = useState({
    title: '',
    artistName: '',
    genre: '',
    price: 0.01,
    description: '',
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverArtFile, setCoverArtFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const genres = [
    'Electronic', 'Hip Hop', 'Rock', 'Pop', 'Jazz', 'Classical',
    'Ambient', 'Bass', 'Synthwave', 'Lo-fi', 'Indie', 'Other'
  ];

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (type: 'audio' | 'cover', file: File | null) => {
    if (type === 'audio') {
      setAudioFile(file);
    } else {
      setCoverArtFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!audioFile || !formData.title || !formData.artistName) {
      alert('Please fill in all required fields and upload an audio file.');
      return;
    }

    setIsUploading(true);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 10;
      });
    }, 200);

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    setIsUploading(false);
    setUploadProgress(0);

    // Call onUpload callback
    onUpload?.({
      ...formData,
      audioFile,
      coverArtFile,
    });

    // Reset form
    setFormData({
      title: '',
      artistName: '',
      genre: '',
      price: 0.01,
      description: '',
    });
    setAudioFile(null);
    setCoverArtFile(null);

    alert('Track uploaded successfully!');
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Upload New Track</span>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Track Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 bg-bg border border-white/20 rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter track title"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Artist Name *
              </label>
              <input
                type="text"
                value={formData.artistName}
                onChange={(e) => handleInputChange('artistName', e.target.value)}
                className="w-full px-3 py-2 bg-bg border border-white/20 rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="Enter artist name"
                required
              />
            </div>
          </div>

          {/* Genre and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Genre
              </label>
              <select
                value={formData.genre}
                onChange={(e) => handleInputChange('genre', e.target.value)}
                className="w-full px-3 py-2 bg-bg border border-white/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Price (ETH)
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary" />
                <input
                  type="number"
                  step="0.001"
                  min="0.001"
                  value={formData.price}
                  onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                  className="w-full pl-10 pr-3 py-2 bg-bg border border-white/20 rounded-md text-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 bg-bg border border-white/20 rounded-md text-text-primary placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              placeholder="Tell fans about this track..."
            />
          </div>

          {/* File Uploads */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Audio File */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Audio File *
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => handleFileChange('audio', e.target.files?.[0] || null)}
                  className="hidden"
                  id="audio-upload"
                />
                <label htmlFor="audio-upload" className="cursor-pointer">
                  <Music className="h-8 w-8 text-text-secondary mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">
                    {audioFile ? audioFile.name : 'Click to upload audio file'}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    MP3, WAV, FLAC up to 50MB
                  </p>
                </label>
              </div>
            </div>

            {/* Cover Art */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-text-primary">
                Cover Art
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-lg p-4 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange('cover', e.target.files?.[0] || null)}
                  className="hidden"
                  id="cover-upload"
                />
                <label htmlFor="cover-upload" className="cursor-pointer">
                  <ImageIcon className="h-8 w-8 text-text-secondary mx-auto mb-2" />
                  <p className="text-sm text-text-secondary">
                    {coverArtFile ? coverArtFile.name : 'Click to upload cover art'}
                  </p>
                  <p className="text-xs text-text-secondary mt-1">
                    JPG, PNG up to 5MB
                  </p>
                </label>
              </div>
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-text-secondary">Uploading...</span>
                <span className="text-text-secondary">{uploadProgress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit */}
          <div className="flex justify-end space-x-3">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Upload Track'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

