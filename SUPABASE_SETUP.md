# 🚀 Supabase Setup for newvsold

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. **Project Name:** `newvsold`
4. **Database Password:** (create a strong password and save it!)
5. **Region:** Choose closest to you
6. Click "Create new project" (wait ~2 minutes)

---

## Step 2: Create Storage Bucket

```sql
-- Go to Storage in Supabase Dashboard
-- Click "Create a new bucket"
```

- **Name:** `comparisons`
- **✅ Public bucket** (important!)
- Click "Create bucket"

---

## Step 3: Create Database Table

Go to SQL Editor and run:

```sql
-- Create comparisons table
create table comparisons (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  before_image_url text not null,
  after_image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create index for fast lookups
create index comparisons_slug_idx on comparisons(slug);

-- Enable RLS
alter table comparisons enable row level security;

-- Allow everyone to read
create policy "Anyone can read comparisons"
  on comparisons for select
  using (true);

-- Allow everyone to create
create policy "Anyone can insert comparisons"
  on comparisons for insert
  with check (true);
```

---

## Step 4: Get API Keys

1. Go to **Settings** → **API**
2. Copy these values:

```bash
Project URL: https://[your-project].supabase.co
anon public key: [your-anon-key]
```

---

## Step 5: Update .env.local

Create or update `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://[your-project].supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
```

---

## Step 6: Restart Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

---

## ✅ Test It!

1. Go to http://localhost:3000
2. Upload 2 images
3. Click "Create Comparison"
4. Should work! 🎉

---

## 🔧 Troubleshooting

### Images not uploading?
- Check bucket is **Public**
- Check .env.local has correct values

### "Not found" error?
- Make sure SQL ran successfully
- Check policies are created

### Dark mode is gray?
- Refresh with Cmd+Shift+R

---

**Need help? Check the console (F12) for errors!**

