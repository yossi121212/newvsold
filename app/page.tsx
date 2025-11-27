'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ImageUploader from '@/components/ImageUploader';
import ThemeToggle from '@/components/ThemeToggle';

export default function Home() {
  const [beforeImage, setBeforeImage] = useState<File | null>(null);
  const [afterImage, setAfterImage] = useState<File | null>(null);
  const [beforePreview, setBeforePreview] = useState<string>('');
  const [afterPreview, setAfterPreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string>('');
  const [isConfigured, setIsConfigured] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if Supabase is configured
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key || url.includes('placeholder')) {
      setIsConfigured(false);
    }
  }, []);

  const handleBeforeImage = (file: File) => {
    setBeforeImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setBeforePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleAfterImage = (file: File) => {
    setAfterImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setAfterPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!beforeImage || !afterImage) {
      setError('Please upload both images');
      return;
    }

    setIsUploading(true);
    setError('');

    try {
      // Demo mode if Supabase not configured
      if (!isConfigured) {
        sessionStorage.setItem('demo_before', beforePreview);
        sessionStorage.setItem('demo_after', afterPreview);
        router.push('/comparison/demo');
        return;
      }

      // Upload to Supabase
      const formData = new FormData();
      formData.append('before', beforeImage);
      formData.append('after', afterImage);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        cache: 'no-store',
      });

      const data = await response.json();

      if (data.success && data.slug) {
        router.push(`/comparison/${data.slug}`);
      } else {
        setError(data.error || 'Failed to upload images');
      }
    } catch (err) {
      setError('Failed to upload images');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1f1f1f]">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 dark:bg-white rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900 dark:text-white">Before & After</span>
            </div>
            <div className="flex items-center gap-3">
              {!isConfigured && (
                <span className="text-xs font-medium text-gray-700 bg-gray-100 dark:bg-[#2a2a2a] dark:text-gray-300 px-2.5 py-1 rounded-full border border-gray-200 dark:border-[#3a3a3a]">
                  Demo Mode
                </span>
              )}
              <Link
                href="/gallery"
                className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Gallery
              </Link>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
            Before & After
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Showcase your design evolution. Upload before and after images to create an interactive comparison.
          </p>
        </div>

        {/* Demo Notice */}
        {!isConfigured && (
          <div className="mb-8 bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] rounded-2xl p-6">
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                  Running in Demo Mode
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  Your comparisons work perfectly, but aren't saved. To save and share permanently, 
                  configure Supabase (takes 5 minutes). See <code className="bg-gray-100 dark:bg-[#3a3a3a] px-1.5 py-0.5 rounded text-xs">SETUP.md</code>
                </p>
              </div>
            </div>
          </div>
        )}

          {/* Upload Section */}
          <div className="bg-gray-50 dark:bg-[#2a2a2a] rounded-2xl p-8 mb-8">
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <ImageUploader
              label="Before"
              onImageSelect={handleBeforeImage}
              preview={beforePreview}
            />
            <ImageUploader
              label="After"
              onImageSelect={handleAfterImage}
              preview={afterPreview}
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-[#2a2a2a] border border-red-200 dark:border-red-800 rounded-xl">
              <p className="text-sm text-red-800 dark:text-red-300">{error}</p>
            </div>
          )}

           <button
             onClick={handleUpload}
             disabled={!beforeImage || !afterImage || isUploading}
             className={`
               w-full py-3.5 px-8 rounded-full font-semibold text-sm
               transition-all duration-200
               ${
                 !beforeImage || !afterImage || isUploading
                   ? 'bg-gray-300 dark:bg-[#2a2a2a] text-gray-500 dark:text-gray-600 cursor-not-allowed border border-gray-300 dark:border-[#3a3a3a]'
                   : 'bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-white text-white dark:text-black shadow-lg hover:shadow-xl'
               }
             `}
           >
            {isUploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                {isConfigured ? 'Creating...' : 'Preparing...'}
              </span>
            ) : (
              <>Create Comparison{!isConfigured && ' (Demo)'}</>
            )}
          </button>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-200 dark:border-[#3a3a3a]">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Interactive Slider</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Drag to reveal differences between your designs
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-200 dark:border-[#3a3a3a]">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Easy Sharing</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Get a unique link to share with your team
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="w-12 h-12 bg-gray-100 dark:bg-[#2a2a2a] rounded-xl flex items-center justify-center mx-auto mb-4 border border-gray-200 dark:border-[#3a3a3a]">
              <svg className="w-6 h-6 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Export as GIF</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Download animated GIF for presentations
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            Built with Next.js, Tailwind CSS, and Supabase
          </p>
        </div>
      </footer>
    </div>
  );
}
