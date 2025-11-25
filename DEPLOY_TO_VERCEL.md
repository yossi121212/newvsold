# 🚀 Deploy to Vercel - Step by Step

## Prerequisites
✅ Git repository created
✅ Code committed
✅ Supabase configured

---

## Option 1: Deploy via Vercel CLI (Fastest!)

### 1. Install Vercel CLI
```bash
npm i -g vercel
```

### 2. Login to Vercel
```bash
vercel login
```

### 3. Deploy!
```bash
cd /Users/yossimolcho/Oldvsnew
vercel
```

**Follow the prompts:**
- Link to existing project? → `N` (No)
- Project name → `newvsold` (or your choice)
- Which directory → `.` (current)
- Override settings? → `N` (No)

### 4. Add Environment Variables
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
# Paste: https://ewfrofdnvqdcvfffzpdw.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY
# Paste: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZnJvZmRudnFkY3ZmZmZ6cGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwOTM4NDcsImV4cCI6MjA3OTY2OTg0N30.WkdY8QMdba5GNhJvoTXPNmA1uMY2QR3Uw3obqfN3ldw
```

### 5. Redeploy with env vars
```bash
vercel --prod
```

**Done! You'll get a URL like:** `https://newvsold.vercel.app` 🎉

---

## Option 2: Deploy via Vercel Dashboard (Easier!)

### 1. Push to GitHub (if not already)
```bash
# Create GitHub repo first at https://github.com/new
gh repo create newvsold --public --source=. --remote=origin --push

# Or manually:
git remote add origin https://github.com/YOUR_USERNAME/newvsold.git
git branch -M main
git push -u origin main
```

### 2. Go to Vercel Dashboard
https://vercel.com/new

### 3. Import Your Repository
- Click "Add New" → "Project"
- Select "Import Git Repository"
- Choose your `newvsold` repo
- Click "Import"

### 4. Configure Project
Vercel auto-detects Next.js! But add environment variables:

**Environment Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://ewfrofdnvqdcvfffzpdw.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZnJvZmRudnFkY3ZmZmZ6cGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwOTM4NDcsImV4cCI6MjA3OTY2OTg0N30.WkdY8QMdba5GNhJvoTXPNmA1uMY2QR3Uw3obqfN3ldw
```

### 5. Deploy!
Click "Deploy" and wait ~2 minutes

**Done! You'll get a URL like:** `https://newvsold.vercel.app` 🎉

---

## After Deployment

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your domain
3. Update DNS records as shown

### Automatic Deployments
Every `git push` to `main` will auto-deploy! 🚀

---

## Troubleshooting

### Build fails?
- Check Environment Variables are set
- Check `.env.local` is in `.gitignore` (it should be!)
- Try: `npm run build` locally first

### Images not loading?
- Check Supabase bucket is Public
- Check bucket name is correct ("New bucket")
- Check CORS settings in Supabase

### "Bucket not found"?
- Ensure bucket "New bucket" exists in Supabase
- Check Environment Variables are correct

---

## 🎉 Your Site is Live!

Share your URL:
```
https://your-project.vercel.app
```

Features working:
✅ Upload images
✅ Create comparisons
✅ Share links
✅ Embed code
✅ Export GIF
✅ Gallery view
✅ Dark/Light mode

---

**Need help? Check Vercel docs:** https://vercel.com/docs

