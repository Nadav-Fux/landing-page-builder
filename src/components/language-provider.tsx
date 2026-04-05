"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'he'
type Direction = 'ltr' | 'rtl'

interface LanguageContextType {
  language: Language
  direction: Direction
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.templates': 'Templates',
    'nav.pricing': 'Pricing',
    'nav.login': 'Login',
    'nav.signup': 'Sign Up',
    'nav.language': 'Language',

    // Hero Section
    'hero.title': 'Build Stunning Landing Pages',
    'hero.subtitle': 'with AI-Powered Generation',
    'hero.description': 'Create beautiful, responsive landing pages in minutes with our intelligent AI generator and intuitive visual editor. No coding required.',
    'hero.cta.primary': 'Start Building Free',
    'hero.cta.secondary': 'Watch Demo',
    'hero.trial': 'No credit card required',

    // Features Section
    'features.title': 'Powerful Features',
    'features.subtitle': 'Everything you need to create amazing landing pages',
    'features.ai.title': 'AI-Powered Generation',
    'features.ai.description': 'Generate complete landing pages with AI. Just describe your vision and watch it come to life.',
    'features.editor.title': 'Visual Editor',
    'features.editor.description': 'Intuitive drag-and-drop editor with real-time preview. Customize every element to match your brand.',
    'features.templates.title': 'Professional Templates',
    'features.templates.description': 'Choose from hundreds of professionally designed templates optimized for conversion.',
    'features.ai.prompts': 'Natural language prompts',
    'features.ai.smart': 'Smart content generation',
    'features.ai.seo': 'SEO optimization',
    'features.ai.mobile': 'Mobile-first design',
    'features.ai.industry': 'Industry-specific layouts',
    'features.ai.abtesting': 'A/B testing ready',
    'features.ai.optimized': 'Conversion optimized',
    'features.ai.templates': '500+ templates',
    'features.ai.export': 'Export to any platform',
    'features.editor.drag': 'Drag & drop interface',
    'features.editor.preview': 'Real-time preview',
    'features.editor.components': 'Custom components',
    'features.editor.brand': 'Brand kit integration',

    // Trusted By Section
    'trustedby.title': 'Trusted by 10,000+ marketers and businesses worldwide',
    'trustedby.rating': '4.9/5 on Product Hunt',

    // Stats Section
    'stats.pages': 'Pages Created',
    'stats.templates': 'Templates',
    'stats.users': 'Active Users',
    'stats.countries': 'Countries',

    // CTA Section
    'cta.title': 'Ready to Create Your Perfect Landing Page?',
    'cta.description': 'Join thousands of businesses already using our platform to grow their online presence.',
    'cta.button': 'Get Started Now',
    'cta.trial': 'Free 14-day trial • No credit card required',

    // Dashboard
    'dashboard.projects.title': 'My Projects',
    'dashboard.projects.subtitle': 'Create and manage your landing pages',
    'dashboard.projects.new': 'New Project',
    'dashboard.projects.empty.title': 'No projects yet',
    'dashboard.projects.empty.subtitle': 'Create your first landing page with our AI-powered builder',
    'dashboard.projects.empty.button': 'Create First Project',
    'dashboard.projects.loading': 'Loading your projects...',
    'dashboard.projects.updated': 'Updated',
    'dashboard.projects.edit': 'Edit',
    'dashboard.projects.preview': 'Preview',
    'dashboard.projects.delete': 'Delete',
    'dashboard.projects.backToHome': 'Back to Home',
    'dashboard.projects.noDescription': 'No description',
    'dashboard.projects.logout': 'Log out',
    'dashboard.projects.error.load': 'Failed to load projects',
    'dashboard.projects.error.delete': 'Failed to delete project',
    'dashboard.projects.error.preview': 'Failed to load preview',
    'dashboard.projects.error.retry': 'Try again',
    'dashboard.projects.success.delete': 'Project deleted',

