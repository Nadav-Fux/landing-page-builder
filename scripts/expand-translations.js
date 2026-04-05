const fs = require('fs');
const path = require('path');

const TEMPLATES_DIR = path.join(__dirname, '../src/data/templates');

const translations = {
    hero: {
        'Build Better Products Faster': 'בנה מוצרים טובים יותר, מהר יותר',
        'The all-in-one platform that helps teams ship 10x faster. No complex setup, just results.': 'הפלטפורמה המלאה שעוזרת לצוותים לשלוח פי 10 מהר יותר. אין הגדרות מורכבות, רק תוצאות.',
        'Start Free Trial': 'התחל חינם',
        'Watch Demo': 'צפה בהדגמה',
        'Get Started': 'התחל עכשיו',
        'Learn More': 'למד עוד',
        'We Create Digital Experiences': 'אנחנו יוצרים חוויות דיגיטליות',
        'Award-winning creative agency helping brands tell their stories through stunning design and innovative technology.': 'סוכנות יצירתית זוכת פרסים שעוזרת למותגים לספר את הסיפור שלהם דרך עיצוב מרהיב וטכנולוגיה חדשנית.',
        'View Our Work': 'צפה בעבודות שלנו',
        'Get in Touch': 'צור קשר',
        'Scale Your Business to 7 Figures': 'הגדל את העסק שלך ל-7 ספרות',
        'Strategic consulting for ambitious entrepreneurs. Proven frameworks that have helped 200+ businesses grow.': 'ייעוץ אסטרטגי ליזמים שאפתניים. מסגרות מוכחות שעזרו ל-200+ עסקים לצמוח.',
        'Book Free Strategy Call': 'קבע שיחת אסטרטגיה חינם',
        'See Results': 'צפה בתוצאות',
        'A Culinary Experience Like No Other': 'חוויה קולינרית כמו שלא הייתה',
        'Fine dining meets contemporary cuisine. Fresh ingredients, masterful preparation, unforgettable flavors.': 'אוכל גורמה פוגש מטבח עכשווי. חומרים טריים, הכנה מעולה, טעמים בלתי נשכחים.',
        'Reserve Your Table': 'שמור שולחן',
        'View Menu': 'צפה בתפריט',
        'Launch Your App with Confidence': 'השיק את האפליקציה שלך בביטחון',
        'The complete toolkit for app marketers. From landing pages to promo videos, we have everything you need to drive downloads.': 'ערכת הכלים המלאה למשווקי אפליקציות. מדפי נחיתה ועד סרטונים קידום, יש לנו את כל מה שצריך כדי להגדיל הורדות.',
        'Get Downloads': 'קבל הורדות',
        'See Case Studies': 'צפה במקרי בדיקה',
        'Create Your Ebook in Minutes': 'צור את האיבוק שלך בדקות',
        'Lead capture pages that actually convert. Beautiful designs, proven copy, and seamless email integration.': 'דפי לכידת לידים שבאמת ממירים. עיצובים יפים, טקסט מוכח, ואינטגרציית אימייל חלקה.',
        'Download Now': 'הורד עכשיו',
        'Learn the Secrets': 'למד את הסודות',
        'Sell Products Online with Confidence': 'מכור מוצרים באונליין בביטחון',
        'High-converting product page template designed for Shopify, WooCommerce, and other platforms.': 'תבנית דף מוצר עם המרות גבוהות עבור Shopify, WooCommerce ופלטפורמות אחרות.',
        'Add to Cart': 'הוסף לסל',
        'Discover More': 'גלה עוד',
        'Minimal Portfolio': 'פורטפוליו מינימלי',
        'Showcase your work with a clean, distraction-free design that puts the focus on your projects.': 'הצג את העבודה שלך עם עיצוב נקי וללא הסחות דעת שמעמיד את הפרויקטים במרכז.',
        'Contact Me': 'צור קשר',
        'Transform Your Body in 90 Days': 'שנה את הגוף שלך ב-90 יום',
        'Proven fitness programs designed by expert trainers. Real results, no gimmicks.': 'תוכניות כושר מוכחות שתוכננו על ידי מאמנים מומחים. תוצאות אמיתיות, בלי טריקים.',
        'Start Training': 'התחל להתאמן',
        'Join Now': 'הצטרף עכשיו',
        'Book Your Session': 'קבע את האימון שלך',
        'Professional Legal Services': 'שירותי משפט מקצועיים',
        'Establish trust and attract clients with a professional law firm website template.': 'בנה אמון ומשוך לקוחות עם תבנית אתר למשרד עורכי דין מקצועי.',
        'Schedule Consultation': 'קבע ייעוץ',
        'Event Conference': 'כנס ואירוע',
        'Create buzz and drive registrations for your next conference or event with this high-converting template.': 'צור התרגשות והגדל הרשמות לכנס או אירוע הבא שלך עם תבנית עם המרות גבוהות.',
        'Register Now': 'הירשם עכשיו',
        'View Speakers': 'צפה בדוברים',
        'Get Your Ticket': 'קבל את הכרטיס שלך',
        'Expert Financial Consulting': 'ייעוץ פינני מומחה',
        'Build credibility and attract high-value clients with this professional consulting template.': 'בנה אמינות ומשוך לקוחות בעלי ערך עם תבנית ייעוץ מקצועית.',
        'Subscribe Now': 'הירשם עכשיו',
        'Stay Updated': 'הישאר מעודכן',
        'Nonprofit Organization': 'ארגון ללא מטרות רווח',
        'Make a difference with this nonprofit landing page template designed for charities and causes.': 'עשה שינוי עם תבנית דף נחיתה לארגונים ללא מטרות רווח עבור ארגוני צדקה ומטרות.',
        'Donate Now': 'תרום עכשיו',
        'See Our Impact': 'ראה את ההשפעה שלנו',
        'Start Your Podcast': 'התחל את הפודקאסט שלך',
        'Launch your podcast with a professional landing page that converts listeners into subscribers.': 'השיק את הפודקאסט שלך עם דף נחיתה מקצועי שהופך מאזינים למנויים.',
        'Listen Now': 'האזן עכשיו',
        'Subscribe to Newsletter': 'הירשם לניוזלטר',
        'Healthcare Services': 'שירותי בריאות',
        'Build trust with patients using this professional healthcare landing page template.': 'בנה אמון עם מטופלים באמצעות תבנית דף נחיתה לשירותי בריאות מקצועית.',
        'Book Appointment': 'קבע תור',
        'Your Dream Wedding': 'חתונת החלומות שלך',
        'Create a beautiful wedding website that captures your love story and keeps guests informed.': 'צור אתר חתונה יפה שמנציח את סיפור האהבה שלך ומעדכן את האורחים.',
        'RSVP Now': 'אשר נוכחות',
        'Wedding Details': 'פרטי החתונה',
        'Crypto & Web3': 'קריפטו ו-Web3',
        'Launch your blockchain project with a cutting-edge Web3 landing page template.': 'השיק את פרויקט הבלוקצ\'יין שלך עם תבנית דף נחיתה Web3 מתקדמת.',
        'Launch App': 'השיק אפליקציה',
        'Join Community': 'הצטרף לקהילה',
        'Digital Marketing Agency': 'סוכנות שיווק דיגיטלי',
        'Grow your agency with this high-converting marketing landing page template.': 'הגדל את הסוכנות שלך עם תבנית דף נחיתה שיווקית עם המרות גבוהות.',
        'Get Proposal': 'קבל הצעה',
        'View Services': 'צפה בשירותים',
        'Food Delivery App': 'אפליקציית משלוחי אוכל',
        'Increase orders with this appetizing food delivery landing page template.': 'הגדל הזמנות עם תבנית דף נחיתה למשלוחי אוכל מפתה.',
        'Order Now': 'הזמן עכשיו',
        'Mobile App Landing': 'דף נחיתה לאפליקציה',
        'Personal Brand': 'מותג אישי',
        'Build your personal brand and grow your audience with this sleek, modern template.': 'בנה את המותג האישי שלך והגדל את הקהל שלך עם תבנית מודרנית ואלגנטית.',
        'Read More': 'קרא עוד',
        'Real Estate': 'נדל"ן',
        'Showcase properties and attract buyers with this elegant real estate landing page.': 'הצג נכסים ומשוך קונים עם תבנית דף נחיתה לנדל"ן אלגנטית.',
        'View Property': 'צפה בנכס',
        'Schedule Viewing': 'קבע צפייה',
    },
    stat: {
        'Active Users': 'משתמשים פעילים',
        'Uptime': 'זמן פעילות',
        'Countries': 'מדינות',
        'Rating': 'דירוג',
        'Projects Completed': 'פרויקטים הושלמו',
        'Happy Clients': 'לקוחות מרוצים',
        'Awards Won': 'פרסים הושגו',
        'Years Experience': 'שנות ניסיון',
        'Clients Served': 'לקוחות ששרתו',
        'Avg Revenue Growth': 'צמיחת הכנסות ממוצעת',
        'Years Experience': 'שנות ניסיון',
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
    },
    feature: {
        'Lightning Fast': 'מהיר כברק',
        'Enterprise Security': 'אבטחה ברמה בנקאית',
        'Advanced Analytics': 'אנליטיקה מתקדמת',
        'Seamless Integration': 'אינטגרציה חלקה',
        '24/7 Support': 'תמיכה 24/7',
        'Real-time Collaboration': 'שיתוף פעולה בזמן אמת',
        'Custom Workflows': 'זרימות עבודה מותאמות',
        'Smart Automation': 'אוטומציה חכמה',
        'Everything You Need to Scale': 'כל מה שצריך כדי לגדול',
        'Powerful features that grow with your business': 'תכונות חזקות שגדלות יחד איתך',
        'Our Services': 'השירותים שלנו',
        'We offer a full range of creative services': 'אנו מציעים מגוון מלא של שירותים יצירתיים',
        'Brand Identity': 'זהות מותג',
        'Creating memorable brands that resonate with your audience': 'יצירת מותגים בלתי נשכחים שמהדהדים עם הקהל שלך',
        'Web Design': 'עיצוב אתרים',
        'Beautiful, responsive websites that convert visitors into customers': 'אתרים יפים ורספונסיביים שהופכים מבקרים ללקוחות',
        'App Design': 'עיצוב אפליקציות',
        'Intuitive mobile experiences that users love': 'חוויות מובייל אינטואיטיביות שהמשתמשים אוהבים',
        'Motion Design': 'עיצוב תנועה',
        'Dynamic animations that bring your brand to life': 'אנימציות דינמיות שמחיות את המותג שלך',
        'Photography': 'צילום',
        'Professional photography for campaigns and products': 'צילום מקצועי לקמפיינים ומוצרים',
        'Illustration': 'איור',
        'Custom illustrations that tell your unique story': 'איורים מותאמים שמספרים את הסיפור הייחודי שלך',
        'Strategy Development': 'פיתוח אסטרטגיה',
        'Clear roadmap to reach your goals': 'מפת דרכים ברורה להשגת המטרות שלך',
        'Revenue Growth': 'צמיחת הכנסות',
        'Proven tactics to increase sales': 'טקטיקות מוכחות להגדלת מכירות',
        'Operations': 'תפעול',
        'Streamline for efficiency': 'ייעול ליעילות',
        'Team Building': 'בניית צוות',
        'Build a winning team': 'בנה צוות מנצח',
        'Innovation': 'חדשנות',
        'Stay ahead of competition': 'הישאר לפני התחרות',
        'Scaling': 'הרחבה',
        'Systems for sustainable growth': 'מערכות לצמיחה בת קיימא',
    },
    featureDesc: {
        'Built for speed with cutting-edge technology': 'נבנה למהירות עם טכנולוגיה חדישה',
        'Bank-grade encryption and SOC 2 compliance': 'הצפנה ברמה בנקאית ותאימות SOC 2',
        'Deep insights to make data-driven decisions': 'תובנות עמוקות לקבלת החלטות מבוססות נתונים',
        'Connect with 200+ tools you already use': 'התחבר ליותר מ-200 כלים שאתה כבר משתמש',
        'Round-the-clock expert support': 'תמיכת מומחים 24/7',
        'Work together in real-time from anywhere': 'עבדו יחד בזמן אמת מכל מקום',
        'Clear roadmap to reach your goals': 'מפת דרכים ברורה להשגת המטרות שלך',
        'Proven tactics to increase sales': 'טקטיקות מוכחות להגדלת מכירות',
        'Streamline for efficiency': 'ייעול ליעילות',
        'Build a winning team': 'בנה צוות מנצח',
        'Stay ahead of competition': 'הישאר לפני התחרות',
        'Systems for sustainable growth': 'מערכות לצמיחה בת קיימא',
    },
    link: {
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
    },
    button: {
        'Get Started': 'התחל עכשיו',
        'Learn More': 'למד עוד',
        'Sign Up': 'הירשם',
        'Subscribe': 'הירשם',
        'Contact Us': 'צור קשר',
        'Start Now': 'התחל עכשיו',
        "Let's Talk": 'בוא נדבר',
        'View Our Work': 'צפה בעבודות שלנו',
        'Get in Touch': 'צור קשר',
        'Book Free Strategy Call': 'קבע שיחת אסטרטגיה חינם',
        'See Results': 'צפה בתוצאות',
        'Start a Project': 'התחל פרויקט',
        'View Portfolio': 'צפה בפורטפוליו',
        'Book Your Free Call': 'קבע שיחה חינם',
        'Reserve Table': 'שמור שולחן',
        'Reserve Your Table': 'שמור את השולחן שלך',
        'View Menu': 'צפה בתפריט',
        'Get Downloads': 'קבל הורדות',
        'See Case Studies': 'צפה במקרי בדיקה',
        'Download Now': 'הורד עכשיו',
        'Learn the Secrets': 'למד את הסודות',
        'Add to Cart': 'הוסף לסל',
        'Discover More': 'גלה עוד',
        'Contact Me': 'צור קשר',
        'Transform Your Body in 90 Days': 'שנה את הגוף שלך ב-90 יום',
        'Start Training': 'התחל להתאמן',
        'Join Now': 'הצטרף עכשיו',
        'Book Your Session': 'קבע את האימון שלך',
        'Schedule Consultation': 'קבע ייעוץ',
        'Register Now': 'הירשם עכשיו',
        'View Speakers': 'צפה בדוברים',
        'Get Your Ticket': 'קבל את הכרטיס שלך',
        'Subscribe Now': 'הירשם עכשיו',
        'Stay Updated': 'הישאר מעודכן',
        'Donate Now': 'תרום עכשיו',
        'See Our Impact': 'ראה את ההשפעה שלנו',
        'Start Your Podcast': 'התחל את הפודקאסט שלך',
        'Listen Now': 'האזן עכשיו',
        'Book Appointment': 'קבע תור',
        'RSVP Now': 'אשר נוכחות',
        'Wedding Details': 'פרטי החתונה',
        'Launch App': 'השיק אפליקציה',
        'Join Community': 'הצטרף לקהילה',
        'Get Proposal': 'קבל הצעה',
        'View Services': 'צפה בשירותים',
        'Order Now': 'הזמן עכשיו',
        'Read More': 'קרא עוד',
        'View Property': 'צפה בנכס',
        'Schedule Viewing': 'קבע צפייה',
    },
    cta: {
        "Let's Create Something Amazing": 'בוא ניצור משהו מדהים',
        'Ready to transform your brand? We\'d love to hear from you.': 'מוכן לשדרג את המותג שלך? נשמח לשמוע ממך.',
        "Ready to Transform Your Business?": 'מוכן לשדרג את העסק שלך?',
        "Let's discuss your goals in a free 30-minute strategy call.": 'בוא נדבר על המטרות שלך בשיחת אסטרטגיה חינם בת 30 דקות.',
    },
    testimonial: {
        "What Clients Say": 'מה הלקוחות אומרים',
        "Don't just take our word for it": 'אל תסמוך רק על המילים שלנו',
        'Client Success Stories': 'סיפורי הצלחה של לקוחות',
    },
    pricing: {
        'Simple, Transparent Pricing': 'מחירים פשוטים ושקופים',
        'Choose the plan that works best for you': 'בחר בתוכנית המתאימה לך',
        'Popular': 'פופולרי',
    },
    faq: {
        'Frequently Asked Questions': 'שאלות נפוצות',
        'Everything you need to know about our product': 'כל מה שצריך לדעת על המוצר שלנו',
    },
    footer: {
        'Build beautiful landing pages in minutes with our AI-powered builder.': 'בנה דפי נחיתה יפים בדקות עם הבונה המונע על ידי AI שלנו.',
        'Follow Us': 'עקוב אחרינו',
        'Privacy Policy': 'מדיניות פרטיות',
        'Terms of Service': 'תנאי שימוש',
    }
};

