# Landing Page Builder — Implementation Plan

> **For: AI Agent tasked with building this out**
> **Created: 2026-04-06**
> **Base project: ROOT (Next.js + Puck)**
> **Reference project: L2 (Vite + Craft.js) — use for inspiration, NOT as codebase**

---

## What Is This Project?

A landing page builder for Hebrew-speaking users. Two modes:

1. **AI Mode** — User describes their business, AI generates a complete landing page
2. **Manual Mode** — User drags blocks, edits text/colors, builds their own page

Stack: Next.js 16, React 19, Puck editor, Prisma + SQLite, TailwindCSS, NextAuth.

---

## CRITICAL: Documentation Rules

**You MUST follow these rules throughout your work:**

1. After completing each phase, update the `## Progress Log` section at the bottom of this file
2. For each task, log: what you did, what files you changed, any decisions you made
3. If you deviate from the plan, explain WHY in the log
4. If you encounter a bug or blocker, document it before moving on
5. Never delete or overwrite existing working code without documenting what you removed and why
6. Commit after each completed phase with a descriptive message

---

## Phase 0: Cleanup (Do First)

### 0.1 Remove junk files
- [ ] Delete `cursor_.md` (447KB chat log — should not be in repo)
- [ ] Delete root-level `/app/` directory (legacy, conflicts with `/src/app/`)
- [ ] Delete `prisma/dev.db` and `prisma/dev.db-journal` (local dev artifacts)
- [ ] Add `prisma/dev.db` and `prisma/dev.db-journal` to `.gitignore`
- [ ] Add `cursor_.md` to `.gitignore`
- [ ] Delete the `nul` file if it exists (Windows artifact)

### 0.2 Fix known bugs
- [ ] Fix templates page data fetch bug: in `src/app/templates/page.tsx`, the fetch does `setTemplates(data)` but the API returns `{ success, data, pagination }` — should be `setTemplates(data.data)`
- [ ] Fix Footer renderer in `src/lib/puck/renderer.ts` — currently outputs only a hardcoded copyright line, ignoring all configured columns, social links, and logo

### 0.3 Update README
- [ ] Update `README.md` to reflect current state (auth works, editor works, templates work)
- [ ] Remove TODO items that are already done

**Commit: "Phase 0: Cleanup — remove junk files, fix bugs"**

---

## Phase 1: Rewrite HTML Export to Tailwind (HIGH PRIORITY)

The current `src/lib/puck/renderer.ts` outputs ugly inline styles. Rewrite it to produce production-quality HTML using Tailwind CDN, matching the quality of the L2 export.

### 1.1 New HTML page wrapper

Replace the current HTML shell in `renderPuckDataToHTML()` with:

```html
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{pageTitle}</title>
  <meta name="description" content="{description}" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{pageTitle}" />
  <meta property="og:description" content="{description}" />
  <meta name="twitter:card" content="summary_large_image" />
  <script src="https://cdn.tailwindcss.com/3.4.16"></script>
  <link href="https://fonts.googleapis.com/css2?family=Heebo:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: 'Heebo', sans-serif; margin: 0;
           -webkit-font-smoothing: antialiased; }
    img { max-width: 100%; height: auto; }
    details summary::-webkit-details-marker,
    details summary::marker { display: none; }
    details summary { list-style: none; }
    .faq-chevron { transition: transform 0.3s ease; }
    details[open] .faq-chevron { transform: rotate(180deg); }
  </style>
</head>
<body>{bodyContent}</body>
</html>
```

### 1.2 Rewrite each component's HTML output

For EACH existing component, replace inline styles with Tailwind classes. Use these patterns from L2:

**Hero:**
```html
<section class="relative min-h-[500px] flex items-center justify-center overflow-hidden"
         style="background:linear-gradient(135deg,{bgFrom},{bgTo})">
  <div class="absolute inset-0 bg-black/20"></div>
  <div class="relative z-10 max-w-4xl mx-auto px-8 text-center">
    <h1 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">{title}</h1>
    <p class="text-xl text-white/80 mb-10 max-w-2xl mx-auto">{subtitle}</p>
    <a href="{buttonLink}" class="inline-block px-8 py-4 bg-white text-gray-900 font-bold rounded-full text-lg hover:bg-gray-100 transition-all shadow-xl">{buttonText}</a>
  </div>
</section>
```

