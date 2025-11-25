-- Drop existing policies if they exist
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Public Upload" on storage.objects;

-- Create storage policies to allow public uploads and reads
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'comparisons' );

create policy "Public Upload"
on storage.objects for insert
with check ( bucket_id = 'comparisons' );

create policy "Public Update"
on storage.objects for update
using ( bucket_id = 'comparisons' );

create policy "Public Delete"
on storage.objects for delete
using ( bucket_id = 'comparisons' );