    // Templates Page
    'templates.title': 'Template Gallery',
    'templates.subtitle': 'Choose from professionally designed templates',
    'templates.loading': 'Loading templates...',
    'templates.all': 'All',
    'templates.search.placeholder': 'Search templates...',
    'templates.clear': 'Clear filters',
    'templates.category.all': 'All Templates',
    'templates.category.saas': 'SaaS',
    'templates.category.agency': 'Agency',
    'templates.category.startup': 'Startup',
    'templates.category.ecommerce': 'E-commerce',
    'templates.category.portfolio': 'Portfolio',
    'templates.backToDashboard': 'Back to Dashboard',
    'templates.premium': 'Premium',
    'templates.preview': 'Preview',
    'templates.useTemplate': 'Use Template',
    'templates.uses': 'uses',
    'templates.empty': 'No templates found',
    'templates.filters.ariaLabel': 'Template category filters',
    'templates.search.ariaLabel': 'Search templates by name, category, or tags',
    'templates.rating.ariaLabel': 'Rating',
    'templates.error.title': 'Failed to load templates',
    'templates.error.load': 'Failed to load templates. Please try again.',
    'templates.error.retry': 'Try again',
    'templates.dialog.cancel': 'Cancel',
    'templates.dialog.confirm': 'Confirm',

    // Auth - Login
    'auth.login.title': 'Sign in',
    'auth.login.subtitle': 'Choose your preferred sign in method',
    'auth.login.orContinueWith': 'Or continue with',
    'auth.login.email': 'Email',
    'auth.login.emailPlaceholder': 'name@example.com',
    'auth.login.password': 'Password',
    'auth.login.passwordPlaceholder': 'Enter your password',
    'auth.login.submit': 'Sign in',
    'auth.login.signingIn': 'Signing in...',
    'auth.login.forgotPassword': 'Forgot your password?',
    'auth.login.noAccount': "Don't have an account?",
    'auth.login.signUp': 'Sign up',
    'auth.login.and': 'and',
    'auth.login.oauthNotLinked': 'To confirm your identity, sign in with the same account you used originally.',
    'auth.login.invalidCredentials': 'Invalid email or password',
    'auth.login.success': 'Successfully signed in!',
    'auth.login.error': 'An error occurred. Please try again.',
    'auth.login.oauthError': 'Failed to sign in with {provider}',

    // Auth - Register
    'auth.register.title': 'Create an account',
    'auth.register.subtitle': 'Choose your preferred sign up method',
    'auth.register.fullName': 'Full Name',
    'auth.register.namePlaceholder': 'John Doe',
    'auth.register.confirmPassword': 'Confirm Password',
    'auth.register.confirmPasswordPlaceholder': 'Confirm your password',
    'auth.register.submit': 'Create account',
    'auth.register.creating': 'Creating account...',
    'auth.register.termsAgree': 'By creating an account, you agree to our',
    'auth.register.terms': 'Terms of Service',
    'auth.register.privacy': 'Privacy Policy',
    'auth.register.hasAccount': 'Already have an account?',
    'auth.register.signIn': 'Sign in',
    'auth.register.success': 'Account created successfully!',
    'auth.register.signInAfter': 'Account created. Please sign in.',
    'auth.register.error': 'An error occurred during registration. Please try again.',

    // Auth - Reset Password
    'auth.reset.title': 'Reset Your Password',
    'auth.reset.subtitle': 'Enter your new password below',
    'auth.reset.newPassword': 'New Password',
    'auth.reset.newPasswordPlaceholder': 'Enter new password',
    'auth.reset.confirmPassword': 'Confirm Password',
    'auth.reset.confirmPasswordPlaceholder': 'Confirm new password',
    'auth.reset.submit': 'Reset Password',
    'auth.reset.resetting': 'Resetting password...',
    'auth.reset.success': 'Password reset successfully! Please sign in.',
    'auth.reset.error': 'An error occurred. Please try again.',
    'auth.reset.invalidLink': 'Invalid Reset Link',
    'auth.reset.invalidLinkDesc': 'This password reset link is invalid or has expired.',
    'auth.reset.backToLogin': 'Back to Login',