**FeatureList:**
```html
<section class="py-20 px-6" style="background-color:{bgColor}">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
      <p class="text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    </div>
    <div class="grid md:grid-cols-{columns} gap-8">
      <!-- per feature -->
      <div class="p-8 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
        <h3 class="text-xl font-bold text-gray-900 mb-3">{title}</h3>
        <p class="text-gray-600">{description}</p>
      </div>
    </div>
  </div>
</section>
```

**Pricing:**
```html
<section class="py-20 px-6">
  <div class="max-w-7xl mx-auto">
    <div class="text-center mb-16">...</div>
    <div class="grid md:grid-cols-{tierCount} gap-8 items-stretch">
      <!-- normal tier -->
      <div class="relative rounded-2xl p-8 flex flex-col bg-white border border-gray-200 shadow-sm">
        ...
      </div>
      <!-- highlighted tier -->
      <div class="relative rounded-2xl p-8 flex flex-col bg-indigo-600 text-white shadow-2xl scale-105 z-10">
        <div class="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-gray-900 text-xs font-bold px-4 py-1.5 rounded-full">Most Popular</div>
        ...
      </div>
    </div>
  </div>
</section>
```

**FAQ (use native `<details>/<summary>`):**
```html
<section class="py-20 px-6">
  <div class="max-w-3xl mx-auto">
    <div class="text-center mb-14">...</div>
    <div class="space-y-3">
      <details class="rounded-2xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow" open>
        <summary class="flex items-center justify-between p-6 cursor-pointer">
          <span class="font-semibold text-gray-900 text-lg">{question}</span>
          <svg class="faq-chevron w-5 h-5">...</svg>
        </summary>
        <p class="px-6 pb-6 text-gray-600 leading-relaxed">{answer}</p>
      </details>
    </div>
  </div>
</section>
```

Follow the same Tailwind pattern for: ContactForm, Testimonials, Stats, CTA, Header, Footer.

### 1.3 Keep escaping
- All text props: `escapeHtml()`
- All URL props: `sanitizeAttr()`
- These functions already exist — do NOT remove them

### 1.4 Test the export
- Generate a page with all 10 block types
- Export to HTML
- Open in a browser
- Verify: RTL works, responsive works, fonts load, no broken layouts

**Commit: "Phase 1: Rewrite HTML export to use Tailwind CSS"**

---

## Phase 2: Add New Block Types (20 new blocks)

Add blocks one by one. For EACH new block, you must touch exactly these files:

### Checklist per block (follow this exactly):

1. **Create** `src/components/blocks/{BlockName}.tsx` — a clean React component, NO Puck dependency
2. **Update** `src/lib/puck/config.tsx`:
   - Add import
   - Add wrapper: `const {BlockName}Wrapper = (props: any) => <{BlockName} {...props} />`
   - Add config entry with `render`, `label`, `defaultProps`, `fields`
3. **Update** `src/lib/puck/renderer.ts`:
   - Add `case "{BlockName}":` with Tailwind HTML output
4. **Update** `src/lib/ai/validation.ts`:
   - Add `"{BlockName}"` to the `z.enum([...])` in `ComponentSchema`
5. **Update** `src/app/api/ai/generate/route.ts`:
   - Add the block description to `SYSTEM_PROMPT`
6. **Update** `src/components/puck/PuckEditorWrapper.tsx`:
   - If block has array props with bilingual strings, add a branch in `transformToLanguage`

### Block catalog — build in this order (priority first):

#### Priority 1: Essential blocks (build these first)

**Block: Gallery**
- Props: `title` (string), `subtitle` (string), `images` (array of {url, alt}), `columns` (2|3|4), `gap` (sm|md|lg), `rounded` (boolean), `bgColor` (string)
- Renders: Responsive image grid with hover zoom effect
- Default: 6 Unsplash placeholder images

**Block: Video**
- Props: `url` (string), `title` (string), `aspectRatio` (16:9|4:3|1:1), `borderRadius` (number)
- Renders: YouTube/Vimeo embed with responsive iframe wrapper
- Must parse YouTube and Vimeo URLs to extract embed URLs

**Block: Team**
- Props: `title` (string), `subtitle` (string), `members` (array of {name, role, avatar, bio}), `columns` (2|3|4), `bgColor` (string)
- Renders: Grid of team member cards with circular avatars

**Block: Steps / How It Works**
- Props: `title` (string), `subtitle` (string), `steps` (array of {title, description}), `accentColor` (string), `bgColor` (string)
- Renders: Numbered steps with connector dots/lines between them

**Block: LogoStrip / Trusted By**
- Props: `title` (string), `logos` (array of {name, url}), `grayscale` (boolean), `bgColor` (string)
- Renders: Horizontal row of partner/client logos with optional grayscale

