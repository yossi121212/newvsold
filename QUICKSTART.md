# 🚀 Quick Start - התחלה מהירה

## צעדים מהירים להפעלת האתר:

### 1️⃣ התקנה (2 דקות)

```bash
cd /Users/yossimolcho/Oldvsnew
npm install
```

### 2️⃣ הגדרת Supabase (5 דקות)

#### א. צור פרויקט:
1. כנס ל-[supabase.com](https://app.supabase.com)
2. לחץ "New Project"
3. תן שם לפרויקט והמתן ~2 דקות

#### ב. צור Storage Bucket:
1. לחץ על "Storage" בתפריט
2. "Create a new bucket"
3. שם: `comparisons`
4. ✅ סמן "Public bucket"
5. "Create bucket"

#### ג. הרץ SQL:
1. לחץ על "SQL Editor"
2. "New query"
3. העתק והדבק:

```sql
create table comparisons (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  before_image_url text not null,
  after_image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

create index comparisons_slug_idx on comparisons(slug);

alter table comparisons enable row level security;

create policy "Anyone can read comparisons"
  on comparisons for select
  using (true);

create policy "Anyone can insert comparisons"
  on comparisons for insert
  with check (true);
```

4. לחץ "Run" (Ctrl/Cmd + Enter)

#### ד. קבל API Keys:
1. לחץ "Settings" → "API"
2. העתק את:
   - **Project URL**
   - **anon public key**

### 3️⃣ הגדר משתני סביבה (30 שניות)

צור קובץ `.env.local` בשורש הפרויקט:

```bash
NEXT_PUBLIC_SUPABASE_URL=כאן_את_ה_URL_שלך
NEXT_PUBLIC_SUPABASE_ANON_KEY=כאן_את_המפתח_שלך
```

### 4️⃣ הרץ! (10 שניות)

```bash
npm run dev
```

פתח: **http://localhost:3000**

---

## ✅ בדיקה מהירה

1. העלה תמונה ישנה
2. העלה תמונה חדשה
3. לחץ "צור השוואה"
4. גרור את ה-slider!
5. נסה את כפתור השיתוף
6. נסה לייצא GIF

---

## 🆘 בעיות?

### ❌ "נדרשת הגדרה"
→ ודא ש-`.env.local` קיים ומכיל את הערכים הנכונים

### ❌ "Failed to upload"
→ ודא ש-bucket הוא Public ב-Supabase

### ❌ תמונות לא מוצגות
→ בדוק את ה-URL של Supabase ב-`.env.local`

---

## 🎉 זהו!

האתר שלך עובד! תהנה 🚀

**צריך עזרה נוספת?** ראה:
- [SETUP.md](./SETUP.md) - הוראות מפורטות
- [README.md](./README.md) - תיעוד מלא
- [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) - סיכום טכני

