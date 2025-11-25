# 🚀 Deployment Steps - Follow These!

## Current Status:
✅ Vercel CLI installed
⏳ Login in progress...

---

## After Login Completes:

### Step 1: Deploy the Project
```bash
cd /Users/yossimolcho/Oldvsnew
vercel
```

**Answer the prompts:**
- Set up and deploy? → `Y` (Yes)
- Which scope? → Choose your account
- Link to existing project? → `N` (No)
- What's your project's name? → `newvsold` (or your choice)
- In which directory is your code located? → `.` (current directory)
- Want to modify settings? → `N` (No)

**Vercel will build and deploy!** ⏳ Wait ~2 minutes

You'll get a **Preview URL** like: `https://newvsold-abc123.vercel.app`

---

### Step 2: Add Environment Variables

```bash
# Add Supabase URL
vercel env add NEXT_PUBLIC_SUPABASE_URL production

# When prompted, paste:
https://ewfrofdnvqdcvfffzpdw.supabase.co

# Add Supabase Key
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production

# When prompted, paste:
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZnJvZmRudnFkY3ZmZmZ6cGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwOTM4NDcsImV4cCI6MjA3OTY2OTg0N30.WkdY8QMdba5GNhJvoTXPNmA1uMY2QR3Uw3obqfN3ldw
```

---

### Step 3: Deploy to Production with ENV vars

```bash
vercel --prod
```

This will create your **production URL**: `https://newvsold.vercel.app` 🎉

---

## Environment Variables (Copy-Paste Ready):

### NEXT_PUBLIC_SUPABASE_URL
```
https://ewfrofdnvqdcvfffzpdw.supabase.co
```

### NEXT_PUBLIC_SUPABASE_ANON_KEY
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZnJvZmRudnFkY3ZmZmZ6cGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwOTM4NDcsImV4cCI6MjA3OTY2OTg0N30.WkdY8QMdba5GNhJvoTXPNmA1uMY2QR3Uw3obqfN3ldw
```

---

## Or via Dashboard:

1. Go to: https://vercel.com/dashboard
2. Find your project: `newvsold`
3. Settings → Environment Variables
4. Add both variables above
5. Redeploy

---

## After Deployment:

Your site will be live at:
```
https://newvsold.vercel.app
```

Test it:
- ✅ Upload images
- ✅ Create comparison
- ✅ Share link
- ✅ View gallery
- ✅ Export GIF

---

## Troubleshooting:

### "Bucket not found"?
- Check environment variables are set
- Redeploy after adding env vars

### Build failed?
- Check logs: `vercel logs`
- Try local build: `npm run build`

### Gallery empty?
- Upload some comparisons first!
- Check /api/comparisons works

---

**Need help? Tell me where you're stuck!** 🚀