**Block: Banner / Announcement**
- Props: `text` (string), `subtext` (string), `buttonText` (string), `buttonLink` (string), `bgFrom` (string), `bgTo` (string)
- Renders: Full-width gradient announcement bar

**Block: Countdown**
- Props: `title` (string), `subtitle` (string), `targetDate` (string ISO), `expiredMessage` (string), `bgFrom` (string), `bgTo` (string)
- Renders: Timer boxes (days/hours/minutes/seconds)
- HTML export MUST include JavaScript for live countdown:
```js
(function(){
  var target = new Date("{targetDate}").getTime();
  function update(){
    var diff = target - Date.now();
    if(diff<=0){ /* show expired message */ return; }
    var d=Math.floor(diff/86400000), h=Math.floor(diff%86400000/3600000),
        m=Math.floor(diff%3600000/60000), s=Math.floor(diff%60000/1000);
    document.getElementById("cd-days").textContent=String(d).padStart(2,"0");
    // ... hours, minutes, seconds
  }
  update(); setInterval(update, 1000);
})();
```

#### Priority 2: Conversion blocks

**Block: ContactForm (enhanced)**
- The existing ContactForm block needs these additions:
  - `formAction` prop (string, default Formspree URL)
  - `whatsappNumber` prop (string) — renders a green WhatsApp CTA button
  - `layout` prop (stacked|inline)
  - Support for select dropdowns in the fields array

**Block: WhatsAppFloat**
- Props: `phoneNumber` (string), `message` (string), `buttonText` (string), `position` (bottom-right|bottom-left), `bgColor` (string), `showText` (boolean)
- Renders: Preview of a floating WhatsApp button
- HTML export: Fixed-position floating button with `wa.me/{phone}?text={message}` link

**Block: Popup / Lead Capture**
- Props: `title` (string), `subtitle` (string), `buttonText` (string), `trigger` (timer|exit-intent|both), `delaySeconds` (number), `showInput` (boolean), `inputPlaceholder` (string)
- Renders: Preview of a popup modal
- HTML export: Hidden overlay + JavaScript for timer/exit-intent trigger

**Block: SocialProof**
- Props: `text` (string), `counterValue` (number), `counterLabel` (string), `bgColor` (string), `accentColor` (string)
- Renders: Live bar with pulsing dot + counter number

#### Priority 3: Content blocks

**Block: Text**
- Props: `text` (string), `fontSize` (number), `fontWeight` (string), `color` (string), `textAlign` (right|center|left), `paddingY` (number), `paddingX` (number)
- Renders: Simple styled text block

**Block: Image**
- Props: `src` (string URL), `alt` (string), `width` (string CSS), `borderRadius` (number), `shadow` (none|sm|lg|2xl)
- Renders: Centered image with optional shadow and rounded corners

**Block: Button**
- Props: `text` (string), `link` (string), `bgColor` (string), `textColor` (string), `size` (sm|md|lg), `borderRadius` (number), `variant` (filled|outline|ghost), `fullWidth` (boolean), `align` (right|center|left)
- Renders: Styled CTA button

**Block: Divider**
- Props: `style` (solid|dashed|dotted), `color` (string), `thickness` (number), `width` (string CSS %), `paddingY` (number)
- Renders: Horizontal line separator

**Block: Spacer**
- Props: `height` (number px)
- Renders: Empty vertical space

**Block: Accordion**
- Props: `title` (string), `subtitle` (string), `items` (array of {title, content, icon}), `accentColor` (string), `bgColor` (string), `allowMultiple` (boolean)
- Renders: Expandable accordion list (similar to FAQ but more configurable)

**Block: ComparisonTable**
- Props: `title` (string), `subtitle` (string), `plans` (array of {name, price, highlighted}), `rows` (array of {feature, values: string[]})
- Renders: Feature comparison table with checkmarks/x-marks

**Block: MapEmbed**
- Props: `address` (string), `title` (string), `subtitle` (string), `phone` (string), `hours` (string), `height` (number)
- Renders: Google Maps embed iframe with contact info
- HTML export: `https://maps.google.com/maps?q={address}&output=embed`

**Block: BeforeAfter**
- Props: `title` (string), `subtitle` (string), `beforeImage` (string), `afterImage` (string), `beforeLabel` (string), `afterLabel` (string)
- Renders: Side-by-side comparison in editor, interactive slider in HTML export

### After each block:
- [ ] Test in the Puck editor (drag, edit, preview)
- [ ] Test HTML export (render correctly, Tailwind classes work)
- [ ] Log what you built in the Progress Log

