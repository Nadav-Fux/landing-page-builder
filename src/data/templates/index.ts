// Pre-built Puck Templates - 23 Total (22 English + 1 Hebrew RTL)
import saasStartup from './saas-startup.json';
import creativeAgency from './creative-agency.json';
import appLaunch from './app-launch.json';
import ecommerceProduct from './ecommerce-product.json';
import portfolioMinimal from './portfolio-minimal.json';
import fitnessGym from './fitness-gym.json';
import restaurantCafe from './restaurant-cafe.json';
import onlineCourse from './online-course.json';
import realEstate from './real-estate.json';
import lawFirm from './law-firm.json';
import eventConference from './event-conference.json';
import consulting from './consulting.json';
import newsletter from './newsletter.json';
import nonprofit from './nonprofit.json';
import podcast from './podcast.json';
import healthcare from './healthcare.json';
import wedding from './wedding.json';
import cryptoWeb3 from './crypto-web3.json';
import ebook from './ebook.json';
import digitalMarketing from './digital-marketing.json';
import foodDelivery from './food-delivery.json';
import mobileApp from './mobile-app.json';
import personalBrand from './personal-brand.json';
import lifeCoachingHebrew from './life-coaching-hebrew.json';

export interface PuckTemplate {
    id: string;
    name: string;
    description: string;
    category: string;
    thumbnail: string;
    rtl?: boolean;
    isBilingual?: boolean;
    puckData: {
        content: any[];
        root: { props: Record<string, any> };
        zones: Record<string, any>;
    };
}

export const templates: PuckTemplate[] = [
    // Original 8
    saasStartup as PuckTemplate,
    creativeAgency as PuckTemplate,
    appLaunch as PuckTemplate,
    ecommerceProduct as PuckTemplate,
    portfolioMinimal as PuckTemplate,
    fitnessGym as PuckTemplate,
    restaurantCafe as PuckTemplate,
    onlineCourse as PuckTemplate,
    // New 10
    realEstate as PuckTemplate,
    lawFirm as PuckTemplate,
    eventConference as PuckTemplate,
    consulting as PuckTemplate,
    newsletter as PuckTemplate,
    nonprofit as PuckTemplate,
    podcast as PuckTemplate,
    healthcare as PuckTemplate,
    wedding as PuckTemplate,
    cryptoWeb3 as PuckTemplate,
    ebook as PuckTemplate,
    // New Templates
    digitalMarketing as PuckTemplate,
    foodDelivery as PuckTemplate,
    mobileApp as PuckTemplate,
    personalBrand as PuckTemplate,
    // Hebrew RTL Templates
    lifeCoachingHebrew as PuckTemplate,
];

export const getTemplateById = (id: string): PuckTemplate | undefined => {
    return templates.find(t => t.id === id);
};

export const getTemplatesByCategory = (category: string): PuckTemplate[] => {
    return templates.filter(t => t.category.toLowerCase() === category.toLowerCase());
};

export const getAllCategories = (): string[] => {
    return [...new Set(templates.map(t => t.category))];
};

// Bilingual template conversion
export function convertTemplateToBilingual(template: PuckTemplate): PuckTemplate {
    if (template.isBilingual) return template;

    return {
        ...template,
        isBilingual: true,
        name: `${template.name} (Bilingual)`,
        description: `${template.description} - Available in English and Hebrew`,
        puckData: {
            ...template.puckData,
            content: template.puckData.content.map((component: any) =>
                convertComponentToBilingual(component)
            ),
            root: {
                ...template.puckData.root,
                props: {
                    ...template.puckData.root.props,
                    dir: { en: 'ltr', he: 'rtl' },
                    lang: { en: 'en', he: 'he' }
                }
            }
        }
    };
}

function convertComponentToBilingual(component: any): any {
    const converted = { ...component };
    const bilingualFields = ['title', 'subtitle', 'description', 'primaryButtonText',
                             'secondaryButtonText', 'ctaText', 'buttonText', 'submitButtonText',
                             'logoText', 'name', 'label'];

    if (converted.props) {
        converted.props = { ...converted.props };

        for (const field of bilingualFields) {
            if (typeof converted.props[field] === 'string') {
                converted.props[field] = {
                    en: converted.props[field],
                    he: getHebrewTranslation(field, converted.props[field])
                };
            }
        }

        if (Array.isArray(converted.props.links)) {
            converted.props.links = converted.props.links.map((link: any) => ({
                ...link,
                label: {
                    en: link.label,
                    he: getHebrewTranslation('link', link.label)
                }
            }));
        }

        if (Array.isArray(converted.props.features)) {
            converted.props.features = converted.props.features.map((feature: any) => ({
                ...feature,
                title: typeof feature.title === 'string' ? {
                    en: feature.title,
                    he: getHebrewTranslation('feature', feature.title)
                } : feature.title,
                description: typeof feature.description === 'string' ? {
                    en: feature.description,
                    he: getHebrewTranslation('featureDesc', feature.description)
                } : feature.description
            }));
        }
    }

    return converted;
}

function getHebrewTranslation(context: string, text: string): string {
    const translations: Record<string, Record<string, string>> = {
        hero: {
            'Build Better Products Faster': 'בנה מוצרים טובים יותר, מהר יותר',
            'The all-in-one platform that helps teams ship 10x faster': 'הפלטפורמה המלאה שעוזרת לצוותים לשלוח פי 10 מהר יותר',
            'Start Free Trial': 'התחל חינם',
            'Watch Demo': 'צפה בהדגמה',
            'Get Started': 'התחל עכשיו',
            'Learn More': 'למד עוד'
        },
        stat: {
            'Active Users': 'משתמשים פעילים',
            'Uptime': 'זמן פעילות',
            'Countries': 'מדינות',
            'Rating': 'דירוג',
            'Satisfied Customers': 'לקוחות מרוצים',
            'Years of Experience': 'שנות ניסיון',
            'Success Rate': 'שיעור הצלחה',
            'Hours Saved': 'שעות שנחסכו'
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
            'Powerful features that grow with your business': 'תכונות חזקות שגדלות יחד איתך'
        },
        featureDesc: {
            'Built for speed with cutting-edge technology': 'נבנה למהירות עם טכנולוגיה חדישה',
            'Bank-grade encryption and SOC 2 compliance': 'הצפנה ברמה בנקאית ותאימות SOC 2',
            'Deep insights to make data-driven decisions': 'תובנות עמוקות לקבלת החלטות מבוססות נתונים',
            'Connect with 200+ tools you already use': 'התחבר ליותר מ-200 כלים שאתה כבר משתמש',
            'Round-the-clock expert support': 'תמיכת מומחים 24/7',
            'Work together in real-time from anywhere': 'עבדו יחד בזמן אמת מכל מקום'
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
            'Pricing Plans': 'תוכניות מחירים'
        },
        button: {
            'Get Started': 'התחל עכשיו',
            'Learn More': 'למד עוד',
            'Sign Up': 'הירשם',
            'Subscribe': 'הירשם',
            'Contact Us': 'צור קשר',
            'Start Now': 'התחל עכשיו'
        }
    };

    if (translations[context] && translations[context][text]) {
        return translations[context][text];
    }
    return text;
}

export default templates;
