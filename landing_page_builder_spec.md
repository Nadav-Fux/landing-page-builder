# אפיון פרויקט – Landing Page Builder עם AI + עורך ויזואלי

## תיאור כללי

מערכת אינטרנטית (PWA) לבניית דפי נחיתה מותאמים אישית באופן אוטומטי בעזרת AI, עם אפשרות עריכה ויזואלית מתקדמת ב-Drag & Drop. המערכת משלבת יצירת תוכן ועיצוב באמצעות AI, קטלוג תבניות חינמיות, שילוב רכיבים מוכנים, ופרסום ישיר לשרתים. המטרה היא לאפשר לכל משתמש, גם ללא ידע טכני, ליצור דפי נחיתה איכותיים ומקצועיים בתוך דקות.

---

## מטרות

1. הפקת דפי נחיתה על בסיס טופס Brief – כולל תחום, קהל יעד, צבעים, שפה, CTA ותוכן.
2. עריכה ויזואלית עם GrapesJS – שליטה מלאה במבנה, בעיצוב ובתוכן.
3. שילוב ספריות רכיבים (React Bits, MagicUI, AlignUI, BentoGrids) להאצת פיתוח.
4. קטלוג תבניות חינמיות (10+) עם תצוגה מקדימה וטעינה לעריכה.
5. ייצוא ZIP עם HTML+CSS+Assets או פרסום ישיר ל-Vercel/Netlify/Cloudflare Pages.
6. תמיכה ב-RTL ו-LTR, רספונסיביות ונגישות מלאה.

---

## טכנולוגיות עיקריות

- **Frontend:** Next.js (App Router) + TailwindCSS + shadcn/ui.
- **עורך ויזואלי:** GrapesJS משולב ב-React.
- **AI Layer:** OpenRouter (עם BYOK – OpenAI, Anthropic, Gemini, Mistral).
- **MCP:** Context7 + מקורות UI להוספת רכיבים ודוגמאות בזמן אמת.
- **אחסון נתונים:** Supabase/PostgreSQL.
- **אחסון קבצים:** S3/R2.
- **פרסום:** Vercel/Netlify/Cloudflare Pages.

---

## פיצ'רים עיקריים + דוגמאות קוד

### 1. יצירת דף עם AI

```ts
const html = await ai.generateHTML({
  brief,
  theme,
  blocks: ['Hero','Features','Pricing','Testimonials','CTA'],
  responsive: true,
});
```

### 2. טעינת דף ל-GrapesJS

```tsx
const editor = grapesjs.init({
  container: '#editor',
  height: '100vh',
  storageManager: false,
  plugins: ['gjs-blocks-basic'],
});
editor.setComponents(html);
editor.setStyle(css);
```

### 3. קטלוג תבניות

```ts
fetch('/templates/manifest.json')
  .then(r=>r.json())
  .then(list => renderTemplateGallery(list.templates));
```

### 4. ייצוא קוד ל-ZIP

```ts
function exportZip(){
  const html = editor.getHtml();
  const css = editor.getCss();
  zip.file('index.html', html);
  zip.file('styles.css', css);
  zip.generateAsync({type:'blob'}).then(saveAs);
}
```

### 5. פרסום ישיר

- התחברות OAuth ל-Vercel/Netlify/Cloudflare.
- שליחת קוד שנשמר בענן לפרויקט היעד.

---

## זרימת עבודה

1. המשתמש ממלא Brief → שליחה ל-AI.
2. AI יוצר HTML+CSS מותאם.
3. טעינת הדף ל-GrapesJS לעריכה.
4. שמירת גרסאות והיסטוריה.
5. פרסום/ייצוא.
6. ניתוח נתונים ושיפורים עתידיים.

---

## דרישות טכניות

- תמיכה מלאה ב-RTL ו-LTR.
- רספונסיביות מלאה.
- הצפנת API Keys למשתמשים.
- מערכת הרשאות עם Supabase Auth / NextAuth.
- עמידה בתקני נגישות WCAG 2.1.

---

## הרחבות עתידיות

