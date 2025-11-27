-- Fix RLS policies to allow reading ALL comparisons
-- Drop old restrictive policies
drop policy if exists "Anyone can read comparisons" on comparisons;
drop policy if exists "Anyone can insert comparisons" on comparisons;
drop policy if exists "Public read access" on comparisons;
drop policy if exists "Public insert access" on comparisons;

-- Create new permissive policies
create policy "Enable read access for all users"
on comparisons for select
using (true);

create policy "Enable insert access for all users"
on comparisons for insert
with check (true);

create policy "Enable delete access for all users"
on comparisons for delete
using (true);

-- Verify RLS is enabled
alter table comparisons enable row level security;

