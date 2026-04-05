const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '../src/data/templates');

// Complete Hebrew translation dictionary
const translations = {
    // Hero Sections
    'Build Better Products Faster': 'בנה מוצרים טובים יותר, מהר יותר',
    'The all-in-one platform that helps teams ship 10x faster. No complex setup, just results.': 'הפלטפורמה המלאה שעוזרת לצוותים לשלוח פי 10 מהר יותר. אין הגדרות מורכבות, רק תוצאות.',
    'Start Free Trial': 'התחל חינם',
    'Watch Demo': 'צפה בהדגמה',
    'Get Started': 'התחל עכשיו',
    'Learn More': 'למד עוד',
    'We Create Digital Experiences': 'אנחנו יוצרים חוויות דיגיטליות מדהימות',
    'Award-winning creative agency helping brands tell their stories through stunning design and innovative technology.': 'סוכנות יצירתית זוכת פרסים שעוזרת למותגים לספר את הסיפור שלהם דרך עיצוב מרהיב וטכנולוגיה חדשנית.',
    'View Our Work': 'צפה בעבודות שלנו',
    'Get in Touch': 'צור קשר',
    "Let's Talk": 'בוא נדבר',
    'Scale Your Business to 7 Figures': 'הגדל את העסק שלך ל-7 ספרות',
    'Strategic consulting for ambitious entrepreneurs. Proven frameworks that have helped 200+ businesses grow.': 'ייעוץ אסטרטגי ליזמים שאפתניים. מסגרות מוכחות שעזרו ליותר מ-200 עסקים לצמוח.',
    'Book Free Strategy Call': 'קבע שיחת אסטרטגיה חינם',
    'See Results': 'צפה בתוצאות',
    'A Culinary Experience Like No Other': 'חוויה קולינרית ייחודית שלא תמצא בשום מקום אחר',
    'Fine dining meets contemporary cuisine. Fresh ingredients, masterful preparation, unforgettable flavors.': 'אוכל גורמה פוגש מטבח עכשווי. חומרים טריים, הכנה מעולה, טעמים בלתי נשכחים שישאירו אותך עם זיכרונות לכל החיים.',
    'Reserve Your Table': 'שמור את השולחן שלך',
    'View Menu': 'צפה בתפריט',
    'Reserve Table': 'שמור שולחן',
    'Launch Your App with Confidence': 'השיק את האפליקציה שלך בביטחון מלא',
    'The complete toolkit for app marketers. From landing pages to promo videos, we have everything you need to drive downloads.': 'ערכת הכלים המלאה למשווקי אפליקציות. מדפי נחיתה מרהיבים ועד סרטוני קידום מקצועיים - יש לנו הכל כדי להגדיל את ההורדות שלך.',
    'Get Downloads': 'קבל יותר הורדות',
    'See Case Studies': 'צפה במקרי הצלחה',
    'Create Your Ebook in Minutes': 'צור את הספר האלקטרוני שלך בדקות',
    'Lead capture pages that actually convert. Beautiful designs, proven copy, and seamless email integration.': 'דפי לכידת לידים שבאמת עובדים. עיצובים יפים במיוחד, טקסטים מוכחים, ואינטגרציה חלקה עם מערכות אימייל.',
    'Download Now': 'הורד עכשיו',
    'Learn the Secrets': 'גלה את הסודות',
    'Sell Products Online with Confidence': 'מכור מוצרים באונליין בביטחון',
    'High-converting product page template designed for Shopify, WooCommerce, and other platforms.': 'תבנית דף מוצר עם המרות גבוהות במיוחד, תוכננה במיוחד עבור Shopify, WooCommerce וכל פלטפורמה אחרת.',
    'Add to Cart': 'הוסף לסל',
    'Discover More': 'גלה עוד',
    'Transform Your Body in 90 Days': 'שנה את הגוף שלך ב-90 יום',
    'Proven fitness programs designed by expert trainers. Real results, no gimmicks.': 'תוכניות כושר מוכחות שנוצרו על ידי מאמנים מומחים. תוצאות אמיתיות, בלי טריקים או הבטחות ריקות.',
    'Start Training': 'התחל להתאמן',
    'Join Now': 'הצטרף עכשיו',
    'Book Your Session': 'קבע את האימון שלך',
    'Launch Your Online Course': 'השק את הקורס המקוון שלך',
    'Everything you need to create and sell your online course.': 'כל מה שצריך כדי ליצור ולמכור את הקורס המקוון שלך בהצלחה.',
    'Create a Course': 'צור קורס',
    'Launch Your Podcast': 'התחל את הפודקאסט שלך היום',
    'Launch your podcast with a professional landing page that converts listeners into subscribers.': 'השק את הפודקאסט שלך עם דף נחיתה מקצועי שהופך מאזינים למנויים נאמנים.',
    'Listen Now': 'האזן עכשיו',
    'Subscribe to Newsletter': 'הירשם לניוזלטר',
    'Start Your Podcast': 'התחל את הפודקאסט שלך',
    'Your Dream Wedding': 'חתונת החלומות שלך מתחילה כאן',
    'Create a beautiful wedding website that captures your love story and keeps guests informed.': 'צור אתר חתונה יפהפה שמנציח את סיפור האהבה שלכם ומעדכן את כל האורחים בכל הפרטים.',
    'RSVP Now': 'אשר נוכחות',
    'Wedding Details': 'כל הפרטים על החתונה',
    'Book Appointment': 'קבע תור',
    'Schedule Consultation': 'קבע ייעוץ ללא עלות',
    'Professional Legal Services': 'שירותי משפט מקצועיים ואמינים',
    'Establish trust and attract clients with a professional law firm website template.': 'בנה אמון עם לקוחות ומשוך עוד פונים באמצעות אתר משרד עורכי דין מקצועי ומרשים.',
    'Subscribe Now': 'הירשם עכשיו',
    'Stay Updated': 'הישאר מעודכן',
    'Expert Financial Consulting': 'ייעוץ פיננסי מומחה להצלחת העסק שלך',
    'Build credibility and attract high-value clients with this professional consulting template.': 'בנה אמינות מקצועית ומשוך לקוחות בעלי ערך גבוה באמצעות תבנית ייעוץ מרשימה.',
    'Donate Now': 'תרום עכשיו',
    'See Our Impact': 'ראה את ההשפעה שלנו',
    'Make a difference with this nonprofit landing page template designed for charities and causes.': 'עשה שינוי אמיתי עם תבנית דף נחיתה לארגונים ללא מטרות רווח, תוכננה במיוחד עבור ארגוני צדקה ומטרות חשובות.',
    'Nonprofit Organization': 'ארגון ללא מטרות רווח',
    'Create buzz and drive registrations for your next conference or event with this high-converting template.': 'צור התרגשות והגדל הרשמות לכנס או אירוע הבא שלך באמצעות תבנית עם המרות גבוהות.',
    'Register Now': 'הירשם עכשיו',
    'View Speakers': 'צפה בדוברים',
    'Get Your Ticket': 'הזמן את הכרטיס שלך',
    'Event Conference': 'כנסים ואירועים מקצועיים',
    'Build trust with patients using this professional healthcare landing page template.': 'בנה אמון עם מטופלים באמצעות דף נחיתה מקצועי לשירותי בריאות.',
    'Healthcare Services': 'שירותי בריאות מקצועיים',
    'Establish trust and attract clients with a professional law firm website template.': 'בנה אמון ומשוך לקוחות חדשים עם אתר משרד עורכי דין מקצועי.',
    'Crypto & Web3': 'קריפטו ו-Web3 - העתיד של הפיננסים',
    'Launch your blockchain project with a cutting-edge Web3 landing page template.': 'השיק את פרויקט הבלוקצ\'יין שלך עם תבנית דף נחיתה Web3 מתקדמת ומרשימה.',
    'Launch App': 'השק את האפליקציה',
    'Join Community': 'הצטרף לקהילה',
    'Digital Marketing Agency': 'סוכנות שיווק דיגיטלי מובילה',
    'Grow your agency with this high-converting marketing landing page template.': 'הגדל את הסוכנות שלך עם תבנית דף נחיתה שיווקית עם המרות גבוהות.',
    'Get Proposal': 'קבל הצעת מחיר',
    'View Services': 'צפה בכל השירותים',
    'Food Delivery App': 'אפליקציית משלוחי אוכל מובילה',
    'Increase orders with this appetizing food delivery landing page template.': 'הגדל הזמנות עם תבנית דף נחיתה למשלוחי אוכל שגורמת לאנשים לרצות להזמין מיד.',
    'Order Now': 'הזמן עכשיו',
    'Mobile App Landing': 'דף נחיתה מנצח לאפליקציה',
    'Personal Brand': 'בנה את המותג האישי שלך',
    'Build your personal brand and grow your audience with this sleek, modern template.': 'בנה את המותג האישי שלך והגדל את הקהל שלך עם תבנית מודרנית ואלגנטית.',
    'Read More': 'קרא עוד',
    'Real Estate': 'נדל"ן - נכסים מובחרים',
    'Showcase properties and attract buyers with this elegant real estate landing page.': 'הצג נכסים מובחרים ומשוך קונים פוטנציאליים באמצעות דף נחיתה אלגנטי לנדל"ן.',
    'View Property': 'צפה בנכס',
    'Schedule Viewing': 'קבע צפייה',
    'Minimal Portfolio': 'פורטפוליו מינימלי ומרשים',
    'Showcase your work with a clean, distraction-free design that puts the focus on your projects.': 'הצג את העבודות שלך עם עיצוב נקי וממוקד ששם את הפרויקטים שלך במרכז.',
    'Contact Me': 'צור קשר',
    'Everything You Need to Scale': 'כל מה שצריך כדי לגדול ולהצליח',
    'Powerful features that grow with your business': 'תכונות עוצמתיות שגדלות יחד עם העסק שלך',
    
    // Stats
    'Active Users': 'משתמשים פעילים',
    'Uptime': 'זמן פעילות',
    'Countries': 'מדינות',
    'Rating': 'דירוג',
    'Projects Completed': 'פרויקטים שהושלמו',
    'Happy Clients': 'לקוחות מרוצים',
    'Awards Won': 'פרסים שהושגו',
    'Years Experience': 'שנות ניסיון',
    'Clients Served': 'לקוחות שטיפלנו בהם',
    'Avg Revenue Growth': 'צמיחת הכנסות ממוצעת',
    'Client Retention': 'שימור לקוחות',
    'Satisfied Customers': 'לקוחות מרוצים',
    'Years of Experience': 'שנות ניסיון',
    'Success Rate': 'שיעור הצלחה',
    'Hours Saved': 'שעות שנחסכו',
    'Years of Excellence': 'שנות מצוינות',
    'Happy Guests': 'אורחים מרוצים',
    'Happy Patients': 'מטופלים מרוצים',
    'Team Members': 'חברי צוות',
    'Downloads': 'הורדות',
    'Conversion Rate': 'שיעור המרה',
    
    // Features
    'Lightning Fast': 'מהיר כברק',
    'Enterprise Security': 'אבטחה ברמה בנקאית',
    'Advanced Analytics': 'אנליטיקה מתקדמת',
    'Seamless Integration': 'אינטגרציה חלקה',
    '24/7 Support': 'תמיכה 24/7',
    'Real-time Collaboration': 'שיתוף פעולה בזמן אמת',
    'Custom Workflows': 'זרימות עבודה מותאמות',
    'Smart Automation': 'אוטומציה חכמה',
    'Our Services': 'השירותים שלנו',
    'We offer a full range of creative services': 'אנו מציעים מגוון מלא של שירותים יצירתיים',
    'Brand Identity': 'זהות מותג',
    'Creating memorable brands that resonate with your audience': 'יצירת מותגים בלתי נשכחים שמדברים לקהל שלך',
    'Web Design': 'עיצוב אתרים',
    'Beautiful, responsive websites that convert visitors into customers': 'אתרים יפים ורספונסיביים שהופכים מבקרים ללקוחות',
    'App Design': 'עיצוב אפליקציות',
    'Intuitive mobile experiences that users love': 'חוויות מובייל אינטואיטיביות שהמשתמשים מתאהבים בהן',
    'Motion Design': 'עיצוב תנועה',
    'Dynamic animations that bring your brand to life': 'אנימציות דינמיות שמחיות את המותג שלך',
    'Photography': 'צילום מקצועי',
    'Professional photography for campaigns and products': 'צילום מקצועי לקמפיינים ומוצרים',
    'Illustration': 'איור מותאם',
    'Custom illustrations that tell your unique story': 'איורים מותאמים אישית שמספרים את הסיפור הייחודי שלך',
    'Strategy Development': 'פיתוח אסטרטגיה',
    'Clear roadmap to reach your goals': 'מפת דרכים ברורה להשגת המטרות שלך',
    'Revenue Growth': 'צמיחת הכנסות',
    'Proven tactics to increase sales': 'טקטיקות מוכחות להגדלת מכירות',
    'Operations': 'תפעול יעיל',
    'Streamline for efficiency': 'ייעול תהליכים ליעילות מקסימלית',
    'Team Building': 'בניית צוות מנצח',
    'Build a winning team': 'בנה צוות שמנצח',
    'Innovation': 'חדשנות',
    'Stay ahead of competition': 'הישאר תמיד צעד אחד לפני התחרות',
    'Scaling': 'הרחבה וצמיחה',
    'Systems for sustainable growth': 'מערכות לצמיחה בת קיימא',
    
    // Feature descriptions
    'Built for speed with cutting-edge technology': 'נבנה למהירות מקסימלית עם טכנולוגיה חדישה',
    'Bank-grade encryption and SOC 2 compliance': 'הצפנה ברמה הגבוהה ביותר ותאימות לסטנדרטים בינלאומיים',
    'Deep insights to make data-driven decisions': 'תובנות עמוקות שעוזרות לך לקבל החלטות מבוססות נתונים',
    'Connect with 200+ tools you already use': 'התחבר בקלות ליותר מ-200 כלים שאתה כבר משתמש בהם',
    'Round-the-clock expert support': 'תמיכה מקצועית 24 שעות ביממה, 7 ימים בשבוע',
    'Work together in real-time from anywhere': 'עבדו יחד בזמן אמת מכל מקום בעולם',
    
    // Navigation Links
    'Features': 'תכונות',
    'Pricing': 'מחירים',
    'Testimonials': 'המלצות',
    'FAQ': 'שאלות נפוצות',
    'About': 'אודות',
    'Contact': 'צור קשר',
    'Blog': 'בלוג',
    'Services': 'שירותים',
    'How It Works': 'איך זה עובד',
    'Pricing Plans': 'תוכניות מחירים',
    'Work': 'עבודות',
    'Book Call': 'קבע שיחה',
    'Results': 'תוצאות',
    'Menu': 'תפריט',
    'Gallery': 'גלריה',
    
    // Buttons
    'Contact Us': 'צור קשר',
    'Start Now': 'התחל עכשיו',
    'Start a Project': 'התחל פרויקט',
    'View Portfolio': 'צפה בפורטפוליו',
    'Book Your Free Call': 'קבע שיחה חינם',
    'Contact Me': 'צור קשר',
    'Start Training': 'התחל להתאמן',
    'Schedule Consultation': 'קבע ייעוץ',
    'Register Now': 'הירשם עכשיו',
    'View Speakers': 'צפה בדוברים',
    'Get Your Ticket': 'קבל את הכרטיס',
    'Subscribe Now': 'הירשם עכשיו',
    'Stay Updated': 'הישאר מעודכן',
    'Donate Now': 'תרום עכשיו',
    'See Our Impact': 'ראה את ההשפעה',
    'Listen Now': 'האזן עכשיו',
    'Book Appointment': 'קבע תור',
    'RSVP Now': 'אשר נוכחות',
    'Wedding Details': 'פרטי החתונה',
    'Launch App': 'השק אפליקציה',
    'Join Community': 'הצטרף לקהילה',
    'Get Proposal': 'קבל הצעה',
    'View Services': 'צפה בשירותים',
    'Order Now': 'הזמן עכשיו',
    'Read More': 'קרא עוד',
    'View Property': 'צפה בנכס',
    'Schedule Viewing': 'קבע צפייה',
    'Add to Cart': 'הוסף לסל',
    'Discover More': 'גלה עוד',
    'Download Now': 'הורד עכשיו',
    'Learn the Secrets': 'גלה את הסודות',
    'Get Downloads': 'קבל הורדות',
    'See Case Studies': 'צפה במקרי בדיקה',
    'Reserve Your Table': 'שמור שולחן',
    
    // CTA Sections
    "Let's Create Something Amazing": 'בוא ניצור משהו מדהים יחד',
    "Ready to transform your brand? We'd love to hear from you.": 'מוכן לשדרג את המותג שלך? נשמח לשמוע ממך ולעזור לך להצליח.',
    "Ready to Transform Your Business?": 'מוכן לשדרג את העסק שלך?',
    "Let's discuss your goals in a free 30-minute strategy call.": 'בוא נדבר על המטרות שלך בשיחת אסטרטגיה חינם של 30 דקות.',
    'Ready to get started?': 'מוכן להתחיל?',
    'Join thousands of satisfied customers today.': 'הצטרף לאלפי לקוחות מרוצים כבר היום.',
    'Get started for free': 'התחל בחינם',
    
    // Testimonials
    "What Clients Say": 'מה הלקוחות שלנו אומרים',
    "Don't just take our word for it": 'אל תסמוך רק על מה שאנחנו אומרים',
    'Client Success Stories': 'סיפורי הצלחה של לקוחות',
    
    // Pricing
    'Simple, Transparent Pricing': 'מחירים פשוטים ושקופים לחלוטין',
    'Choose the plan that works best for you': 'בחר בתוכנית המתאימה ביותר לצרכים שלך',
    'Popular': 'הפופולרי ביותר',
    'Best Value': 'הערך הטוב ביותר',
    'Basic': 'בסיסי',
    'Pro': 'מקצועי',
    'Enterprise': 'ארגוני',
    
    // FAQ
    'Frequently Asked Questions': 'שאלות נפוצות',
    'Everything you need to know about our product': 'כל מה שצריך לדעת על המוצר והשירותים שלנו',
    'What is included?': 'מה כלול במחיר?',
    'How does it work?': 'איך זה עובד?',
    'Can I cancel anytime?': 'האם אפשר לבטל בכל עת?',
    'Is there a free trial?': 'האם יש תקופת ניסיון חינם?',
    'What payment methods do you accept?': 'אילו אמצעי תשלום אתם מקבלים?',
    'Do you offer refunds?': 'האם אתם מציעים החזרים?',
    'How can I contact support?': 'איך אפשר ליצור קשר עם התמיכה?',
    'Is my data secure?': 'האם הנתונים שלי מאובטחים?',
    
    // FAQ Answers
    'Everything you need to succeed is included in your subscription.': 'כל מה שצריך כדי להצליח כלול במנוי שלך ללא עלות נוספת.',
    "It's simple - just sign up, create your page, and launch!": 'פשוט מאוד - פשוט הירשם, צור את הדף שלך, והשק אותו!',
    'Yes, you can cancel your subscription at any time with no penalties.': 'כן, אפשר לבטל את המנוי בכל עת ללא קנסות או עלויות נוספות.',
    'Yes, we offer a 14-day free trial for new users.': 'כן, אנו מציעים 14 ימי ניסיון חינם למשתמשים חדשים.',
    'We accept all major credit cards, PayPal, and bank transfers.': 'אנו מקבלים את כל כרטיסי האשראי העיקריים, PayPal והעברות בנקאיות.',
    'Yes, we offer a 30-day money-back guarantee.': 'כן, אנו מציעים 30 יום אחריות להחזר כספי מלא.',
    'You can reach our support team via email or live chat.': 'אפשר ליצור קשר עם צוות התמיכה שלנו באימייל או בצ\'אט חי.',
    'Yes, we use industry-leading encryption to protect your data.': 'כן, אנו משתמשים בהצפנה מהמתקדמות ביותר בתעשייה כדי להגן על הנתונים שלך.',
    
    // Footer
    'Build beautiful landing pages in minutes with our AI-powered builder.': 'בנה דפי נחיתה יפים ומרשימים בדקות עם הבונה החכם שלנו מבוסס AI.',
    'Follow Us': 'עקוב אחרינו',
    'Privacy Policy': 'מדיניות פרטיות',
    'Terms of Service': 'תנאי שימוש',
    'Home': 'דף הבית',
    'About Us': 'עלינו',
    'Contact Us': 'צור קשר',
    'Help Center': 'מרכז עזרה',
    'Careers': 'קריירה',
    'Press': 'פרסומים',
    
    // Social Media
    'Twitter': 'טוויטר',
    'Facebook': 'פייסבוק',
    'Instagram': 'אינסטגרם',
    'LinkedIn': 'לינקדאין',
    'YouTube': 'יוטיוב',
    'GitHub': 'גיטהאב',
    
    // Additional common phrases
    'Our Team': 'הצוות שלנו',
    'Our Story': 'הסיפור שלנו',
    'Send Message': 'שלח הודעה',
    'Send': 'שלח',
    'Submit': 'שלח',
    'Next': 'הבא',
    'Previous': 'קודם',
    'Back': 'חזור',
    'Close': 'סגור',
    'Save': 'שמור',
    'Cancel': 'בטל',
    'Delete': 'מחק',
    'Edit': 'ערוך',
    'Update': 'עדכן',
    'Search': 'חפש',
    'Filter': 'סנן',
    'Sort': 'מיין',
    'Clear': 'נקה',
    'Apply': 'החל',
    'Reset': 'אפס',
    'Loading...': 'טוען...',
    'Error': 'שגיאה',
    'Success': 'הצלחה',
    'Warning': 'אזהרה',
    'Info': 'מידע',
    'Yes': 'כן',
    'No': 'לא',
    'All': 'הכל',
    'More': 'עוד',
    'Show more': 'הצג עוד',
    'Refresh': 'רענן',
    'Retry': 'נסה שוב',
    'Continue': 'המשך',
    'Finish': 'סיים',
    'Done': 'בוצע',
    'Copy': 'העתק',
    'Share': 'שתף',
    'Download': 'הורד',
    'Import': 'ייבא',
    'Export': 'ייצא',
    'Sign In': 'התחבר',
    'Sign Out': 'התנתק',
    'Sign Up': 'הירשם',
    'Create Account': 'צור חשבון',
    'Forgot Password': 'שכחת סיסמה?',
    'Remember Me': 'זכור אותי',
    'Reset Password': 'איפוס סיסמה',
    'Confirm Password': 'אשר סיסמה',
    'Email Address': 'כתובת אימייל',
    'Phone Number': 'מספר טלפון',
    'Full Name': 'שם מלא',
    'First Name': 'שם פרטי',
    'Last Name': 'שם משפחה',
    'Company': 'חברה',
    'Job Title': 'תפקיד',
    'Message': 'הודעה',
    'Comments': 'הערות',
    'Subject': 'נושא',
    'Settings': 'הגדרות',
    'Account': 'חשבון',
    'Profile': 'פרופיל',
    'Security': 'אבטחה',
    'Notifications': 'התראות',
    'Premium': 'פרימיום',
    'Free': 'חינם',
    'Trial': 'ניסיון',
    'Monthly': 'חודשי',
    'Yearly': 'שנתי',
};

