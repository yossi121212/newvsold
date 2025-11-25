-- Storage policies for 'New bucket'
-- Drop existing policies if they exist
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Public Upload" on storage.objects;
drop policy if exists "Public Update" on storage.objects;
drop policy if exists "Public Delete" on storage.objects;

-- Create policies for 'New bucket'
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'New bucket' );

create policy "Public Upload"
on storage.objects for insert
with check ( bucket_id = 'New bucket' );

create policy "Public Update"
on storage.objects for update
using ( bucket_id = 'New bucket' );

create policy "Public Delete"
on storage.objects for delete
using ( bucket_id = 'New bucket' );