    // Auth - Forgot Password
    'auth.forgot.title': 'Forgot your password?',
    'auth.forgot.subtitle': 'Enter your email and we\'ll send you a reset link',
    'auth.forgot.email': 'Email',
    'auth.forgot.emailPlaceholder': 'name@example.com',
    'auth.forgot.submit': 'Send Reset Link',
    'auth.forgot.sending': 'Sending...',
    'auth.forgot.success': 'If an account with that email exists, a reset link has been sent',
    'auth.forgot.error': 'An error occurred. Please try again.',
    'auth.forgot.backToLogin': 'Back to Login',
    'auth.forgot.oauthAccount': 'This account uses OAuth login. Please sign in with your OAuth provider.',

    // Editor Toolbar
    'editor.back': 'Back',
    'editor.save': 'Save',
    'editor.saving': 'Saving...',
    'editor.quickSave': 'Quick Save',
    'editor.aiGenerate': 'AI Generate',
    'editor.export': 'Export',
    'editor.preview': 'Preview',
    'editor.previewNewWindow': 'Preview in New Window',
    'editor.editMode': 'Edit',
    'editor.previewMode': 'Preview',
    'editor.failedToLoad': 'Failed to load project data',
    'editor.failedToSave': 'Failed to save project',
    'editor.projectSaved': 'Project saved!',
    'editor.exportStarted': 'Export started!',
    'editor.exportFailed': 'Failed to export',

    // Deploy Dialog
    'deploy.title': 'Deploy Your Landing Page',
    'deploy.subtitle': 'Publish your page to the web in seconds',
    'deploy.selectPlatform': 'Select Platform',
    'deploy.vercelDesc': 'Best for Next.js apps',
    'deploy.netlifyDesc': 'Simple static hosting',
    'deploy.customDesc': 'Use your own domain',
    'deploy.customDomain': 'Custom Domain',
    'deploy.domainPlaceholder': 'www.yourdomain.com',
    'deploy.dnsNote': 'Make sure your DNS is configured correctly',
    'deploy.whatNext': 'What happens next:',
    'deploy.step1': 'Your page will be optimized for production',
    'deploy.step2': 'SSL certificate will be automatically configured',
    'deploy.step3': 'Page will be available in 1-2 minutes',
    'deploy.step4': 'You can update anytime from the dashboard',
    'deploy.deployed': 'Deployed Successfully!',
    'deploy.deployedDesc': 'Your landing page is now live',
    'deploy.close': 'Close',
    'deploy.cancel': 'Cancel',
    'deploy.deploying': 'Deploying...',
    'deploy.deployNow': 'Deploy Now',
    'deploy.failed': 'Failed to deploy. Please try again.',
    'deploy.started': 'Deployment started!',

    // AI Generator
    'ai.title': 'AI Page Generator',
    'ai.subtitle': 'Describe your landing page and let AI create it for you',
    'ai.promptLabel': 'What would you like to create?',
    'ai.promptPlaceholder': 'Describe the landing page you want to create...',
    'ai.industryLabel': 'Industry (optional)',
    'ai.industryPlaceholder': 'Select industry',
    'ai.styleLabel': 'Design Style',
    'ai.sectionsLabel': 'Sections to Include',
    'ai.generate': 'Generate Landing Page',
    'ai.generating': 'Generating...',
    'ai.tips': 'Tips for better results:',
    'ai.tip1': 'Be specific about your target audience',
    'ai.tip2': 'Mention key features or benefits',
    'ai.tip3': 'Include your desired tone of voice',
    'ai.failed': 'Failed to generate content. Please try again.',
    'ai.generated': 'Landing page generated!',
    'ai.promptRequired': 'Please describe what you want to create',
    'ai.style.modern': 'Modern & Clean',
    'ai.style.bold': 'Bold & Dynamic',
    'ai.style.minimal': 'Minimal & Simple',
    'ai.style.classic': 'Classic & Professional',
    'ai.style.playful': 'Playful & Creative',
    'ai.section.hero': 'Hero',
    'ai.section.features': 'Features',
    'ai.section.pricing': 'Pricing',
    'ai.section.testimonials': 'Testimonials',
    'ai.section.faq': 'FAQ',
    'ai.section.contact': 'Contact',
    'ai.section.about': 'About',
    'ai.section.team': 'Team',
    'ai.section.gallery': 'Gallery',
    'ai.section.stats': 'Stats',