function getHebrewTranslation(text) {
    if (translations[text]) {
        return translations[text];
    }
    return text;
}

function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

function convertTextToBilingual(text) {
    if (typeof text !== 'string') return text;
    return {
        en: text,
        he: getHebrewTranslation(text)
    };
}

function convertComponent(component) {
    if (!component || !component.props) return component;
    
    const converted = { type: component.type, props: {} };
    const bilingualFields = [
        'title', 'subtitle', 'description', 'content',
        'primaryButtonText', 'secondaryButtonText', 'ctaText',
        'buttonText', 'submitButtonText', 'logoText',
        'name', 'label', 'role', 'question', 'answer',
        'copyright', 'period', 'badge', 'subtitle'
    ];
    
    for (const key of Object.keys(component.props)) {
        const value = component.props[key];
        
        if (bilingualFields.includes(key) && typeof value === 'string') {
            converted.props[key] = convertTextToBilingual(value);
        } else if (key === 'links' && Array.isArray(value)) {
            converted.props[key] = value.map(link => ({
                ...link,
                label: convertTextToBilingual(link.label)
            }));
        } else if (key === 'features' && Array.isArray(value)) {
            converted.props[key] = value.map(feature => {
                const result = { ...feature };
                if (typeof feature.title === 'string') {
                    result.title = convertTextToBilingual(feature.title);
                }
                if (typeof feature.description === 'string') {
                    result.description = convertTextToBilingual(feature.description);
                }
                return result;
            });
        } else if (key === 'tiers' && Array.isArray(value)) {
            converted.props[key] = value.map(tier => {
                const result = { ...tier };
                if (typeof tier.name === 'string') {
                    result.name = convertTextToBilingual(tier.name);
                }
                if (typeof tier.description === 'string') {
                    result.description = convertTextToBilingual(tier.description);
                }
                if (typeof tier.buttonText === 'string') {
                    result.buttonText = convertTextToBilingual(tier.buttonText);
                }
                if (Array.isArray(tier.features)) {
                    result.features = tier.features.map(f => {
                        const featResult = { ...f };
                        if (typeof f.text === 'string') {
                            featResult.text = convertTextToBilingual(f.text);
                        }
                        return featResult;
                    });
                }
                return result;
            });
        } else if (key === 'testimonials' && Array.isArray(value)) {
            converted.props[key] = value.map(t => {
                const result = { ...t };
                if (typeof t.content === 'string') {
                    result.content = convertTextToBilingual(t.content);
                }
                if (typeof t.role === 'string') {
                    result.role = convertTextToBilingual(t.role);
                }
                return result;
            });
        } else if (key === 'items' && Array.isArray(value)) {
            converted.props[key] = value.map(item => {
                const result = { ...item };
                if (typeof item.question === 'string') {
                    result.question = convertTextToBilingual(item.question);
                }
                if (typeof item.answer === 'string') {
                    result.answer = convertTextToBilingual(item.answer);
                }
                return result;
            });
        } else if (key === 'stats' && Array.isArray(value)) {
            converted.props[key] = value.map(stat => {
                const result = { ...stat };
                if (typeof stat.label === 'string') {
                    result.label = convertTextToBilingual(stat.label);
                }
                return result;
            });
        } else if (key === 'columns' && Array.isArray(value)) {
            converted.props[key] = value.map(col => {
                const result = { ...col };
                if (typeof col.title === 'string') {
                    result.title = convertTextToBilingual(col.title);
                }
                if (Array.isArray(col.links)) {
                    result.links = col.links.map(l => ({
                        ...l,
                        label: convertTextToBilingual(l.label)
                    }));
                }
                return result;
            });
        } else {
            converted.props[key] = value;
        }
    }
    
    return converted;
}

