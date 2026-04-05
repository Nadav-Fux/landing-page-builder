export type Language = 'en' | 'he';

export interface BilingualText {
    en: string;
    he: string;
}

export interface BilingualField<T> {
    en: T;
    he: T;
}

export function getLocalizedText(bilingual: BilingualText | string | undefined, lang: Language): string {
    if (!bilingual) return '';
    if (typeof bilingual === 'string') return bilingual;
    return bilingual[lang] || bilingual.en || '';
}

export function createBilingualText(en: string, he: string): BilingualText {
    return { en, he };
}

export function isBilingual(obj: unknown): obj is BilingualText {
    if (!obj || typeof obj !== 'object') return false;
    const o = obj as Record<string, unknown>;
    return 'en' in o && 'he' in o && typeof o.en === 'string' && typeof o.he === 'string';
}

interface TemplateData {
    id: string;
    name: string;
    description: string;
    category: string;
    thumbnail: string;
    rtl?: boolean;
    puckData: {
        content: unknown[];
        root: { props: Record<string, unknown> };
        zones: Record<string, unknown>;
    };
}

export function convertToBilingual(template: TemplateData): TemplateData {
    const converted = JSON.parse(JSON.stringify(template)) as TemplateData;
    
    if (converted.puckData) {
        converted.puckData = convertContentToBilingual(converted.puckData) as typeof converted.puckData;
    }
    
    return converted;
}

interface PuckData {
    content: unknown[];
    root: { props: Record<string, unknown> };
    zones: Record<string, unknown>;
}

function convertContentToBilingual(data: PuckData): PuckData {
    return {
        content: (data.content as Record<string, unknown>[]).map(item => convertComponentToBilingual(item)),
        root: convertRootToBilingual(data.root),
        zones: data.zones
    };
}

function convertComponentToBilingual(component: Record<string, unknown>): Record<string, unknown> {
    const converted = { ...component };
    
    if (converted.props && typeof converted.props === 'object') {
        converted.props = convertPropsToBilingual(converted.props as Record<string, unknown>);
    }
    
    return converted;
}

function convertPropsToBilingual(props: Record<string, unknown>): Record<string, unknown> {
    const converted: Record<string, unknown> = {};
    
    const bilingualKeys = [
        'title', 'subtitle', 'description', 'content',
        'primaryButtonText', 'secondaryButtonText', 'ctaText',
        'buttonText', 'submitButtonText', 'logoText',
        'name', 'label'
    ];
    
    for (const [key, value] of Object.entries(props)) {
        if (bilingualKeys.includes(key) && typeof value === 'string') {
            converted[key] = {
                en: value,
                he: translateToHebrew(key, value)
            } as BilingualText;
        } else if (key === 'links' && Array.isArray(value)) {
            converted[key] = (value as Record<string, unknown>[]).map((link: Record<string, unknown>) => ({
                ...link,
                label: {
                    en: link.label,
                    he: translateToHebrew('link', link.label as string)
                } as BilingualText
            }));
        } else if (key === 'features' && Array.isArray(value)) {
            converted[key] = (value as Record<string, unknown>[]).map((feature: Record<string, unknown>) => ({
                ...feature,
                title: typeof feature.title === 'string' ? {
                    en: feature.title,
                    he: translateToHebrew('feature', feature.title as string)
                } as BilingualText : feature.title,
                description: typeof feature.description === 'string' ? {
                    en: feature.description,
                    he: translateToHebrew('featureDesc', feature.description as string)
                } as BilingualText : feature.description
            }));
        } else if (key === 'tiers' && Array.isArray(value)) {
            converted[key] = (value as Record<string, unknown>[]).map((tier: Record<string, unknown>) => ({
                ...tier,
                name: typeof tier.name === 'string' ? {
                    en: tier.name,
                    he: translateToHebrew('tier', tier.name as string)
                } as BilingualText : tier.name,
                description: typeof tier.description === 'string' ? {
                    en: tier.description,
                    he: translateToHebrew('tierDesc', tier.description as string)
                } as BilingualText : tier.description,
                buttonText: typeof tier.buttonText === 'string' ? {
                    en: tier.buttonText,
                    he: translateToHebrew('button', tier.buttonText as string)
                } as BilingualText : tier.buttonText,
                features: Array.isArray(tier.features) ? (tier.features as Record<string, unknown>[]).map((f: Record<string, unknown>) => ({
                    ...f,
                    text: typeof f.text === 'string' ? {
                        en: f.text,
                        he: translateToHebrew('feature', f.text as string)
                    } as BilingualText : f.text
                })) : tier.features
            }));
        } else if (key === 'testimonials' && Array.isArray(value)) {
            converted[key] = (value as Record<string, unknown>[]).map((t: Record<string, unknown>) => ({
                ...t,
                name: typeof t.name === 'string' ? {
                    en: t.name,
                    he: t.name
                } as BilingualText : t.name,
                role: typeof t.role === 'string' ? {
                    en: t.role,
                    he: translateToHebrew('role', t.role as string)
                } as BilingualText : t.role,
                company: typeof t.company === 'string' ? {
                    en: t.company,
                    he: t.company
                } as BilingualText : t.company,
                content: typeof t.content === 'string' ? {
                    en: t.content,
                    he: translateToHebrew('testimonial', t.content as string)
                } as BilingualText : t.content
            }));
        } else if (key === 'items' && Array.isArray(value)) {
            converted[key] = (value as Record<string, unknown>[]).map((item: Record<string, unknown>) => ({
                ...item,
                question: typeof item.question === 'string' ? {
                    en: item.question,
                    he: translateToHebrew('question', item.question as string)
                } as BilingualText : item.question,
                answer: typeof item.answer === 'string' ? {
                    en: item.answer,
                    he: translateToHebrew('answer', item.answer as string)
                } as BilingualText : item.answer
            }));
        } else if (key === 'stats' && Array.isArray(value)) {
            converted[key] = (value as Record<string, unknown>[]).map((stat: Record<string, unknown>) => ({
                ...stat,
                label: typeof stat.label === 'string' ? {
                    en: stat.label,
                    he: translateToHebrew('stat', stat.label as string)
                } as BilingualText : stat.label
            }));
        } else if (key === 'columns' && Array.isArray(value)) {
            converted[key] = (value as Record<string, unknown>[]).map((col: Record<string, unknown>) => ({
                ...col,
                title: typeof col.title === 'string' ? {
                    en: col.title,
                    he: translateToHebrew('column', col.title as string)
                } as BilingualText : col.title,
                links: Array.isArray(col.links) ? (col.links as Record<string, unknown>[]).map((l: Record<string, unknown>) => ({
                    ...l,
                    label: typeof l.label === 'string' ? {
                        en: l.label,
                        he: translateToHebrew('link', l.label as string)
                    } as BilingualText : l.label
                })) : col.links
            }));
        } else if (key === 'socialLinks' && Array.isArray(value)) {
            converted[key] = value;
        } else {
            converted[key] = value;
        }
    }
    
    return converted;
}

