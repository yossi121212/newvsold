'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ComparisonSlider from '@/components/ComparisonSlider';
import ThemeToggle from '@/components/ThemeToggle';
import Link from 'next/link';

export default function DemoComparisonPage() {
  const [beforeImage, setBeforeImage] = useState<string>('');
  const [afterImage, setAfterImage] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const before = sessionStorage.getItem('demo_before');
    const after = sessionStorage.getItem('demo_after');

    if (!before || !after) {
      router.push('/');
      return;
    }

    setBeforeImage(before);
    setAfterImage(after);
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-[#1f1f1f] flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 dark:border-gray-800 border-t-black dark:border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

    return (
      <div className="min-h-screen bg-white dark:bg-[#1f1f1f]">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="font-medium">Back to Home</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-gray-700 bg-gray-100 dark:bg-[#2a2a2a] dark:text-gray-300 px-2.5 py-1 rounded-full border border-gray-200 dark:border-[#3a3a3a]">
                Demo Mode
              </span>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
          {/* Demo Notice */}
          <div className="bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] rounded-2xl p-6 mb-8">
          <div className="flex gap-3">
            <div className="flex-shrink-0">
              <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                Demo Mode Active
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Your comparison is not saved. Only you can see it. To save and share permanently, 
                configure Supabase (see instructions on home page).
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-center mb-8 flex-wrap">
           <button
             onClick={() => router.push('/')}
             className="flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-medium text-sm rounded-full transition-all shadow-md hover:shadow-lg"
           >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload Different Images
          </button>
        </div>

          {/* Comparison Slider */}
          <div className="w-full">
            <ComparisonSlider
              beforeImage={beforeImage}
              afterImage={afterImage}
            />
          </div>

        {/* Instructions */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
            Drag the slider or click anywhere to compare
          </p>
        </div>

          {/* Setup CTA */}
          <div className="mt-12 bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] rounded-2xl p-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Want to save and share?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Configure Supabase (takes 5 minutes) to unlock:
            </p>
            <div className="grid sm:grid-cols-2 gap-3 mb-6 text-left">
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Permanent shareable links
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Cloud storage
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Animated GIF export
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                <svg className="w-5 h-5 text-gray-700 dark:text-gray-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Embed anywhere
              </div>
            </div>
             <Link
               href="/"
               className="inline-flex items-center gap-2 px-5 py-2.5 bg-black hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-black font-medium text-sm rounded-full transition-all shadow-md hover:shadow-lg"
             >
              View Setup Instructions
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