function getHebrewTranslation(context, text) {
    if (translations[context] && translations[context][text]) {
        return translations[context][text];
    }
    return text;
}

function isBilingualText(obj) {
    return obj && typeof obj === 'object' && 'en' in obj && 'he' in obj && typeof obj.en === 'string';
}

function toBilingual(text, context = 'general') {
    if (isBilingualText(text)) return text;
    if (typeof text !== 'string') return text;
    return {
        en: text,
        he: getHebrewTranslation(context, text)
    };
}

function convertComponent(component) {
    if (!component.props) return component;
    
    const converted = { ...component, props: { ...component.props } };
    const bilingualFields = [
        'title', 'subtitle', 'description', 'content',
        'primaryButtonText', 'secondaryButtonText', 'ctaText',
        'buttonText', 'submitButtonText', 'logoText',
        'name', 'label', 'role'
    ];
    
    for (const field of bilingualFields) {
        if (typeof converted.props[field] === 'string') {
            converted.props[field] = toBilingual(converted.props[field], field === 'title' ? 'feature' : 'general');
        }
    }
    
    if (Array.isArray(converted.props.links)) {
        converted.props.links = converted.props.links.map(link => ({
            ...link,
            label: toBilingual(link.label, 'link')
        }));
    }
    
    if (Array.isArray(converted.props.features)) {
        converted.props.features = converted.props.features.map(feature => {
            const result = { ...feature };
            if (typeof feature.title === 'string') {
                result.title = toBilingual(feature.title, 'feature');
            }
            if (typeof feature.description === 'string') {
                result.description = toBilingual(feature.description, 'featureDesc');
            }
            return result;
        });
    }
    
    if (Array.isArray(converted.props.tiers)) {
        converted.props.tiers = converted.props.tiers.map(tier => {
            const result = { ...tier };
            if (typeof tier.name === 'string') {
                result.name = toBilingual(tier.name, 'tier');
            }
            if (typeof tier.description === 'string') {
                result.description = toBilingual(tier.description, 'tierDesc');
            }
            if (typeof tier.buttonText === 'string') {
                result.buttonText = toBilingual(tier.buttonText, 'button');
            }
            if (Array.isArray(tier.features)) {
                result.features = tier.features.map(f => {
                    const featResult = { ...f };
                    if (typeof f.text === 'string') {
                        featResult.text = toBilingual(f.text, 'feature');
                    }
                    return featResult;
                });
            }
            return result;
        });
    }
    
    if (Array.isArray(converted.props.testimonials)) {
        converted.props.testimonials = converted.props.testimonials.map(t => {
            const result = { ...t };
            if (typeof t.content === 'string') {
                result.content = toBilingual(t.content, 'testimonial');
            }
            return result;
        });
    }
    
    if (Array.isArray(converted.props.items)) {
        converted.props.items = converted.props.items.map(item => {
            const result = { ...item };
            if (typeof item.question === 'string') {
                result.question = toBilingual(item.question, 'question');
            }
            if (typeof item.answer === 'string') {
                result.answer = toBilingual(item.answer, 'answer');
            }
            return result;
        });
    }
    
    if (Array.isArray(converted.props.stats)) {
        converted.props.stats = converted.props.stats.map(stat => {
            const result = { ...stat };
            if (typeof stat.label === 'string') {
                result.label = toBilingual(stat.label, 'stat');
            }
            return result;
        });
    }
    
    if (Array.isArray(converted.props.columns)) {
        converted.props.columns = converted.props.columns.map(col => {
            const result = { ...col };
            if (typeof col.title === 'string') {
                result.title = toBilingual(col.title, 'column');
            }
            if (Array.isArray(col.links)) {
                result.links = col.links.map(l => ({
                    ...l,
                    label: toBilingual(l.label, 'link')
                }));
            }
            return result;
        });
    }
    
    return converted;
}

