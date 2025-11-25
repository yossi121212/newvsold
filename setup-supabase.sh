#!/bin/bash

echo "================================================"
echo "🚀 Supabase Setup Helper"
echo "================================================"
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📝 הוראות הגדרה:${NC}"
echo ""
echo "1️⃣  פתח דפדפן וגש ל: https://app.supabase.com"
echo "2️⃣  לחץ על 'New Project' או בחר פרויקט קיים"
echo ""

read -p "האם יש לך כבר פרויקט Supabase? (y/n): " has_project

if [ "$has_project" != "y" ]; then
    echo ""
    echo -e "${YELLOW}בוא נצור פרויקט חדש:${NC}"
    echo "1. לך ל: https://app.supabase.com"
    echo "2. לחץ 'New Project'"
    echo "3. תן שם לפרויקט (למשל: oldvsnew)"
    echo "4. בחר סיסמה חזקה למסד הנתונים"
    echo "5. בחר Region (Europe West מומלץ)"
    echo "6. לחץ 'Create new project'"
    echo "7. המתן ~2 דקות..."
    echo ""
    read -p "לחץ Enter כשהפרויקט מוכן..."
fi

echo ""
echo -e "${BLUE}🗄️ עכשיו בוא ניצור Storage Bucket:${NC}"
echo ""
echo "1. בפרויקט שלך, לחץ על 'Storage' בתפריט השמאלי"
echo "2. לחץ 'Create a new bucket'"
echo "3. שם: comparisons"
echo "4. ✅ סמן את 'Public bucket' (חשוב!)"
echo "5. לחץ 'Create bucket'"
echo ""
read -p "לחץ Enter כשסיימת..."

echo ""
echo -e "${BLUE}📊 עכשיו בוא נריץ SQL ליצירת הטבלה:${NC}"
echo ""
echo "1. לחץ על 'SQL Editor' בתפריט השמאלי"
echo "2. לחץ 'New query'"
echo "3. העתק את הקוד הבא והדבק בעורך:"
echo ""
echo -e "${GREEN}--- SQL Code ---${NC}"
cat << 'EOF'

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

EOF
echo -e "${GREEN}--- End SQL ---${NC}"
echo ""
read -p "לחץ Enter אחרי שהרצת את ה-SQL..."

echo ""
echo -e "${BLUE}🔑 עכשיו בוא נקבל את המפתחות:${NC}"
echo ""
echo "1. לחץ על 'Settings' (⚙️) בתפריט השמאלי"
echo "2. לחץ על 'API'"
echo "3. תראה שני ערכים חשובים:"
echo "   - Project URL"
echo "   - anon public key"
echo ""

read -p "הדבק את ה-Project URL שלך: " SUPABASE_URL
read -p "הדבק את ה-anon public key שלך: " SUPABASE_KEY

echo ""
echo -e "${BLUE}💾 יוצר קובץ .env.local...${NC}"

cat > .env.local << EOF
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_KEY
EOF

echo ""
echo -e "${GREEN}✅ הקובץ .env.local נוצר בהצלחה!${NC}"
echo ""
echo -e "${YELLOW}🔄 עכשיו צריך להפעיל מחדש את השרת:${NC}"
echo ""
echo "1. עצור את השרת הנוכחי (Ctrl+C)"
echo "2. הרץ שוב: npm run dev"
echo "3. פתח: http://localhost:3000"
echo ""
echo -e "${GREEN}🎉 מזל טוב! הכל מוכן!${NC}"
echo ""