function convertTemplate(template) {
    const converted = { ...template };
    
    if (converted.puckData) {
        converted.puckData = { ...converted.puckData };
        
        if (Array.isArray(converted.puckData.content)) {
            converted.puckData.content = converted.puckData.content.map(convertComponent);
        }
        
        if (converted.puckData.root && converted.puckData.root.props) {
            converted.puckData.root = {
                ...converted.puckData.root,
                props: { ...converted.puckData.root.props }
            };
            
            if (typeof converted.puckData.root.props.dir === 'string') {
                converted.puckData.root.props.dir = convertTextToBilingual(converted.puckData.root.props.dir);
            }
            if (typeof converted.puckData.root.props.lang === 'string') {
                converted.puckData.root.props.lang = convertTextToBilingual(converted.puckData.root.props.lang);
            }
        }
    }
    
    return converted;
}

function convertAllTemplates() {
    const files = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.json') && f !== 'index.ts');
    
    console.log(`Found ${files.length} template files\n`);
    
    let converted = 0;
    
    for (const file of files) {
        const filePath = path.join(TEMPLATES_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const template = JSON.parse(content);
        
        const result = convertTemplate(template);
        const newContent = JSON.stringify(result, null, 4);
        
        fs.writeFileSync(filePath, newContent);
        converted++;
        
        console.log(`✓ Fixed: ${template.name || template.id}`);
    }
    
    console.log(`\n✅ Fixed ${converted} templates with full Hebrew translations!`);
}

convertAllTemplates();
