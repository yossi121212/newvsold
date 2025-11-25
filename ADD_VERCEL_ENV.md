# 🚀 הוספת Supabase ל-Vercel - פשוט מאוד!

## שלב 1️⃣: פתח את העמוד הזה
https://vercel.com/yossi121212/newvsold/settings/environment-variables

---

## שלב 2️⃣: הוסף משתנה ראשון

לחץ על הכפתור השחור **"Add New"**

### תמלא ככה:

**בשדה הראשון (Key)** - העתק את זה:
```
NEXT_PUBLIC_SUPABASE_URL
```

**בשדה השני (Value)** - העתק את זה:
```
https://ewfrofdnvqdcvfffzpdw.supabase.co
```

**ב-Environments** - סמן את **כל השלושה**:
☑️ Production
☑️ Preview
☑️ Development

**לחץ על: Save**

---

## שלב 3️⃣: הוסף משתנה שני

**לחץ שוב** על הכפתור השחור **"Add New"**

### תמלא ככה:

**בשדה הראשון (Key)** - העתק את זה:
```
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

**בשדה השני (Value)** - העתק את זה (זה הקי הארוך):
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3ZnJvZmRudnFkY3ZmZmZ6cGR3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwOTM4NDcsImV4cCI6MjA3OTY2OTg0N30.WkdY8QMdba5GNhJvoTXPNmA1uMY2QR3Uw3obqfN3ldw
```

**ב-Environments** - סמן את **כל השלושה**:
☑️ Production
☑️ Preview
☑️ Development

**לחץ על: Save**

---

## שלב 4️⃣: פריסה מחדש (Redeploy)

1. לך לכאן: https://vercel.com/yossi121212/newvsold
2. לחץ על הטאב **"Deployments"** (למעלה)
3. תראה את הפריסה האחרונה בראש הרשימה
4. לחץ על **שלוש הנקודות** `⋯` בצד ימין
5. בחר **"Redeploy"**
6. לחץ **"Redeploy"** באישור

---

## ✅ זהו! אחרי 1-2 דקות זה יעבוד!

האתר שלך יהיה פעיל עם Supabase ב:
🌐 https://newvsold.vercel.app

---

**תגיד לי אחרי ששמרת את 2 המשתנים!** ✨
