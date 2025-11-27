'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeToggle from '@/components/ThemeToggle';
import { Comparison } from '@/types/comparison';

export default function GalleryPage() {
  const [comparisons, setComparisons] = useState<Comparison[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [slugToDelete, setSlugToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchComparisons();
    // Auto-refresh every 10 seconds
    const interval = setInterval(fetchComparisons, 10000);
    return () => clearInterval(interval);
  }, []);

  const fetchComparisons = async () => {
    try {
      const response = await fetch(`/api/comparisons?t=${Date.now()}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
        },
      });
      const data = await response.json();

      if (data.success) {
        setComparisons(data.comparisons);
      } else {
        setError(data.error || 'Failed to load comparisons');
      }
    } catch (err) {
      setError('Failed to load comparisons');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (slug: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSlugToDelete(slug);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!slugToDelete) return;

    setDeletingSlug(slugToDelete);
    setShowDeleteModal(false);

    try {
      const response = await fetch(`/api/comparisons/${slugToDelete}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        // Remove from state immediately
        setComparisons((prev) => prev.filter((c) => c.slug !== slugToDelete));
      } else {
        alert(data.error || 'Failed to delete comparison');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete comparison');
    } finally {
      setDeletingSlug(null);
      setSlugToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setSlugToDelete(null);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#1f1f1f]">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-4">
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
            
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Gallery
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Browse all before & after comparisons
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <svg className="animate-spin h-12 w-12 text-gray-900 dark:text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </div>
        ) : error ? (
          <div className="max-w-md mx-auto">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 text-center">
              <svg className="w-12 h-12 text-red-600 dark:text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-red-600 dark:text-red-400">{error}</p>
            </div>
          </div>
        ) : comparisons.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🖼️</div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              No Comparisons Yet
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Create your first before & after comparison!
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-black dark:bg-white text-white dark:text-black font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Create Comparison
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {comparisons.map((comparison, index) => (
              <div
                key={comparison.id}
                className="group relative bg-gray-50 dark:bg-[#2a2a2a] rounded-2xl overflow-hidden border border-gray-200 dark:border-[#3a3a3a] hover:border-gray-900 dark:hover:border-gray-100 transition-all duration-200 hover:shadow-xl"
              >
                <Link href={`/comparison/${comparison.slug}`}>
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 grid grid-cols-2">
                      <img
                        src={comparison.before_image_url}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                      <img
                        src={comparison.after_image_url}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-white font-semibold flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Comparison
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        Comparison #{comparisons.length - index}
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(comparison.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
                
                {/* Delete Button */}
                <button
                  onClick={(e) => handleDeleteClick(comparison.slug, e)}
                  disabled={deletingSlug === comparison.slug}
                  className="absolute top-3 right-3 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed z-10"
                  title="Delete comparison"
                >
                  {deletingSlug === comparison.slug ? (
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  )}
                </button>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={cancelDelete}
        >
          <div 
            className="bg-white dark:bg-[#2a2a2a] rounded-2xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  Delete Comparison?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Are you sure you want to delete this comparison? This action cannot be undone and will permanently remove both images.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={cancelDelete}
                className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-[#3a3a3a] hover:bg-gray-200 dark:hover:bg-[#4a4a4a] text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

