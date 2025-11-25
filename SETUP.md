# הוראות הגדרה - Old vs New

## 1. הגדרת Supabase

### צור פרויקט חדש ב-Supabase:

1. היכנס ל-[Supabase Dashboard](https://app.supabase.com)
2. לחץ על "New Project"
3. בחר ארגון או צור חדש
4. תן שם לפרויקט והגדר סיסמת מסד נתונים חזקה
5. בחר אזור (Region) קרוב אליך
6. לחץ "Create new project" והמתן כ-2 דקות

### 2. הגדרת Storage Bucket:

1. בצד שמאל, לחץ על "Storage"
2. לחץ "Create a new bucket"
3. שם ה-bucket: `comparisons`
4. **חשוב:** הגדר את ה-bucket כ-**Public** (סמן "Public bucket")
5. לחץ "Create bucket"

### 3. הגדרת Database:

1. בצד שמאל, לחץ על "SQL Editor"
2. לחץ "New query"
3. העתק והדבק את הקוד הבא:

```sql
-- יצירת טבלת השוואות
create table comparisons (
  id uuid default gen_random_uuid() primary key,
  slug text unique not null,
  before_image_url text not null,
  after_image_url text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- אינדקס על slug לחיפוש מהיר
create index comparisons_slug_idx on comparisons(slug);

-- הפעלת Row Level Security
alter table comparisons enable row level security;

-- מדיניות: כולם יכולים לקרוא השוואות
create policy "Anyone can read comparisons"
  on comparisons for select
  using (true);

-- מדיניות: כולם יכולים ליצור השוואות
create policy "Anyone can insert comparisons"
  on comparisons for insert
  with check (true);
```

4. לחץ "Run" (או Ctrl/Cmd + Enter)

### 4. קבלת מפתחות ה-API:

1. בצד שמאל, לחץ על "Settings" (⚙️)
2. לחץ על "API"
3. העתק את הערכים הבאים:
   - **Project URL** - זה ה-`NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key - זה ה-`NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 5. הגדרת משתני סביבה:

1. צור קובץ `.env.local` בשורש הפרויקט
2. הוסף את המשתנים (החלף בערכים שלך):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 6. הרצת הפרויקט:

```bash
# התקנת חבילות (אם עדיין לא עשית)
npm install

# הרצה במצב פיתוח
npm run dev
```

פתח בדפדפן: [http://localhost:3000](http://localhost:3000)

## 7. בדיקה:

1. העלה שתי תמונות (Before ו-After)
2. לחץ "צור השוואה"
3. תועבר לדף ההשוואה עם ה-slider האינטראקטיבי
4. נסה את כפתור השיתוף
5. נסה את כפתור ייצוא ה-GIF

## 8. פריסה (Deploy):

### Vercel (מומלץ):

```bash
npm install -g vercel
vercel
```

**חשוב:** הוסף את משתני הסביבה גם ב-Vercel Dashboard:
1. Project Settings → Environment Variables
2. הוסף `NEXT_PUBLIC_SUPABASE_URL` ו-`NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Netlify:

```bash
npm install -g netlify-cli
netlify deploy
```

## בעיות נפוצות:

### ❌ "Missing images" error
- ודא שהעלת שתי תמונות
- בדוק את הקונסול לשגיאות

### ❌ תמונות לא מוצגות
- ודא ש-bucket ב-Supabase מוגדר כ-Public
- בדוק שה-URL של Supabase נכון

### ❌ שגיאה ביצירת השוואה
- ודא שהרצת את קוד ה-SQL בצורה מלאה
- בדוק את ה-Policies ב-Supabase

### ❌ GIF לא נוצר
- ודא שקובץ `gif.worker.js` נמצא בתיקייה `public`
- בדוק את הקונסול לשגיאות

## תמיכה:

אם יש בעיות, בדוק:
1. את הקונסול בדפדפן (F12)
2. את הלוגים של Next.js בטרמינל
3. את הלוגים של Supabase Dashboard

---

✨ הצלחה! האתר שלך מוכן לשימוש!