function convertTemplate(template) {
    const converted = { ...template };
    
    if (converted.puckData) {
        if (Array.isArray(converted.puckData.content)) {
            converted.puckData.content = converted.puckData.content.map(convertComponent);
        }
        
        if (converted.puckData.root && converted.puckData.root.props) {
            converted.puckData.root = {
                ...converted.puckData.root,
                props: {
                    ...converted.puckData.root.props,
                    dir: toBilingual(converted.puckData.root.props.dir || 'ltr', 'dir'),
                    lang: toBilingual(converted.puckData.root.props.lang || 'en', 'lang')
                }
            };
        }
    }
    
    return converted;
}

function convertAllTemplates() {
    const files = fs.readdirSync(TEMPLATES_DIR).filter(f => f.endsWith('.json') && f !== 'index.ts');
    
    console.log(`Found ${files.length} template files`);
    
    let converted = 0;
    let skipped = 0;
    for (const file of files) {
        const filePath = path.join(TEMPLATES_DIR, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const template = JSON.parse(content);
        
        const result = convertTemplate(template);
        
        const originalContent = fs.readFileSync(filePath, 'utf-8');
        const newContent = JSON.stringify(result, null, 4);
        
        if (originalContent === newContent) {
            skipped++;
        } else {
            fs.writeFileSync(filePath, newContent);
            converted++;
            console.log(`✓ Updated: ${template.name || template.id}`);
        }
    }
    
    console.log(`\n✅ Updated ${converted} templates`);
    console.log(`⏭ Skipped ${skipped} templates (no changes needed)`);
}

convertAllTemplates();