    // Save Dialog
    'save.updateTitle': 'Update Project',
    'save.createTitle': 'Save Project',
    'save.updateDesc': 'Update your project details',
    'save.createDesc': 'Give your project a name and description',
    'save.projectTitle': 'Project Title',
    'save.titlePlaceholder': 'My Awesome Landing Page',
    'save.description': 'Description (optional)',
    'save.descPlaceholder': 'A brief description of your project',
    'save.cancel': 'Cancel',
    'save.saving': 'Saving...',
    'save.submit': 'Save',
    'save.titleRequired': 'Please enter a project title',
    'save.updated': 'Project updated!',
    'save.saved': 'Project saved!',
    'save.failed': 'Failed to save project',

    // Preview
    'preview.contentTooLarge': 'Content too large',
    'preview.contentTooLargeDesc': 'The preview content exceeds the maximum allowed size.',
    'preview.hideCode': 'Hide Code',
    'preview.viewCode': 'View Code',
    'preview.openInNewTab': 'Open in New Tab',

    // Footer
    'footer.product': 'Product',
    'footer.features': 'Features',
    'footer.templates': 'Templates',
    'footer.pricing': 'Pricing',
    'footer.company': 'Company',
    'footer.about': 'About',
    'footer.blog': 'Blog',
    'footer.careers': 'Careers',
    'footer.support': 'Support',
    'footer.help': 'Help Center',
    'footer.contact': 'Contact',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
  },
  he: {
    // Navigation
    'nav.features': 'תכונות',
    'nav.templates': 'תבניות',
    'nav.pricing': 'תמחור',
    'nav.login': 'התחברות',
    'nav.signup': 'הרשמה',
    'nav.language': 'שפה',

    // Hero Section
    'hero.title': 'בנה דפי נחיתה מרהיבים',
    'hero.subtitle': 'עם יצירה מונעת בינה מלאכותית',
    'hero.description': 'צור דפי נחיתה יפים ורספונסיביים תוך דקות עם גנרטור הבינה המלאכותית החכם שלנו ועורך ויזואלי אינטואיטיבי. לא נדרש ידע בקידוד.',
    'hero.cta.primary': 'התחל לבנות בחינם',
    'hero.cta.secondary': 'צפה בדמו',
    'hero.trial': 'לא נדרש כרטיס אשראי',

    // Features Section
    'features.title': 'תכונות חזקות',
    'features.subtitle': 'כל מה שאתה צריך כדי ליצור דפי נחיתה מדהימים',
    'features.ai.title': 'יצירה מונעת בינה מלאכותית',
    'features.ai.description': 'צור דפי נחיתה שלמים עם בינה מלאכותית. פשוט תאר את החזון שלך וצפה בו מתגשם.',
    'features.editor.title': 'עורך ויזואלי',
    'features.editor.description': 'עורך גרירה-ושחרור אינטואיטיבי עם תצוגה מקדימה בזמן אמת. התאם כל רכיב כך שיתאים למותג שלך.',
    'features.templates.title': 'תבניות מקצועיות',
    'features.templates.description': 'בחר מתוך מאות תבניות מעוצבות באופן מקצועי המותאמות להמרה מיטבית.',
    'features.ai.prompts': 'הנחיות בשפה טבעית',
    'features.ai.smart': 'יצירת תוכן חכמה',
    'features.ai.seo': 'אופטימיזציה לקידום אתרים',
    'features.ai.mobile': 'עיצוב מותאם למובייל',
    'features.ai.industry': 'פריסות מותאמות לענף',
    'features.ai.abtesting': 'מוכן לבדיקות A/B',
    'features.ai.optimized': 'מותאם להמרות',
    'features.ai.templates': '500+ תבניות',
    'features.ai.export': 'ייצוא לכל פלטפורמה',
    'features.editor.drag': 'ממשק גרירה ושחרור',
    'features.editor.preview': 'תצוגה מקדימה בזמן אמת',
    'features.editor.components': 'רכיבים מותאמים אישית',
    'features.editor.brand': 'שילוב ערכת מותג',

    // Trusted By Section
    'trustedby.title': 'מהימנים על ידי 10,000+ שיווקאים ועסקים ברחבי העולם',
    'trustedby.rating': '4.9/5 ב-Product Hunt',

    // Stats Section
    'stats.pages': 'דפים שנוצרו',
    'stats.templates': 'תבניות',
    'stats.users': 'משתמשים פעילים',
    'stats.countries': 'מדינות',

    // CTA Section
    'cta.title': 'מוכן ליצור את דף הנחיתה המושלם שלך?',
    'cta.description': 'הצטרף לאלפי עסקים שכבר משתמשים בפלטפורמה שלנו כדי לגדל את הנוכחות המקוונת שלהם.',
    'cta.button': 'התחל עכשיו',
    'cta.trial': 'ניסיון חינם ל-14 ימים • לא נדרש כרטיס אשראי',

    // Dashboard
    'dashboard.projects.title': 'הפרויקטים שלי',
    'dashboard.projects.subtitle': 'צור ונהל את דפי הנחיתה שלך',
    'dashboard.projects.new': 'פרויקט חדש',
    'dashboard.projects.empty.title': 'אין עדיין פרויקטים',
    'dashboard.projects.empty.subtitle': 'צור את דף הנחיתה הראשון שלך עם בונה הבינה המלאכותית שלנו',
    'dashboard.projects.empty.button': 'צור פרויקט ראשון',
    'dashboard.projects.loading': 'טוען את הפרויקטים שלך...',
    'dashboard.projects.updated': 'עודכן',
    'dashboard.projects.edit': 'ערוך',
    'dashboard.projects.preview': 'תצוגה מקדימה',
    'dashboard.projects.delete': 'מחק',
    'dashboard.projects.backToHome': 'חזרה לדף הבית',
    'dashboard.projects.noDescription': 'אין תיאור',
    'dashboard.projects.logout': 'התנתק',
    'dashboard.projects.error.load': 'טעינת הפרויקטים נכשלה',
    'dashboard.projects.error.delete': 'מחיקת הפרויקט נכשלה',
    'dashboard.projects.error.preview': 'טעינת התצוגה המקדימה נכשלה',
    'dashboard.projects.error.retry': 'נסה שוב',
    'dashboard.projects.success.delete': 'הפרויקט נמחק',

    // Templates Page
    'templates.title': 'גלריית תבניות',
    'templates.subtitle': 'בחר מתוך תבניות מעוצבות באופן מקצועי',
    'templates.loading': 'טוען תבניות...',
    'templates.all': 'הכל',
    'templates.search.placeholder': 'חפש תבניות...',
    'templates.clear': 'נקה מסננים',
    'templates.category.all': 'כל התבניות',
    'templates.category.saas': 'SaaS',
    'templates.category.agency': 'סוכנות',
    'templates.category.startup': 'סטארטאפ',
    'templates.category.ecommerce': 'מסחר אלקטרוני',
    'templates.category.portfolio': 'תיק עבודות',
    'templates.backToDashboard': 'חזרה ללוח הבקרה',
    'templates.premium': 'פרימיום',
    'templates.preview': 'תצוגה מקדימה',
    'templates.useTemplate': 'השתמש בתבנית',
    'templates.uses': 'שימושים',
    'templates.empty': 'לא נמצאו תבניות',
    'templates.filters.ariaLabel': 'מסנני קטגוריות תבניות',
    'templates.search.ariaLabel': 'חפש תבניות לפי שם, קטגוריה או תגיות',
    'templates.rating.ariaLabel': 'דירוג',
    'templates.error.title': 'טעינת התבניות נכשלה',
    'templates.error.load': 'טעינת התבניות נכשלה. נסה שוב.',
    'templates.error.retry': 'נסה שוב',
    'templates.dialog.cancel': 'ביטול',
    'templates.dialog.confirm': 'אישור',

    // Auth - Login
    'auth.login.title': 'התחברות',
    'auth.login.subtitle': 'בחר את שיטת ההתחברות המועדפת עליך',
    'auth.login.orContinueWith': 'או המשך עם',
    'auth.login.email': 'אימייל',
    'auth.login.emailPlaceholder': 'name@example.com',
    'auth.login.password': 'סיסמה',
    'auth.login.passwordPlaceholder': 'הכנס את הסיסמה שלך',
    'auth.login.submit': 'התחבר',
    'auth.login.signingIn': 'מתחבר...',
    'auth.login.forgotPassword': 'שכחת את הסיסמה?',
    'auth.login.noAccount': 'אין לך חשבון?',
    'auth.login.signUp': 'הירשם',
    'auth.login.oauthNotLinked': 'כדי לאמת את זהותך, התחבר עם אותו חשבון בו השתמשת במקור.',
    'auth.login.invalidCredentials': 'אימייל או סיסמה שגויים',
    'auth.login.success': 'נכנסת בהצלחה!',
    'auth.login.error': 'אירעה שגיאה. נסה שוב.',
    'auth.login.oauthError': 'ההתחברות עם {provider} נכשלה',

    // Auth - Register
    'auth.register.title': 'צור חשבון',
    'auth.register.subtitle': 'בחר את שיטת ההרשמה המועדפת עליך',
    'auth.register.fullName': 'שם מלא',
    'auth.register.namePlaceholder': 'ישראל ישראלי',
    'auth.register.confirmPassword': 'אשר סיסמה',
    'auth.register.confirmPasswordPlaceholder': 'אשר את הסיסמה שלך',
    'auth.register.submit': 'צור חשבון',
    'auth.register.creating': 'יוצר חשבון...',
    'auth.register.termsAgree': 'ביצירת חשבון, אתה מסכים ל',
    'auth.register.terms': 'תנאי השימוש',
    'auth.register.privacy': 'מדיניות הפרטיות',
    'auth.register.hasAccount': 'כבר יש לך חשבון?',
    'auth.register.signIn': 'התחבר',
    'auth.login.and': 'ו',
    'auth.register.success': 'החשבון נוצר בהצלחה!',
    'auth.register.signInAfter': 'החשבון נוצר. אנא התחבר.',
    'auth.register.error': 'אירעה שגיאה במהלך ההרשמה. נסה שוב.',

    // Auth - Reset Password
    'auth.reset.title': 'אפס את הסיסמה שלך',
    'auth.reset.subtitle': 'הכנס את הסיסמה החדשה שלך',
    'auth.reset.newPassword': 'סיסמה חדשה',
    'auth.reset.newPasswordPlaceholder': 'הכנס סיסמה חדשה',
    'auth.reset.confirmPassword': 'אשר סיסמה',
    'auth.reset.confirmPasswordPlaceholder': 'אשר את הסיסמה החדשה',
    'auth.reset.submit': 'אפס סיסמה',
    'auth.reset.resetting': 'מאפס סיסמה...',
    'auth.reset.success': 'הסיסמה אופסה בהצלחה! אנא התחבר.',
    'auth.reset.error': 'אירעה שגיאה. נסה שוב.',
    'auth.reset.invalidLink': 'קישור לא תקין',
    'auth.reset.invalidLinkDesc': 'קישור איפוס הסיסמה הזה לא תקין או שפג תוקפו.',
    'auth.reset.backToLogin': 'חזרה להתחברות',

    // Auth - Forgot Password
    'auth.forgot.title': 'שכחת את הסיסמה?',
    'auth.forgot.subtitle': 'הכנס את האימייל שלך ונשלח לך קישור לאיפוס',
    'auth.forgot.email': 'אימייל',
    'auth.forgot.emailPlaceholder': 'name@example.com',
    'auth.forgot.submit': 'שלח קישור לאיפוס',
    'auth.forgot.sending': 'שולח...',
    'auth.forgot.success': 'אם קיים חשבון עם אימייל זה, נשלח קישור לאיפוס',
    'auth.forgot.error': 'אירעה שגיאה. נסה שוב.',
    'auth.forgot.backToLogin': 'חזרה להתחברות',
    'auth.forgot.oauthAccount': 'חשבון זה משתמש בהתחברות OAuth. אנא התחבר עם ספק ה-OAuth שלך.',

    // Editor Toolbar
    'editor.back': 'חזרה',
    'editor.save': 'שמור',
    'editor.saving': 'שומר...',
    'editor.quickSave': 'שמירה מהירה',
    'editor.aiGenerate': 'יצירה ב-AI',
    'editor.export': 'ייצוא',
    'editor.preview': 'תצוגה מקדימה',
    'editor.previewNewWindow': 'תצוגה בחלון חדש',
    'editor.editMode': 'עריכה',
    'editor.previewMode': 'תצוגה',
    'editor.failedToLoad': 'טעינת הפרויקט נכשלה',
    'editor.failedToSave': 'שמירת הפרויקט נכשלה',
    'editor.projectSaved': 'הפרויקט נשמר!',
    'editor.exportStarted': 'הייצוא התחיל!',
    'editor.exportFailed': 'הייצוא נכשל',

    // Deploy Dialog
    'deploy.title': 'פרוס את דף הנחיתה שלך',
    'deploy.subtitle': 'פרסם את הדף שלך באינטרנט תוך שניות',
    'deploy.selectPlatform': 'בחר פלטפורמה',
    'deploy.vercelDesc': 'הטוב ביותר לאפליקציות Next.js',
    'deploy.netlifyDesc': 'אחסון סטטי פשוט',
    'deploy.customDesc': 'השתמש בדומיין שלך',
    'deploy.customDomain': 'דומיין מותאם אישית',
    'deploy.domainPlaceholder': 'www.yourdomain.com',
    'deploy.dnsNote': 'ודא שה-DNS שלך מוגדר כראוי',
    'deploy.whatNext': 'מה קורה עכשיו:',
    'deploy.step1': 'הדף שלך יותאם לייצור',
    'deploy.step2': 'אישור SSL יוגדר אוטומטית',
    'deploy.step3': 'הדף יהיה זמין תוך 1-2 דקות',
    'deploy.step4': 'ניתן לעדכן בכל עת מהדשבורד',
    'deploy.deployed': 'הפריסה הצליחה!',
    'deploy.deployedDesc': 'דף הנחיתה שלך עכשיו באוויר',
    'deploy.close': 'סגור',
    'deploy.cancel': 'ביטול',
    'deploy.deploying': 'מפרסם...',
    'deploy.deployNow': 'פרסם עכשיו',
    'deploy.failed': 'הפריסה נכשלה. נסה שוב.',
    'deploy.started': 'הפריסה התחילה!',

    // AI Generator
    'ai.title': 'מחולל דפים ב-AI',
    'ai.subtitle': 'תאר את דף הנחיתה שלך ותן ל-AI ליצור אותו',
    'ai.promptLabel': 'מה תרצה ליצור?',
    'ai.promptPlaceholder': 'תאר את דף הנחיתה שתרצה ליצור...',
    'ai.industryLabel': 'תעשייה (אופציונלי)',
    'ai.industryPlaceholder': 'בחר תעשייה',
    'ai.styleLabel': 'סגנון עיצוב',
    'ai.sectionsLabel': 'סקשנים לכלול',
    'ai.generate': 'צור דף נחיתה',
    'ai.generating': 'מייצר...',
    'ai.tips': 'טיפים לתוצאות טובות יותר:',
    'ai.tip1': 'היה ספציפי לגבי קהל היעד שלך',
    'ai.tip2': 'ציין תכונות או יתרונות מרכזיים',
    'ai.tip3': 'כלול את טון הדיבור הרצוי',
    'ai.failed': 'יצירת התוכן נכשלה. נסה שוב.',
    'ai.generated': 'דף הנחיתה נוצר!',
    'ai.promptRequired': 'אנא תאר מה תרצה ליצור',
    'ai.style.modern': 'מודרני ונקי',
    'ai.style.bold': 'נועז ודינמי',
    'ai.style.minimal': 'מינימליסטי ופשוט',
    'ai.style.classic': 'קלאסי ומקצועי',
    'ai.style.playful': 'שובב ויצירתי',
    'ai.section.hero': 'Hero',
    'ai.section.features': 'תכונות',
    'ai.section.pricing': 'תמחור',
    'ai.section.testimonials': 'המלצות',
    'ai.section.faq': 'שאלות נפוצות',
    'ai.section.contact': 'צור קשר',
    'ai.section.about': 'אודות',
    'ai.section.team': 'צוות',
    'ai.section.gallery': 'גלריה',
    'ai.section.stats': 'סטטיסטיקות',

    // Save Dialog
    'save.updateTitle': 'עדכן פרויקט',
    'save.createTitle': 'שמור פרויקט',
    'save.updateDesc': 'עדכן את פרטי הפרויקט',
    'save.createDesc': 'תן שם ותיאור לפרויקט שלך',
    'save.projectTitle': 'שם הפרויקט',
    'save.titlePlaceholder': 'דף נחיתה מדהים שלי',
    'save.description': 'תיאור (אופציונלי)',
    'save.descPlaceholder': 'תיאור קצר של הפרויקט שלך',
    'save.cancel': 'ביטול',
    'save.saving': 'שומר...',
    'save.submit': 'שמור',
    'save.titleRequired': 'אנא הכנס שם לפרויקט',
    'save.updated': 'הפרויקט עודכן!',
    'save.saved': 'הפרויקט נשמר!',
    'save.failed': 'שמירת הפרויקט נכשלה',

    // Preview
    'preview.contentTooLarge': 'התוכן גדול מדי',
    'preview.contentTooLargeDesc': 'תוכן התצוגה המקדימה חורג מהגודל המרבי המותר.',
    'preview.hideCode': 'הסתר קוד',
    'preview.viewCode': 'הצג קוד',
    'preview.openInNewTab': 'פתח בחלון חדש',

    // Footer
    'footer.product': 'מוצר',
    'footer.features': 'תכונות',
    'footer.templates': 'תבניות',
    'footer.pricing': 'תמחור',
    'footer.company': 'חברה',
    'footer.about': 'אודות',
    'footer.blog': 'בלוג',
    'footer.careers': 'קריירה',
    'footer.support': 'תמיכה',
    'footer.help': 'מרכז עזרה',
    'footer.contact': 'צור קשר',
    'footer.legal': 'משפטי',
    'footer.privacy': 'מדיניות פרטיות',
    'footer.terms': 'תנאי שימוש',
    'footer.copyright': '© 2024 Landing Page Builder. כל הזכויות שמורות.',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'en' || saved === 'he')) {
      setLanguageState(saved)
    }
    setMounted(true)
  }, [])

  const direction = language === 'he' ? 'rtl' : 'ltr'

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr'
    document.documentElement.lang = lang
  }

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  React.useEffect(() => {
    if (mounted) {
      document.documentElement.dir = direction
      document.documentElement.lang = language
    }
  }, [language, direction, mounted])

  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, direction, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}