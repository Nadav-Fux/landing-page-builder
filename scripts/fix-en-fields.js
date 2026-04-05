const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, '..', 'src', 'data', 'templates');

const translations = {
    // Links
    'אודות': 'About',
    'שיטת העבודה': 'How It Works',
    'המלצות': 'Testimonials',
    'שאלות נפוצות': 'FAQ',
    'צור קשר': 'Contact',
    'בלוג': 'Blog',
    'שירותים': 'Services',
    'תכונות': 'Features',
    'מחירים': 'Pricing',

    // Life Coaching specific
    'שחר שיאות אישית': 'Shahar Personal Coaching',
    'קבע/י פגישת היכרות': 'Book Introductory Session',
    'קבע/י פגישת היכרות חינם': 'Book Free Intro Session',
    'למד/י עוד עליי': 'Learn More About Me',

    // Hero
    'גלה/י את הכוח הפנימי שלך': 'Discover Your Inner Power',
    'תהליך משנה חיים שיעזור לך לפרוץ מחסמים, להגשים חלומות ולחיות את החיים שאת/ה רוצה/ה. מלווה אותך בכל שלב, בלבביות ובמקצועיות.': 'A life-changing process that will help you break through barriers, fulfill your dreams, and live the life you want. I accompany you every step of the way with warmth and professionalism.',

    // Stats
    'מתאמנים מרוצים': 'Satisfied Trainees',
    'שנות ניסיון': 'Years of Experience',
    'שעות ליווי': 'Hours of Coaching',
    'שיעור הצלחה': 'Success Rate',

    // Features
    'פגישות אישיות': 'Personal Sessions',
    'תמיכה בין הפגישות': 'Between-Session Support',
    'כלים מעשיים': 'Practical Tools',
    'תוכנית אישית': 'Personal Plan',

    // Testimonials
    'התהליך עם שחר שינה לי את החיים. הגעתי אליו בתקופה לא פשוטה והוא עזר לי למצוא את הכוח הפנימי שלי.': 'My journey with Shahar changed my life. I came to him during a difficult time and he helped me find my inner strength.',
    'מקצועיות ולבביות ביחד. שחר יודע איך להתאים את התהליך לכל אחד.': 'Professionalism and warmth together. Shahar knows how to tailor the process to each individual.',
    'אחרי שנים של התלבטויות, פגישה אחת עם שחר נתנה לי את הכיוון.': 'After years of hesitations, one meeting with Shahar gave me direction.',

    // FAQ
    'כמה זמן נמשך התהליך?': 'How long does the process take?',
    'משך התהליך משתנה בהתאם למטרות ולקצב האישי שלך. בדרך כלל מדובר בין 3 ל-6 חודשים.': 'The duration varies depending on your personal goals and pace. Usually between 3 to 6 months.',
    'האם התהליך מתאים לכולם?': 'Is the process suitable for everyone?',
    'כן! התהליך מותאם אישית לכל אחד, ללא קשר לגיל או לרקע.': 'Yes! The process is customized for each individual, regardless of age or background.',
    'מה העלות?': 'What is the cost?',
    'המחירים משתנים בהתאם לחבילה הנבחרת. צרו קשר לקבלת פרטים מלאים.': 'Prices vary depending on the package chosen. Contact us for full details.',
    'איך מתחילים?': 'How do we start?',
    'פשוט צרו קשר ונקבע פגישת היכרות חינם שבה נכיר ונבין את הצרכים שלכם.': 'Simply contact us and we will schedule a free introductory meeting where we will get to know you and understand your needs.',

    // CTA
    'מוכנים להתחיל את השינוי?': 'Ready to start the change?',
    'קבעו פגישת היכרות חינם ונתחיל יחד את המסע לעבר החיים שתמיד רציתם.': 'Schedule a free introductory meeting and let\'s start together the journey towards the life you\'ve always wanted.',

    // Footer
    'שחר שיאות אישית - מלווה אותך בדרך להגשמה עצמית': 'Shahar Personal Coaching - Accompanying you on the path to self-fulfillment',
    'צור קשר': 'Contact Us',
    'עקבו אחרינו': 'Follow Us',
};

function fixTemplate(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const template = JSON.parse(content);

    let fixed = false;

    function fixBilingual(obj) {
        if (obj && typeof obj === 'object') {
            if ('en' in obj && 'he' in obj && typeof obj.en === 'string' && typeof obj.he === 'string') {
                // Check if 'en' contains Hebrew characters
                const hebrewRegex = /[\u0590-\u05FF]/;
                if (hebrewRegex.test(obj.en)) {
                    // Look up translation
                    const translation = translations[obj.en];
                    if (translation) {
                        obj.en = translation;
                        fixed = true;
                    }
                }
            } else {
                // Recursively fix nested objects
                for (const key of Object.keys(obj)) {
                    fixBilingual(obj[key]);
                }
            }
        } else if (Array.isArray(obj)) {
            for (const item of obj) {
                fixBilingual(item);
            }
        }
    }

    if (template.puckData) {
        fixBilingual(template.puckData);
    }

    if (fixed) {
        fs.writeFileSync(filePath, JSON.stringify(template, null, 2));
        console.log(`Fixed: ${template.name}`);
    }

    return fixed;
}

// Process all template files
const files = fs.readdirSync(templatesDir).filter(f => f.endsWith('.json'));
let fixedCount = 0;

for (const file of files) {
    const filePath = path.join(templatesDir, file);
    if (fixTemplate(filePath)) {
        fixedCount++;
    }
}

console.log(`\nFixed ${fixedCount} template(s)`);
