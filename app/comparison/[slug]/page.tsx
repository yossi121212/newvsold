import { notFound } from 'next/navigation';
import { getComparisonBySlug } from '@/lib/supabase';
import ComparisonView from '@/components/ComparisonView';

interface PageProps {
  params: {
    slug: string;
  };
}

export default async function ComparisonPage({ params }: PageProps) {
  // Check if Supabase is configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes('placeholder')) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="text-6xl mb-4">⚙️</div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              נדרשת הגדרה
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              האתר עדיין לא מוגדר. אנא הגדר את Supabase לפני השימוש.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
            >
              חזור לדף הבית
            </a>
          </div>
        </div>
      </div>
    );
  }

  try {
    const comparison = await getComparisonBySlug(params.slug);

    if (!comparison) {
      notFound();
    }

    return <ComparisonView comparison={comparison} />;
  } catch (error) {
    console.error('Error loading comparison:', error);
    notFound();
  }
}

export async function generateMetadata({ params }: PageProps) {
  try {
    const comparison = await getComparisonBySlug(params.slug);
    
    return {
      title: `השוואת תמונות - ${params.slug} | Old vs New`,
      description: 'השווה תמונות לפני ואחרי עם slider אינטראקטיבי',
      openGraph: {
        title: 'Old vs New - Image Comparison',
        description: 'השווה תמונות לפני ואחרי',
        images: [comparison?.after_image_url],
      },
    };
  } catch {
    return {
      title: 'השוואת תמונות | Old vs New',
    };
  }
}

