import { NextRequest, NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { uploadImage, saveComparison } from '@/lib/supabase';

// Security: File size limit (10MB)
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

// Security: Allowed file types
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif'
];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const beforeFile = formData.get('before') as File;
    const afterFile = formData.get('after') as File;

    if (!beforeFile || !afterFile) {
      return NextResponse.json(
        { success: false, error: 'Missing images' },
        { status: 400 }
      );
    }

    // Validate file sizes
    if (beforeFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'Before image is too large (max 10MB)' },
        { status: 400 }
      );
    }

    if (afterFile.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'After image is too large (max 10MB)' },
        { status: 400 }
      );
    }

    // Validate file types
    if (!ALLOWED_TYPES.includes(beforeFile.type)) {
      return NextResponse.json(
        { success: false, error: 'Before image must be JPG, PNG, WebP, or GIF' },
        { status: 400 }
      );
    }

    if (!ALLOWED_TYPES.includes(afterFile.type)) {
      return NextResponse.json(
        { success: false, error: 'After image must be JPG, PNG, WebP, or GIF' },
        { status: 400 }
      );
    }

    // Generate unique slug
    const slug = nanoid(10);
    const timestamp = Date.now();

    // Upload images to Supabase Storage
    const beforePath = `${slug}/before-${timestamp}.${beforeFile.name.split('.').pop()}`;
    const afterPath = `${slug}/after-${timestamp}.${afterFile.name.split('.').pop()}`;

    const beforeUrl = await uploadImage(beforeFile, beforePath);
    const afterUrl = await uploadImage(afterFile, afterPath);

    // Save to database
    await saveComparison(slug, beforeUrl, afterUrl);

    return NextResponse.json({
      success: true,
      slug,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload images' },
      { status: 500 }
    );
  }
}

