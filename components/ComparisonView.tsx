'use client';

import { Comparison } from '@/types/comparison';
import ComparisonSlider from './ComparisonSlider';
import ShareButton from './ShareButton';
import EmbedButton from './EmbedButton';
import GifExporter from './GifExporter';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';

interface ComparisonViewProps {
  comparison: Comparison;
}

export default function ComparisonView({ comparison }: ComparisonViewProps) {
  // Check if we came from gallery (using document.referrer)
  const isFromGallery = typeof window !== 'undefined' && document.referrer.includes('/gallery');
  const backUrl = isFromGallery ? '/gallery' : '/';
  const backText = isFromGallery ? 'Back to Gallery' : 'Back to Home';

  return (
    <div className="min-h-screen bg-white dark:bg-[#1f1f1f]">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href={backUrl}
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">{backText}</span>
            </Link>
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Comparison Slider */}
        <div className="w-full mb-6">
          <ComparisonSlider
            beforeImage={comparison.before_image_url}
            afterImage={comparison.after_image_url}
          />
        </div>

        {/* Instructions */}
        <div className="text-center mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Drag the slider or click anywhere to compare
          </p>
        </div>

        {/* Action Buttons - Below Slider */}
        <div className="flex gap-3 justify-center mb-8 flex-wrap">
          <ShareButton />
          <EmbedButton />
          <GifExporter
            beforeImage={comparison.before_image_url}
            afterImage={comparison.after_image_url}
          />
        </div>

        {/* Share Info */}
        <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-[#2a2a2a] rounded-2xl p-6 border border-gray-200 dark:border-[#3a3a3a]">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Share this comparison
          </h2>
          <div className="bg-white dark:bg-[#1f1f1f] rounded-xl p-4 border border-gray-200 dark:border-[#3a3a3a] break-all">
            <code className="text-sm text-gray-800 dark:text-gray-200">
              {typeof window !== 'undefined' ? window.location.href : ''}
            </code>
          </div>
          <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
            Share this link with your team or embed it anywhere
          </p>
        </div>
      </main>
    </div>
  );
}