- A/B Testing עם ניתוח ביצועים.
- שילוב Analytics (GA, Hotjar, Heap).
- אינטגרציה CRM (HubSpot, Salesforce, Zoho).
- יבוא עיצובים מ-Figma דרך MCP.
- כפתורי CTA ל-WhatsApp API.
- ספריית רכיבים מתקדמת לשימוש מהיר.



---

## ארכיטקטורה פרקטית + צעדי הקמה

### מה בונים?

**PWA עצמאית** (למשל Next.js) שמבצעת:

1. **יצירה אוטומטית של דף נחיתה** בעזרת AI (BYOK לכל ספקים פופולריים).
2. **עריכה ויזואלית** של הדף עם GrapesJS ישירות באפליקציה.
3. **פרסום בלחיצה** (Netlify/Vercel/Cloudflare Pages) + יצוא קוד מלא.
4. **חיבורי MCP** כדי "להאכיל" את ה‑AI בדוקומנטציה/דוגמאות עדכניות מעולמות UI/Design (Context7, MUI ועוד).

> הערה חשובה על TRAE: היו דיונים פומביים לאחרונה על טלמטריה/פרטיות בכלי (אפילו כשה‑toggle כבוי יש דיווחים על תעבורה). זה לא חוסם את השימוש בו ליצירת הקוד הראשוני, אבל שים לב למדיניות ולסביבה בה אתה מריץ אותו, במיוחד בקוד רגיש. ראו: Windows Central , Cybernews , Unit221B Blog .

---

### רכיבים מרכזיים

#### 1) ה‑Frontend (PWA)

- **Next.js** עם App Router.
- **GrapesJS Studio SDK** (קומפוננט React מוכן) כדי לשלב עורך בלוקים מתקדם בתוך האפליקציה. יש דוגמה רשמית ל‑Next.js. ראו: GrapesJS , Nifty Little Me , Stack Overflow .
- תמיכה ב‑RTL, שמירה אוטומטית, תבניות (Templates) קטלוגיות.

#### 2) שכבת ה‑AI (BYOK)

אבסטרקציה אחת מעל ספקים שונים:

- **OpenRouter** כשכבת מולטי‑מודלים (אפשר להחליף מודל בלי לשנות קוד).
- **OpenAI / Anthropic / Google Gemini / Mistral** – מחברים מפתחות ב‑BYOK לכל משתמש.
- Policy חכמה: rate‑limit פר משתמש, whitelisting של מודלים, ובקרת עלויות.

#### 3) העורך הוויזואלי (GrapesJS)

- טעינת HTML/CSS/JS שנוצרו ע"י ה‑AI ישירות לתוך GrapesJS לעריכה ידנית (drag & drop), ואז **ייצוא קוד מלא** למשתמש.
- יתרון: קוד נקי, אין נעילה לפלטפורמה.

#### 4) MCP (Model Context Protocol)

