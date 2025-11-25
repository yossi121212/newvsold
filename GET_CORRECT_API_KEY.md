# 🔑 איך למצוא את ה-API Key הנכון

## לך לדף הזה:
https://supabase.com/dashboard/project/ewfrofdnvqdcvfffzpdw/settings/api

---

## תראה משהו כזה:

```
┌─────────────────────────────────────────────────────────────┐
│ Project URL                                                 │
│ https://ewfrofdnvqdcvfffzpdw.supabase.co                   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ API Keys                                                    │
│                                                             │
│ anon public                                  👈 זה מה שצריך!│
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...         │
│                                                             │
│ service_role secret                                         │
│ eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOi...         │
└─────────────────────────────────────────────────────────────┘
```

---

## ⚠️ חשוב!

צריך את **anon public** - זה KEY מאוד ארוך שמתחיל ב-:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**לא את**:
- ❌ `sb_publishable_...` (זה לא הנכון)
- ❌ `sb_secret_...` (זה מסוכן)

---

## תעתיק את ה-anon public key ותשלח לי!

