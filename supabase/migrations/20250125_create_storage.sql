-- Create storage bucket for comparisons
insert into storage.buckets (id, name, public)
values ('comparisons', 'comparisons', true)
on conflict (id) do update set public = true;

-- Set storage policies to allow public uploads and reads
create policy "Public Access"
on storage.objects for select
using ( bucket_id = 'comparisons' );

create policy "Public Upload"
on storage.objects for insert
with check ( bucket_id = 'comparisons' );