- **Context7 MCP Server** כדי להביא לתוך הפרומפטים **דוקומנטציה/דוגמאות עדכניות** בזמן ריצה (למשל, "תביא לי קומפוננטה של navbar רספונסיבי ב‑Next.js 14 + Tailwind"). מקורות: GitHub , Upstash Blog , Reddit .
- **MUI MCP** — גישה ישירה לתיעוד הרשמי של Material UI: קומפוננטות, פרופס, קוד מעודכן. זהב ליצירת בלוקים יפים ונכונים. ראו: MUI .
- (אופציונלי מתקדם) **Figma MCP** — אם יש קבצי עיצוב, ניתן לאפשר ל‑AI לקרוא שכבות/טוקנים (צבעים/spacing וכו') ולהמיר לדף קוד. זה חוסך "טעות תרגום" מעיצוב לקוד. ראו: The Verge .
- תיעוד MCP רשמי כדי לתכנן כלים פנימיים (למשל MCP שמוציא קטעי Tailwind לפי design tokens). ראו: Model Context Protocol , Axios .

#### 5) Back‑end קליל

- Next.js API routes / Edge Functions.
- שמירת פרויקטים (Postgres/Supabase או Mongo).
- אחסון קבצים (S3/Cloudflare R2) אם צריך תמונות.

#### 6) פרסום/Deploy

- כפתור **Publish**: Build סטטי → דחיפה אוטומטית ל‑Vercel/Netlify/Cloudflare Pages (ללקוח או לחשבון שלך ע"פ הרשאה).

---

### זרימת עבודה (Flow)

1. **Brief** — המשתמש עונה על שאלון קצר (ענף, קהל, צבעים, tone of voice, מבצעים, CTA).
2. **Prompt Compose** — המערכת בונה פרומפט עשיר, ומבקשת מה‑AI (דרך OpenRouter/ספק ישיר) לייצר שלד HTML + Tailwind + סקשנים נפוצים (Hero, Features, Social Proof, FAQ, CTA).
3. **MCP Enrichment** — לפני הקריאה ל‑AI, מושכים ב‑MCP קטעי קוד/דוקו עדכניים (Context7, MUI). זה מצמצם "הזיות" ומייצר קוד עדכני באמת. ראו: GitHub , Upstash , MUI .
4. **Load to Editor** — טוענים את הפלט ל‑GrapesJS לשיוף ויזואלי.
5. **AI Assist בתוך העורך** (אופציונלי): כפתור "שפר סקשן", "ייצר גרסה שנייה", "חולל A/B".
6. **Export/Publish** — יצוא קוד מלא או פרסום בלחיצה.
7. **Analytics & Versions** — שמירה ב‑DB, יצירת גרסאות/טיוטות, השוואת דיפים.

---

### פרייבסי ואבטחה (במיוחד סביב TRAE)

- השתמש ב‑TRAE **רק** ליצירת הקוד הראשוני (בסביבה נקייה), והרץ את האפליקציה עצמה **מחוץ** ל‑TRAE.
- הפרד סודות (API Keys) בסביבות Production — לא לשמור מפתחות בקוד/לקוח.
- קרא את הדיונים האחרונים על טלמטריה של TRAE והחליט אם מתאים בסביבה ארגונית/רגישה. ראו: Windows Central , Cybernews .

---

### MVP – מה לבנות בשבוע ראשון

1. **Next.js + GrapesJS Studio SDK** (דוגמת Next.js רשמית זמינה). ראו: GrapesJS .
2. מסך **Brief** → קריאה ל‑AI דרך OpenRouter (מודל ברירת מחדל).
3. טעינת הפלט ל‑GrapesJS, כפתור **Export**.
4. חיבור **MCP של Context7** כדי להזין דוגמאות/דוקו אמיתיות לפרומפטים (למשל "Navbar + Hero ב‑Tailwind v3"). ראו: GitHub , Upstash .

---

### Roadmap קצר (שדרוגים)

- **A/B Testing Generator**: יצירת שתי וריאציות אוטומטיות + הטמעת סקריפט ניסויים.
- **Blocks Marketplace**: ספרייה של בלוקים מוכנים (Testimonials, Pricing, Gallery) שנולדו מה‑AI, מאושרים ידנית.
- **Figma MCP**: ייבוא עיצוב ישירות מקובץ Figma (טוקנים + קומפוננטות). ראו: The Verge .
- **Multi‑AI Strategy**: כלל ניתוב מודלים (מהיר/זול ל‑draft, איכותי ל‑final).
- **Deploy Providers**: הרשאות OAuth לפרסום ל‑Vercel/Netlify בחשבון הלקוח.

---

### למה זה עובד עסקית

- **מהירות**: לקוח מקבל דף מוכן תוך דקות, לא "וורדפרס‑טמפלייט".
- **שליטה**: אפשר לערוך ויזואלית בלי לגעת בקוד.
- **איכות**: MCP מזין את ה‑AI בחומר עדכני ורלוונטי (קוד אמיתי, לא רק זיכרון המודל). ראו: Model Context Protocol .
- **גמישות**: BYOK — לקוח יכול להביא מפתח‑API משלו ולהוזיל עלויות.

---

### מקורות/קישורים



---

## משאבים וכלים (מהסרטון)

- **React Bits** – רכיבי React מתקדמים (אנימציות, תבניות חזקות ל‑Hero/Features/Pricing).
- **Tweak CN** – התאמת Theme (צבעים/טוקנים) תואם Tailwind ו‑shadcn.
- **shadcn/ui** – ספריית קומפוננטות בסיסיות ל‑Next.js + Tailwind.
- **MagicUI Pro** – קומפוננטות פרימיום (קרדיטים, טיפוגרפיה, Motion) לצמצום זמן פיתוח.
- **AlignUI Pro** – בלוקים מעוצבים מוכנים לשילוב (Landing Sections).
- **BentoGrids** – פריסות “בנטו” מודרניות לתצוגת פיצ’רים/גלריה.
- **Grainient Freebies** – רקעים/מעברי צבע/Glow ל‑Hero/CTA.
- **Google Fonts** – בחירת 1–2 פונטים בסיסיים (למשל Inter/DM Sans).

> שימוש מוצע: קובעים Theme בסיסי (Tweak CN + Tailwind tokens), מעליו משלבים shadcn/ui, ואז מוסיפים בלוקים נבחרים מ‑React Bits / MagicUI / AlignUI, עם BentoGrids כתבניות פריסה.

---

## פרומפטים מוכנים (עברית/English)

### 1) שכפול עיצוב קיים (Design Profile Extraction)

**עברית**

```
קח את האתר/אפליקציה/קוד הזה וייצר לי קובץ JSON שמכיל את כל הגדרות העיצוב (design system):
- צבעים, פונטים, גדלים, ריווח, צללים, גבולות, פינות מעוגלות וכו'.
- סדר היררכי מלא של כל ההגדרות.
- אם חסר ערך – תבחר ערך הגיוני והסבר למה.
- theme מלא (בהיר וכהה אם יש).
המבנה לדוגמה:
{
  "colors": { "primary": "#1a73e8", ... },
  "fontFamily": "Inter, sans-serif",
  ...
}
שמור הכל כך שאוכל לשכפל את הסגנון הזה בדיוק.
```

**English**

```
Take this website/app/code and generate a JSON file containing the entire design system:
- Colors, fonts, sizes, spacing, shadows, borders, border-radius, etc.
- Complete hierarchical structure of all settings.
- If any value is missing, choose a logical default and explain why.
- Full theme (light and dark, if available).
Example structure:
{
  "colors": { "primary": "#1a73e8", ... },
  "fontFamily": "Inter, sans-serif",
  ...
}
Keep all necessary data so I can replicate this exact style.
```

### 2) בניית אפליקציה/עמוד לפי design.json

**עברית**

```
בנה לי דשבורד חינוכי מלא ב-HTML, CSS ו-JavaScript, שיכלול:
- פאנל למורים, תלמידים, שיעורים, ציונים
- מערכת הודעות, איזור משתמש
השתמש אך ורק בהגדרות העיצוב מקובץ design.json המצורף.
אל תשתמש בערכי עיצוב דיפולטיביים – הכל לפי ה-theme.
אם חסר ערך – קח מהקובץ בלבד.
design.json:
[הדבק כאן את הקובץ]
```

**English**

```
Build me a full educational dashboard in HTML, CSS, and JavaScript, including:
- Panels for teachers, students, classes, grades
- Notifications system, user area
Use only the design settings from the attached design.json file.
Do not use any default design values—everything must follow the theme.
If a value is missing, use only what's in the file.
design.json:
[paste the file here]
```

### 3) שימוש ב‑TweakCN/shadcn Theme ל‑Landing Page

**עברית**

```
הכנתי theme מותאם אישית ב-TweakCN (הקוד למטה):
/* קוד CSS */
בנה דף נחיתה עם 6 סקשנים:
- Hero עם כותרת חזקה, תיאור וכפתור קריאה לפעולה
- שלושה אזורי פיצ'רים (כרטיסים)
- טסטימוניאלס (המלצות)
- קריאה לפעולה בסוף
כל הרכיבים חייבים להשתמש רק ב-theme הזה – לא להוסיף CSS נוסף.
הכל צריך להיות רספונסיבי ונגיש.
```

**English**

```
I created a custom theme in TweakCN (code below):
/* CSS code */
Build a landing page with 6 sections:
- Hero with a strong headline, description, and CTA button
- Three feature sections (cards)
- Testimonials
- Final call to action
All components must use only this theme—do not add any extra CSS.
Everything must be responsive and accessible.
```

### 4) שימוש ברכיבי פרימיום (React Bits / MagicUI / AlignUI)

**עברית**

```
בנה עמוד נחיתה ב-Next.js עם 6 סקשנים.
בסקשן הפיצ'רים (features section) השתמש ברכיב הבא (tinted card) כפי שהוא:
[הדבק כאן את קוד הרכיב]
התקן כל תלות נדרשת (למשל framer-motion).
אם יש תמונת placeholder – הסר אותה.
הפוך את הרכיב ל-reusable כך שאוכל להשתמש בו שוב בקלות.
כל שאר הקוד צריך להיות תואם ל-theme הכללי.
```

**English**

```
Build a landing page in Next.js with 6 sections.
In the features section, use the following component (tinted card) exactly as provided:
[paste the component code here]
Install all required dependencies (e.g., framer-motion).
If there is a placeholder image, remove it.
Make the component reusable so I can use it again easily.
All other code should match the general theme.
```

---

## מקורות טמפלטים חינמיים (להורדה ושילוב)

1. **ThemeWagon** – סינון לפי חינם/בתשלום, Bootstrap/Tailwind:\
   [https://themewagon.com/theme-category/landing-website/?pa\_price=free](https://themewagon.com/theme-category/landing-website/?pa_price=free)
2. **Cruip – Free Tailwind** – דפי נחיתה מודרניים:\
   [https://cruip.com/free-tailwindcss-templates/](https://cruip.com/free-tailwindcss-templates/)
3. **Tailwind UI Kit (Free)** – קומפוננטות ודפי נחיתה:\
   [https://tailwinduikit.com/components/website/landing-pages](https://tailwinduikit.com/components/website/landing-pages)
4. **UIdeck (Free)** – תבניות HTML/Bootstrap נקיות:\
   [https://uideck.com/templates/](https://uideck.com/templates/)
5. **BootstrapMade** – דפי נחיתה Bootstrap חינמיים:\
   [https://bootstrapmade.com/bootstrap-landing-page-templates/](https://bootstrapmade.com/bootstrap-landing-page-templates/)
6. **HTML5 UP** – תבניות חינמיות (CC):\
   [https://html5up.net/](https://html5up.net/)
7. **Flowbite (Free)** – קומפוננטות Tailwind + טמפלטים:\
   [https://flowbite.com/templates/](https://flowbite.com/templates/)

> שימוש מומלץ: להחזיק "Default Templates" (למשל 10), להטעין אותם ישירות ל‑GrapesJS או להזין אותם כ‑context למודלי ה‑AI ליצירת עמודים בסגנון זהה.

---

## דוגמאות קוד – טעינת תבניות ל‑GrapesJS

**טעינת טמפלט בודד**

```js
// נניח שה‑ZIP נפרס לתיקייה /templates/
async function loadTemplateToGrapes(editor, entryPath="/templates/saas-starter/index.html"){
  const html = await fetch(entryPath).then(r=>r.text());
  editor.setComponents(html);         // מטעין את ה‑HTML
  // אם תרצה גם CSS:
  const css = await fetch("/templates/saas-starter/styles.css").then(r=>r.text());
  editor.setStyle(css);
}
```

**דפדוף ובחירה מתוך manifest**

```js
async function listTemplates(){
  const man = await fetch("/templates/manifest.json").then(r=>r.json());
  // מציג כרטיסים עם man.templates[i].thumbnail + name + description
}

function pickTemplate(editor, id){
  const base = `/templates/${id}`;
  Promise.all([
    fetch(`${base}/index.html`).then(r=>r.text()),
    fetch(`${base}/styles.css`).then(r=>r.text())
  ]).then(([html, css])=>{
    editor.setComponents(html);
    editor.setStyle(css);
  });
}
```

---

## הערות פרקטיות

- שמרו על **Theme אחיד** (Tweak CN + Tailwind tokens) לפני הוספת בלוקים ממקורות שונים.
- טעינת GrapesJS צריכה להתבצע **Client‑side בלבד** (dynamic import ב‑Next.js).
- ב‑BYOK, אחסנו מפתחות מוצפנים לכל משתמש והגבילו שימוש (Rate Limit) ברמת חשבון.
- ניתן להוסיף **A/B Generator**: יצירת וריאציה שנייה ע"פ אותו Theme + שינויי copy/סדר סקשנים.

