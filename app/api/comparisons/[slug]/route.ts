import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Get comparison details first to delete images
    const { data: comparison, error: fetchError } = await supabase
      .from('comparisons')
      .select('*')
      .eq('slug', slug)
      .single();

    if (fetchError || !comparison) {
      return NextResponse.json(
        { success: false, error: 'Comparison not found' },
        { status: 404 }
      );
    }

    // Extract file paths from URLs
    const extractFilePath = (url: string) => {
      const matches = url.match(/\/storage\/v1\/object\/public\/[^\/]+\/(.+)$/);
      return matches ? matches[1] : null;
    };

    const beforePath = extractFilePath(comparison.before_image_url);
    const afterPath = extractFilePath(comparison.after_image_url);

    // Delete images from storage
    if (beforePath && afterPath) {
      await supabase.storage
        .from('New bucket')
        .remove([beforePath, afterPath]);
    }

    // Delete comparison from database
    const { error: deleteError } = await supabase
      .from('comparisons')
      .delete()
      .eq('slug', slug);

    if (deleteError) {
      console.error('Database delete error:', deleteError);
      return NextResponse.json(
        { success: false, error: 'Failed to delete comparison' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Comparison deleted successfully',
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

