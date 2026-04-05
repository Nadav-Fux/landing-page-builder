# PRD: Fix Landing Page Builder UI Issues

## Overview
Fix all remaining UI and accessibility issues in the Landing Page Builder application.

## Requirements

### 1. Templates Page Accessibility Fixes
Fix `src/app/templates/page.tsx`:

- Add aria-label to search input
- Add aria-labels to category filter buttons  
- Fix star rating accessibility
- Replace browser confirm() with custom accessible dialog
- Add error state UI when template fetch fails

### 2. Translation Keys Needed
Add to `src/components/language-provider.tsx`:

```typescript
// English
'templates.title': 'Template Gallery'
'templates.subtitle': 'Choose from professionally designed templates'
'templates.search.placeholder': 'Search templates...'
'templates.search.label': 'Search for templates'
'templates.categories.all': 'All'
'templates.categories.saas': 'SaaS'
'templates.categories.agency': 'Agency'
'templates.categories.ecommerce': 'E-commerce'
'templates.categories.startup': 'Startup'
'templates.categories.portfolio': 'Portfolio'
'templates.empty': 'No templates found'
'templates.clear': 'Clear filters'
'templates.actions.preview': 'Preview'
'templates.actions.use': 'Use Template'
'templates.premium': 'Premium'
'templates.uses': 'uses'
'templates.backToDashboard': 'Back to Dashboard'
'templates.error.load': 'Failed to load templates'
'templates.error.retry': 'Try again'
'templates.loading': 'Loading templates...'

// Hebrew
'templates.title': 'גלריית תבניות'
'templates.subtitle': 'בחר מתוך תבניות מעוצבות באופן מקצועי'
'templates.search.placeholder': 'חפש תבניות...'
'templates.search.label': 'חיפוש תבניות'
'templates.categories.all': 'הכל'
'templates.categories.saas': 'SaaS'
'templates.categories.agency': 'סוכנות'
'templates.categories.ecommerce': 'מסחר אלקטרוני'
'templates.categories.startup': 'סטארטאפ'
'templates.categories.portfolio': 'פורטפוליו'
'templates.empty': 'לא נמצאו תבניות'
'templates.clear': 'נקה מסננים'
'templates.actions.preview': 'תצוגה מקדימה'
'templates.actions.use': 'השתמש בתבנית'
'templates.premium': 'פרימיום'
'templates.uses': 'שימושים'
'templates.backToDashboard': 'חזרה ללוח הבקרה'
'templates.error.load': 'טעינת התבניות נכשלה'
'templates.error.retry': 'נסה שוב'
'templates.loading': 'טוען תבניות...'
```

### 3. Accessibility Requirements
- All icon-only buttons must have aria-label
- All loading states must have role="status" and aria-live
- All error messages must be announced to screen readers
- All form inputs must have proper labels

## Acceptance Criteria
1. TypeScript compiles without errors
2. All tests pass (npm test)
3. No @ts-ignore comments remain
4. All form inputs have proper labels
5. All icon buttons have aria-label
6. All loading states are accessible
7. All hardcoded strings use translation keys
8. Templates page is fully functional and accessible