**Commit after every 3-5 blocks: "Phase 2: Add {BlockName}, {BlockName}, {BlockName} blocks"**

---

## Phase 3: Upgrade AI Generation

### 3.1 Update the system prompt

In `src/app/api/ai/generate/route.ts`, the `SYSTEM_PROMPT` must describe ALL blocks (old + new). Structure it like this:

```
You are a landing page generator. Generate a complete landing page as JSON.

Available components (use these exact type names):

1. Hero — Full-width hero section
   Props: title (string), subtitle (string), buttonText (string), buttonLink (string), bgFrom (hex), bgTo (hex), align (center|right|left)

2. FeatureList — Features grid
   Props: title, subtitle, features (array of {title, description, icon}), columns (1-4), bgColor

3. Gallery — Image grid
   Props: title, subtitle, images (array of {url, alt}), columns (2-4), bgColor

... (all 30 blocks)

Output format:
{
  "content": [
    { "type": "Hero", "props": { "title": "...", ... } },
    { "type": "FeatureList", "props": { ... } }
  ],
  "root": { "props": { "title": "Page Title", "description": "SEO description" } }
}

Guidelines:
- Generate 6-10 sections per page
- Always start with Hero, end with Footer
- Use real, compelling Hebrew copy (RTL)
- Use Unsplash URLs for images: https://images.unsplash.com/photo-{id}?w=800
- Match the industry and style requested
- Include a CTA section before the footer
```

### 3.2 Update validation schema

In `src/lib/ai/validation.ts`, add ALL new block names to the `z.enum`:

```ts
type: z.enum([
  "Hero", "FeatureList", "ContactForm", "Pricing", "Testimonials",
  "FAQ", "Stats", "CTA", "Header", "Footer",
  // New blocks:
  "Gallery", "Video", "Team", "Steps", "LogoStrip", "Banner",
  "Countdown", "WhatsAppFloat", "Popup", "SocialProof",
  "Text", "Image", "Button", "Divider", "Spacer",
  "Accordion", "ComparisonTable", "MapEmbed", "BeforeAfter"
])
```

### 3.3 Update the default/fallback content

In `getDefaultPuckContent()`, make the fallback page more compelling — use Hero + FeatureList + Testimonials + Pricing + CTA + Footer.

### 3.4 Test AI generation
- Send prompt: "בנה לי דף נחיתה למסעדה איטלקית בתל אביב"
- Verify the AI uses new block types
- Verify the generated JSON passes validation
- Verify the page renders correctly in the editor

**Commit: "Phase 3: Upgrade AI generation with all 30 block types"**

---

## Phase 4: Quality Polish

### 4.1 Add Lucide SVG icons to HTML export

The L2 project embeds SVG icons inline in the export. Add a helper function to `renderer.ts`:

```ts
const ICON_PATHS: Record<string, string> = {
  Zap: '<path d="M13 2L3 14h9l-1 10 10-12h-9l1-10z"/>',
  Shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
  Heart: '<path d="M20.42 4.58a5.4 5.4 0 00-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 00-7.65 7.65l.77.76L12 20.68l7.65-7.65.77-.76a5.4 5.4 0 000-7.65z"/>',
  Check: '<polyline points="20 6 9 17 4 12"/>',
  ChevronDown: '<polyline points="6 9 12 15 18 9"/>',
  Star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
  // ... add more as needed
};

function renderIcon(name: string, size: number = 24): string {
  const path = ICON_PATHS[name];
  if (!path) return '';
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${path}</svg>`;
}
```

### 4.2 Add responsive mobile menu to Header export

The current Header export has no mobile handling. Add a hamburger menu with JavaScript toggle.

### 4.3 Add social media icons to Footer export

The Footer currently ignores `socialLinks`. Render inline SVG icons for Facebook, Twitter, Instagram, LinkedIn, YouTube.

### 4.4 Add smooth scroll to exported pages

Add to the export's `<script>`:
```js
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    document.querySelector(a.getAttribute('href'))?.scrollIntoView({behavior:'smooth'});
  });
});
```

**Commit: "Phase 4: Polish HTML export — icons, mobile menu, smooth scroll"**

---

## Phase 5: Implement Real Deploy

### 5.1 Replace the mock DeployDialog

The file `src/components/editor/DeployDialog.tsx` currently fakes deployment with `setTimeout`. Replace with a real implementation.

**Option A (simplest): Static HTML hosting via Cloudflare Pages API**

```ts
// POST to Cloudflare Pages Direct Upload API
const formData = new FormData();
formData.append('index.html', new Blob([html], { type: 'text/html' }));