function convertRootToBilingual(root: { props: Record<string, unknown> }): { props: Record<string, unknown> } {
    const props = root.props || {};
    return {
        props: {
            ...props,
            title: typeof props.title === 'string' ? {
                en: props.title,
                he: translateToHebrew('pageTitle', props.title as string)
            } as BilingualText : props.title,
            description: typeof props.description === 'string' ? {
                en: props.description,
                he: translateToHebrew('pageDesc', props.description as string)
            } as BilingualText : props.description,
            dir: {
                en: 'ltr',
                he: 'rtl'
            } as BilingualField<string>,
            lang: {
                en: 'en',
                he: 'he'
            } as BilingualField<string>
        }
    };
}

function translateToHebrew(context: string, text: string): string {
    const translations: Record<string, Record<string, string>> = {
        hero: {
            'Build Better Products Faster': 'בנה מוצרים טובים יותר, מהר יותר',
            'The all-in-one platform that helps teams ship 10x faster. No complex setup, just results.': 'הפלטפורמה המלאה שעוזרת לצוותים לשלוח פי 10 מהר יותר. אין הגדרות מורכבות, רק תוצאות.',
            'Start Free Trial': 'התחל חינם',
            'Watch Demo': 'צפה בהדגמה'
        },
        stat: {
            'Active Users': 'משתמשים פעילים',
            'Uptime': 'זמן פעילות',
            'Countries': 'מדינות',
            'Rating': 'דירוג',
            'Satisfied Trainees': 'מתאמנים מרוצים',
            'Years of Experience': 'שנות ניסיון',
            'Success Rate': 'שיעור הצלחה',
            'Hours of Coaching': 'שעות ליווי'
        },
        feature: {
            'Lightning Fast': 'מהיר כברק',
            'Enterprise Security': 'אבטחה ברמה בנקאית',
            'Advanced Analytics': 'אנליטיקה מתקדמת',
            'Seamless Integration': 'אינטגרציה חלקה',
            '24/7 Support': 'תמיכה 24/7',
            'Real-time Collaboration': 'שיתוף פעולה בזמן אמת',
            'Custom Workflows': 'זרימות עבודה מותאמות',
            'Smart Automation': 'אוטומציה חכמה'
        },
        featureDesc: {
            'Built for speed with cutting-edge technology': 'נבנה למהירות עם טכנולוגיה חדישה',
            'Bank-grade encryption and SOC 2 compliance': 'הצפנה ברמה בנקאית ותאימות SOC 2',
            'Deep insights to make data-driven decisions': 'תובנות עמוקות לקבלת החלטות מבוססות נתונים',
            'Connect with 200+ tools you already use': 'התחבר ליותר מ-200 כלים שאתה כבר משתמש',
            'Round-the-clock expert support': 'תמיכת מומחים 24/7',
            'Work together in real-time from anywhere': 'עבדו יחד בזמן אמת מכל מקום'
        },
        button: {
            'Get Started': 'התחל עכשיו',
            'Learn More': 'למד עוד',
            'Sign Up': 'הירשם',
            'Subscribe': 'הירשם'
        },
        pageTitle: {
            'SaaS Landing Page': 'דף נחיתה לסטארטאפ',
            'Your Page Title': 'כותרת הדף שלך'
        },
        link: {
            'Features': 'תכונות',
            'Pricing': 'מחירים',
            'Testimonials': 'המלצות',
            'FAQ': 'שאלות נפוצות',
            'About': 'אודות',
            'Contact': 'צור קשר',
            'Blog': 'בלוג',
            'Services': 'שירותים'
        }
    };

    if (translations[context] && translations[context][text]) {
        return translations[context][text];
    }
    return text;
}
