/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Blue Gradient
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },

        // Secondary Purple Gradient
        secondary: {
          50: '#faf5ff',
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
          600: '#9333ea',
          700: '#7c3aed',
          800: '#6b21a8',
          900: '#581c87',
          950: '#3b0764',
        },

        // Accent colors
        accent: {
          indigo: {
            50: '#eef2ff',
            100: '#e0e7ff',
            200: '#c7d2fe',
            300: '#a5b4fc',
            400: '#818cf8',
            500: '#6366f1',
            600: '#4f46e5',
            700: '#4338ca',
            800: '#3730a3',
            900: '#312e81',
            950: '#1e1b4b',
          },
          pink: {
            50: '#fdf2f8',
            100: '#fce7f3',
            200: '#fbcfe8',
            300: '#f9a8d4',
            400: '#f472b6',
            500: '#ec4899',
            600: '#db2777',
            700: '#be185d',
            800: '#9d174d',
            900: '#831843',
            950: '#500724',
          }
        },

        // Status colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },

        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03',
        },

        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },

        // Neutral colors with better contrast
        neutral: {
          0: '#ffffff',
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },

        // Dark mode colors
        dark: {
          bg: '#0a0a0a',
          surface: '#171717',
          card: '#262626',
          border: '#404040',
          text: '#fafafa',
          'text-secondary': '#a3a3a3',
        },

        // Light mode colors
        light: {
          bg: '#ffffff',
          surface: '#f5f5f5',
          card: '#ffffff',
          border: '#e5e5e5',
          text: '#171717',
          'text-secondary': '#525252',
        }
      },

      fontFamily: {
        // Hebrew font stacks - RTL first for Hebrew
        hebrew: [
          'Assistant', // Modern Hebrew font
          'Rubik', // Good for Hebrew and English
          'Segoe UI', // Windows Hebrew support
          'Arial Hebrew', // Classic Hebrew
          'Tahoma', // Good Hebrew support
          'sans-serif',
        ],

        // Mixed content (Hebrew and English)
        mixed: [
          'Inter', // Excellent for English
          'Assistant', // For Hebrew text
          'Rubik', // Good balance for both
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],

        // Sans serif
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'Helvetica Neue',
          'Arial',
          'Noto Sans',
          'sans-serif',
        ],

        // Serif
        serif: [
          'Georgia',
          'Cambria',
          'Times New Roman',
          'Times',
          'serif',
        ],

        // Monospace
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Consolas',
          'Monaco',
          'monospace',
        ],

        // Display fonts
        display: [
          'Cal Sans',
          'Inter',
          'system-ui',
          'sans-serif',
        ],
      },

      fontSize: {
        // Responsive typography scale
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],

        // Display sizes
        'display-sm': ['1.875rem', { lineHeight: '2.375rem' }],
        'display-md': ['2.25rem', { lineHeight: '2.75rem' }],
        'display-lg': ['3rem', { lineHeight: '3.75rem' }],
        'display-xl': ['3.75rem', { lineHeight: '4.5rem' }],
        'display-2xl': ['4.5rem', { lineHeight: '5.5rem' }],
      },

      spacing: {
        // Extended spacing scale
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',
        '256': '64rem',
        '320': '80rem',
        '384': '96rem',

        // Custom component spacing
        'nav-height': '4rem',
        'sidebar-width': '16rem',
        'container-max': '80rem',
      },

      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },

      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'hard': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'glow': '0 0 20px rgba(59, 130, 246, 0.15)',
        'glow-lg': '0 0 40px rgba(59, 130, 246, 0.2)',
        'inner-soft': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },

      animation: {
        // Entry animations
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'fade-in-down': 'fadeInDown 0.6s ease-out',
        'fade-in-left': 'fadeInLeft 0.6s ease-out',
        'fade-in-right': 'fadeInRight 0.6s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'slide-in-up': 'slideUp 0.5s ease-out',
        'slide-in-down': 'slideDown 0.5s ease-out',

        // Loading and spinning
        'spin-slow': 'spin 2s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',

        // Hover effects
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',

        // Component animations
        'accordion-down': 'accordionDown 0.3s ease-out',
        'accordion-up': 'accordionUp 0.3s ease-out',
        'dropdown': 'dropdown 0.3s ease-out',

        // Gradient animations
        'gradient': 'gradient 3s ease infinite',
        'gradient-x': 'gradientX 15s ease infinite',
        'gradient-y': 'gradientY 15s ease infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' },
          '100%': { boxShadow: '0 0 30px rgba(59, 130, 246, 0.8)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        accordionDown: {
          '0%': { height: '0' },
          '100%': { height: 'var(--radix-accordion-content-height)' },
        },
        accordionUp: {
          '0%': { height: 'var(--radix-accordion-content-height)' },
          '100%': { height: '0' },
        },
        dropdown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        gradientX: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
        gradientY: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        },
      },

      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gradient-linear': 'linear-gradient(var(--tw-gradient-stops))',
      },

      backgroundSize: {
        '300%': '300%',
        '400%': '400%',
      },

      backdropBlur: {
        xs: '2px',
      },

      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
        'width': 'width',
      },

      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },

      screens: {
        '3xl': '1600px',
        '4xl': '1920px',
      },

      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '2/3': '2 / 3',
        '9/16': '9 / 16',
      },

      gridTemplateColumns: {
        '13': 'repeat(13, minmax(0, 1fr))',
        '14': 'repeat(14, minmax(0, 1fr))',
        '15': 'repeat(15, minmax(0, 1fr))',
        '16': 'repeat(16, minmax(0, 1fr))',
      },
    },
  },
  plugins: [
    // Component variants plugin
    function({ addUtilities }) {
      const newUtilities = {
        // Button variants
        '.btn-primary': {
          '@apply bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:from-primary-600 hover:to-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md': {},
        },
        '.btn-secondary': {
          '@apply bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-6 py-3 rounded-lg font-medium hover:from-secondary-600 hover:to-secondary-700 focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 transition-all duration-200 shadow-sm hover:shadow-md': {},
        },
        '.btn-ghost': {
          '@apply bg-transparent text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200': {},
        },
        '.btn-outline': {
          '@apply border-2 border-primary-500 text-primary-600 px-6 py-3 rounded-lg font-medium hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 transition-all duration-200': {},
        },

        // Card variants
        '.card': {
          '@apply bg-white dark:bg-dark-card border border-neutral-200 dark:border-dark-border rounded-xl shadow-soft hover:shadow-medium transition-shadow duration-300': {},
        },
        '.card-interactive': {
          '@apply card cursor-pointer hover:scale-105 hover:shadow-medium transform transition-all duration-200': {},
        },

        // Input variants
        '.input': {
          '@apply w-full px-4 py-2 border border-neutral-300 dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-neutral-900 dark:text-light-text placeholder-neutral-500 dark:placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200': {},
        },
        '.input-error': {
          '@apply border-error-500 focus:ring-error-500': {},
        },

        // Badge variants
        '.badge-primary': {
          '@apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200': {},
        },
        '.badge-success': {
          '@apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-success-100 text-success-800 dark:bg-success-900 dark:text-success-200': {},
        },
        '.badge-warning': {
          '@apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-warning-100 text-warning-800 dark:bg-warning-900 dark:text-warning-200': {},
        },
        '.badge-error': {
          '@apply inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-error-100 text-error-800 dark:bg-error-900 dark:text-error-200': {},
        },

        // RTL support utilities
        '.text-right-rtl': {
          '@apply text-right': {},
        },
        '.text-left-rtl': {
          '@apply text-left': {},
        },
        '.ml-rtl': {
          '@apply ml-0 mr-4': {},
        },
        '.mr-rtl': {
          '@apply mr-0 ml-4': {},
        },
        '.float-right-rtl': {
          '@apply float-right': {},
        },
        '.float-left-rtl': {
          '@apply float-left': {},
        },

        // Gradients
        '.gradient-primary': {
          'background': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        },
        '.gradient-secondary': {
          'background': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        },
        '.gradient-success': {
          'background': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        },
        '.gradient-warning': {
          'background': 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
        },
      };

      addUtilities(newUtilities);
    },

    // RTL text direction plugin
    function({ addUtilities }) {
      const rtlUtilities = {
        '[dir="rtl"] .ml-4': {
          'margin-left': '0',
          'margin-right': '1rem',
        },
        '[dir="rtl"] .mr-4': {
          'margin-right': '0',
          'margin-left': '1rem',
        },
        '[dir="rtl"] .pl-4': {
          'padding-left': '0',
          'padding-right': '1rem',
        },
        '[dir="rtl"] .pr-4': {
          'padding-right': '0',
          'padding-left': '1rem',
        },
        '[dir="rtl"] .text-left': {
          'text-align': 'right',
        },
        '[dir="rtl"] .text-right': {
          'text-align': 'left',
        },
        '[dir="rtl"] .float-left': {
          'float': 'right',
        },
        '[dir="rtl"] .float-right': {
          'float': 'left',
        },
      };

      addUtilities(rtlUtilities);
    },
  ],
};