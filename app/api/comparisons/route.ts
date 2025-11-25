import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('comparisons')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50); // Limit to last 50 comparisons

    if (error) {
      console.error('Database error:', error);
      return NextResponse.json(
        { success: false, error: 'Failed to fetch comparisons' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      comparisons: data || [],
    });
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