const response = await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/pages/projects/${PROJECT_NAME}/deployments`,
  {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${CF_API_TOKEN}` },
    body: formData,
  }
);
```

**Option B: Simple S3/R2 static upload**

Upload the exported HTML to a Cloudflare R2 bucket with a public custom domain.

### 5.2 Create deploy API route

Create `src/app/api/deploy/route.ts`:
- Accept: `{ projectId, html, subdomain }`
- Upload HTML to hosting
- Save deployment record to Prisma `Deployment` model
- Return: `{ url: "https://{subdomain}.yourdomain.com" }`

### 5.3 Wire up the DeployDialog

- User enters a subdomain
- Click deploy
- Call the API
- Show the live URL

**Commit: "Phase 5: Implement real deployment to Cloudflare Pages"**

---

## Phase 6: Connect Showcase HTML Files

There are 8 beautiful standalone HTML files at the project root:
- `animated-portfolio.html`
- `animated-product.html`
- `animated-startup.html`
- `brutalist-agency.html`
- `editorial-magazine.html`
- `landing-showcase.html`
- `life-coaching-export.html`
- `organic-portfolio.html`

### 6.1 Create a showcase page

Create `src/app/showcase/page.tsx` that displays these as a gallery — thumbnail previews with "View Live" links.

### 6.2 Move HTML files

Move them to `public/showcase/` so they're served as static files:
- `public/showcase/animated-portfolio.html`
- etc.

### 6.3 Link from the landing page

Add a "See Examples" section to the main page (`src/app/page.tsx`) that links to the showcase.

**Commit: "Phase 6: Add showcase gallery with example pages"**

---

## File Map — Where Everything Lives

| What | Path |
|------|------|
| Block components | `src/components/blocks/{Name}.tsx` |
| Puck config (block registration) | `src/lib/puck/config.tsx` |
| HTML export renderer | `src/lib/puck/renderer.ts` |
| AI validation schema | `src/lib/ai/validation.ts` |
| AI generation API | `src/app/api/ai/generate/route.ts` |
| Editor wrapper | `src/components/puck/PuckEditorWrapper.tsx` |
| Templates data | `src/data/templates/` |
| Template index | `src/data/templates/index.ts` |
| Prisma schema | `prisma/schema.prisma` |
| Auth config | `src/lib/nextauth.ts` |

---

## Puck Field Types Reference

When adding block fields to config, use these types:

| Type | Usage | Example |
|------|-------|---------|
| `"text"` | Short string | `{ type: "text", label: "Title" }` |
| `"textarea"` | Long string | `{ type: "textarea", label: "Description" }` |
| `"number"` | Number | `{ type: "number", label: "Height" }` |
| `"select"` | Dropdown | `{ type: "select", label: "Size", options: [{label:"Small",value:"sm"},{label:"Large",value:"lg"}] }` |
| `"radio"` | Boolean/choice | `{ type: "radio", label: "Show?", options: [{label:"Yes",value:true},{label:"No",value:false}] }` |
| `"array"` | List of items | `{ type: "array", label: "Items", getItemSummary: (item) => item.title, arrayFields: { title: {type:"text"}, ... } }` |
| `"object"` | Nested object | `{ type: "object", label: "Settings", objectFields: { ... } }` |

---

## Progress Log

> **Instructions: Update this section as you work. Add entries with dates and details.**

### Phase 0: Cleanup
- Status: NOT STARTED
- Notes:

### Phase 1: HTML Export Rewrite
- Status: NOT STARTED
- Notes:

### Phase 2: New Blocks
- Status: NOT STARTED
- Blocks completed: 0/20
- Notes:

### Phase 3: AI Generation Upgrade
- Status: NOT STARTED
- Notes:

### Phase 4: Quality Polish
- Status: NOT STARTED
- Notes:

### Phase 5: Real Deploy
- Status: NOT STARTED
- Notes:

### Phase 6: Showcase
- Status: NOT STARTED
- Notes:

---

## Decisions & Open Questions

| Question | Decision | Decided By |
|----------|----------|-----------|
| Puck vs Craft.js? | Puck — simpler JSON, easier for AI, actively maintained | Nadav + Claude, 2026-04-06 |
| What to do with L2? | Archive as reference, don't develop further | Nadav + Claude, 2026-04-06 |
| Deploy target? | Cloudflare Pages (TBD) | Pending |
| AI model for generation? | Currently supports 4 providers, default Zhipu GLM-4.7 | Existing |
