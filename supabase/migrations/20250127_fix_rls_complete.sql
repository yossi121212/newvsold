-- Complete RLS fix - remove ALL old policies and create simple ones
-- First, disable RLS temporarily to clean up
alter table comparisons disable row level security;

-- Drop ALL existing policies (catch all possible names)
do $$ 
declare
  pol record;
begin
  for pol in 
    select policyname 
    from pg_policies 
    where tablename = 'comparisons'
  loop
    execute format('drop policy if exists %I on comparisons', pol.policyname);
  end loop;
end $$;

-- Re-enable RLS
alter table comparisons enable row level security;

-- Create single, simple, permissive policy for all operations
create policy "Allow all operations for everyone"
on comparisons
for all
using (true)
with check (true);

