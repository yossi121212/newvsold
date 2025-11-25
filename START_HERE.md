# 🎯 מתחילים כאן!

## 📍 איפה אני נמצא?

**הפרויקט שלך כבר רץ!** 🎉

```
🌐 פתח בדפדפן: http://localhost:3000
```

### מה זה localhost:3000?

- **localhost** = המחשב שלך
- **3000** = הפורט שבו השרת רץ
- זה כמו אתר אינטרנט, רק על המחשב שלך!

---

## ⚠️ אבל רגע... האתר עדיין לא עובד לגמרי!

אתה תראה אזהרה צהובה: **"נדרשת הגדרה"**

למה? כי עדיין לא הגדרת את **Supabase** (המקום שבו התמונות נשמרות)

---

## 🚀 2 אפשרויות להגדרה:

### אפשרות 1: סקריפט אוטומטי (קל!) ⭐

פתח טרמינל והרץ:

```bash
cd /Users/yossimolcho/Oldvsnew
./setup-supabase.sh
```

הסקריפט ידריך אותך צעד אחר צעד! 

### אפשרות 2: ידני (אם הסקריפט לא עובד)

#### שלב 1: צור פרויקט Supabase

1. לך ל-[supabase.com](https://app.supabase.com)
2. לחץ "New Project"
3. תן שם: `oldvsnew`
4. בחר סיסמה חזקה
5. בחר Region (Europe West)
6. לחץ "Create" והמתן ~2 דקות

#### שלב 2: צור Storage Bucket

1. בתפריט שמאל → "Storage"
2. "Create a new bucket"
3. שם: `comparisons`
4. ✅ סמן "Public bucket"
5. "Create bucket"

#### שלב 3: צור טבלה

1. בתפריט שמאל → "SQL Editor"
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

4. לחץ "Run" (או Ctrl+Enter)

#### שלב 4: קבל מפתחות

1. בתפריט שמאל → "Settings" ⚙️
2. "API"
3. העתק:
   - **Project URL**
   - **anon public** key

#### שלב 5: צור קובץ .env.local

צור קובץ חדש בשם `.env.local` בתיקייה:
```
/Users/yossimolcho/Oldvsnew/.env.local
```

תוכן הקובץ:
```bash
NEXT_PUBLIC_SUPABASE_URL=הדבק_כאן_את_ה_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=הדבק_כאן_את_המפתח
```

#### שלב 6: הפעל מחדש

```bash
# עצור את השרת (Ctrl+C בטרמינל)
# הפעל שוב:
npm run dev
```

---

## ✅ איך אני יודע שזה עובד?

1. פתח: http://localhost:3000
2. **לא תראה** אזהרה צהובה
3. תוכל להעלות תמונות!
4. תלחץ "צור השוואה"
5. תראה את ה-Slider עובד! 🎉

---

## 🆘 עזרה מהירה

### השרת לא רץ?
```bash
cd /Users/yossimolcho/Oldvsnew
npm run dev
```

### שכחתי את ה-URL של Supabase?
לך ל: https://app.supabase.com → בחר פרויקט → Settings → API

### הסקריפט לא עובד?
תשתמש באפשרות 2 (ידני) למעלה

### עדיין לא עובד?
תבדוק את הקונסול בדפדפן (F12) ותראה מה השגיאה

---

## 📚 קבצים נוספים לעזרה:

- **QUICKSTART.md** - הדרכה מהירה
- **SETUP.md** - הדרכה מפורטת
- **README.md** - תיעוד מלא
- **PROJECT_SUMMARY.md** - פרטים טכניים

---

## 🎉 זהו!

**כשהכל עובד:**
1. פתח http://localhost:3000
2. העלה תמונה ישנה
3. העלה תמונה חדשה
4. לחץ "צור השוואה"
5. גרור את ה-Slider!
6. שתף את הלינק!

**תהנה!** 🚀

