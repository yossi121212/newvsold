import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Create client with fallback for build time
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
);

// Storage bucket name
export const BUCKET_NAME = 'New bucket';

// Helper function to upload image to Supabase Storage
export async function uploadImage(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw error;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(path);

  return urlData.publicUrl;
}

// Helper function to save comparison to database
export async function saveComparison(
  slug: string,
  beforeImageUrl: string,
  afterImageUrl: string
) {
  const { data, error } = await supabase
    .from('comparisons')
    .insert({
      slug,
      before_image_url: beforeImageUrl,
      after_image_url: afterImageUrl,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

// Helper function to get comparison by slug
export async function getComparisonBySlug(slug: string) {
  const { data, error } = await supabase
    .from('comparisons')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

