'use client';

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white dark:bg-[#1f1f1f] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="bg-gray-50 dark:bg-[#2a2a2a] border border-gray-200 dark:border-[#3a3a3a] rounded-2xl shadow-xl p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Something Went Wrong
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            {error.message || 'An unexpected error occurred'}
          </p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={reset}
              className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

