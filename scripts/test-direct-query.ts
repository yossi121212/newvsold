import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ewfrofdnvqdcvfffzpdw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZnJvZmRudnFkY3ZmZmZ6cGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwOTM4NDcsImV4cCI6MjA3OTY2OTg0N30.WkdY8QMdba5GNhJvoTXPNmA1uMY2QR3Uw3obqfN3ldw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function testQuery() {
  console.log('🔍 Testing direct query with anon key...\n');
  
  const { data, error, count } = await supabase
    .from('comparisons')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (error) {
    console.error('❌ Error:', error);
    return;
  }

  console.log(`✅ Total count: ${count}`);
  console.log(`✅ Returned rows: ${data?.length || 0}\n`);
  
  if (data) {
    data.forEach((row, i) => {
      console.log(`${i + 1}. ${row.slug} - ${row.created_at}`);
    });
  }
}

testQuery();

