# 🚀 Supabase Setup - 5 דקות!

## צעד 1️⃣: צור פרויקט חדש

1. לך ל-https://supabase.com/dashboard
2. לחץ **"New Project"**
3. מלא את הפרטים:
   - **Name:** `newvsold`
   - **Database Password:** צור סיסמה חזקה ושמור אותה!
   - **Region:** בחר הכי קרוב אליך
4. לחץ **"Create new project"** 
5. ⏳ **המתן 2 דקות** עד שהפרויקט מוכן

---

## צעד 2️⃣: העתק API Keys

1. לחץ על ⚙️ **Settings** בתפריט השמאלי
2. לחץ **API** בתפריט המשנה
3. תראה 2 דברים חשובים:

```
Project URL: https://xxxxxxxxxx.supabase.co
anon public: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## צעד 3️⃣: צור .env.local

צור קובץ חדש בשם `.env.local` בשורש הפרויקט:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**החלף את הערכים שלך!**

---

## צעד 4️⃣: צור Storage Bucket

1. לחץ **Storage** בתפריט השמאלי
2. לחץ **"New bucket"**
3. שם: `comparisons`
4. ✅ סמן **"Public bucket"** (חשוב!)
5. לחץ **"Create bucket"**

---

## צעד 5️⃣: הרץ SQL

1. לחץ **SQL Editor** בתפריט השמאלי
2. לחץ **"New query"**
3. העתק והדבק את ה-SQL הבא:

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

-- Enable RLS (Row Level Security)
alter table comparisons enable row level security;

-- Allow everyone to read comparisons
create policy "Anyone can read comparisons"
  on comparisons for select
  using (true);

-- Allow everyone to create comparisons
create policy "Anyone can insert comparisons"
  on comparisons for insert
  with check (true);
```

4. לחץ **"Run"** (או `Cmd + Enter`)
5. אמור לראות: ✅ **"Success. No rows returned"**

---

## ✅ זהו! עכשיו תרענן את הדפדפן

```bash
# הסרבר רץ ב:
http://localhost:3000
```

רענן עם `Cmd + Shift + R`

---

## 🧪 בדוק שזה עובד:

1. העלה 2 תמונות (Before/After)
2. לחץ **"Create Comparison"**
3. אם זה עובד - תקבל לינק! 🎉
4. אם לא - תראה הודעה "Demo Mode Active"

---

## ❓ בעיות?

### ❌ "Failed to create comparison"
- בדוק ש-`.env.local` קיים ויש בו ערכים נכונים
- בדוק ש-bucket `comparisons` קיים והוא Public
- רענן את הדפדפן עם Cmd+Shift+R

### ❌ "Table comparisons does not exist"
- הרץ את ה-SQL שוב ב-SQL Editor

### ❌ תמונות לא נטענות
- בדוק ש-bucket הוא **Public**
- לחץ על bucket → **Settings** → ✅ Public

---

**אני כאן לעזור! תגיד לי אם משהו לא עובד** 😊

