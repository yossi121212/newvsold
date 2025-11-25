# newvsold - Image Comparison Tool 🎨

Modern before/after image comparison with an interactive slider, Supabase storage, and GIF export.

![Demo](https://img.shields.io/badge/Status-Ready-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

## 🚀 התקנה מהירה

### 1. התקן חבילות:
```bash
npm install
```

### 2. הגדר Supabase:

📖 **ראה את [SETUP.md](./SETUP.md) להוראות הגדרה מפורטות!**

קיצור דרך:
- צור פרויקט ב-[Supabase](https://supabase.com)
- צור Storage bucket בשם `comparisons` (Public)
- הרץ את קוד ה-SQL (ראה SETUP.md)
- העתק את ה-API keys

### 3. הגדר משתני סביבה:

צור קובץ `.env.local` והוסף:
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. הרץ את הפרויקט:

```bash
npm run dev
```

🎉 פתח [http://localhost:3000](http://localhost:3000) בדפדפן!

## ✨ תכונות

- 🖼️ **העלאת תמונות** - drag & drop או בחירת קבצים
- 🎯 **Slider אינטראקטיבי** - גרור את העכבר לראות את ההבדלים
- 🔗 **שיתוף קל** - לינק ייחודי לכל השוואה
- 📥 **ייצוא GIF** - הורד את ההשוואה כ-GIF מונפש
- 🎨 **עיצוב מודרני** - responsive לכל המסכים
- 💾 **אחסון קבוע** - כל ההשוואות נשמרות ב-Supabase
- 🌙 **Dark Mode** - תמיכה במצב כהה

## 🛠️ טכנולוגיות

- **Next.js 14** - App Router, Server Components
- **React 18** - עם TypeScript
- **Tailwind CSS** - עיצוב מודרני
- **Supabase** - Storage + PostgreSQL Database
- **GIF.js** - יצירת GIF מונפש
- **html-to-image** - צילום מסך של ה-slider

## 📁 מבנה הפרויקט

```
Oldvsnew/
├── app/
│   ├── page.tsx              # דף הבית - העלאת תמונות
│   ├── comparison/[slug]/    # דף ההשוואה
│   ├── api/upload/           # API להעלאת תמונות
│   └── layout.tsx            # Layout ראשי
├── components/
│   ├── ImageUploader.tsx     # רכיב העלאת תמונות
│   ├── ComparisonSlider.tsx  # Slider אינטראקטיבי
│   ├── ComparisonView.tsx    # תצוגת ההשוואה
│   ├── ShareButton.tsx       # כפתור שיתוף
│   ├── GifExporter.tsx       # ייצוא GIF
│   └── Footer.tsx            # פוטר
├── lib/
│   └── supabase.ts           # Supabase client
├── types/
│   ├── comparison.ts         # TypeScript types
│   └── gif.js.d.ts          # Type definitions
└── public/
    ├── gif.worker.js         # GIF.js worker
    └── favicon.svg           # Favicon

```

## 🚀 פריסה (Deployment)

### Vercel (מומלץ):
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

```bash
npm install -g vercel
vercel
```

**חשוב:** הוסף את משתני הסביבה ב-Vercel Dashboard!

### Netlify:
```bash
npm install -g netlify-cli
netlify deploy
```

## 📸 צילומי מסך

### דף הבית:
- העלאת תמונות עם drag & drop
- תצוגה מקדימה של התמונות
- כפתור יצירת השוואה

### דף השוואה:
- Slider אינטראקטיבי
- כפתורי שיתוף ו-GIF
- תגיות "ישן" ו-"חדש"

## 🤝 תרומה

רוצה לתרום לפרויקט? מצוין!
1. Fork את הפרויקט
2. צור branch חדש (`git checkout -b feature/amazing-feature`)
3. Commit את השינויים (`git commit -m 'Add amazing feature'`)
4. Push ל-branch (`git push origin feature/amazing-feature`)
5. פתח Pull Request

## 📝 רישיון

MIT License - אתה חופשי להשתמש בקוד לכל מטרה!

## 🐛 דיווח על באגים

מצאת בעיה? פתח Issue עם:
- תיאור הבעיה
- צעדים לשחזור
- צילומי מסך (אם רלוונטי)
- מידע על הדפדפן ומערכת ההפעלה

## 💡 רעיונות לעתיד

- [ ] תמיכה בסרטונים
- [ ] עריכת תמונות בסיסית
- [ ] גלריה של השוואות
- [ ] משתמשים ואימות
- [ ] תגובות והערות
- [ ] שיתוף ברשתות חברתיות

---

**נבנה עם ❤️ על ידי הקהילה**

אם האתר עזר לך, תן ⭐ לפרויקט!

