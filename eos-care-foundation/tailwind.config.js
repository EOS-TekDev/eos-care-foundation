const withOpacityValue = (variable) => {
  return ({ opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgb(var(${variable}) / ${opacityValue})`;
    }
    return `rgb(var(${variable}))`;
  };
};

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"DM Sans"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        body: ['"DM Sans"', '"Source Sans 3"', 'system-ui', 'sans-serif'],
        accent: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        // Warm Humanist palette
        warm: {
          50: '#FFF8F0',
          100: '#F5EBE0',
          200: '#EDE0D4',
          300: '#DDB892',
          400: '#D4A373',
          paper: '#FAFAF8',
          cream: '#FAF7F2',
        },
        // Purpose colors
        terracotta: {
          DEFAULT: '#D4A373',
          dark: '#BC8A5F',
          light: '#E6C9A8',
        },
        forest: {
          DEFAULT: '#3D5A47',
          dark: '#2D4235',
          light: '#5A7D66',
        },
        ocean: {
          DEFAULT: '#457B9D',
          dark: '#356789',
          light: '#6A9AB8',
        },
        sunset: {
          DEFAULT: '#E76F51',
          dark: '#D4593D',
          light: '#F09B85',
        },
        ink: '#1A1A2E',
        // Meta-inspired gradient stops
        gradient: {
          rose: '#FCF0F5',
          blush: '#F8E8F0',
          lavender: '#F0E6F8',
          periwinkle: '#E8E4FA',
          iris: '#E4E4FC',
          sky: '#E4ECFC',
          azure: '#E0F4FC',
          cyan: '#E0F8F8',
          mint: '#E4FAF0',
          seafoam: '#E8FCE8',
        },
        // Text colors (CSS variable driven for light/dark support)
        text: {
          primary: withOpacityValue('--text-primary'),
          secondary: withOpacityValue('--text-secondary'),
          tertiary: withOpacityValue('--text-tertiary'),
          muted: withOpacityValue('--text-muted'),
          disabled: withOpacityValue('--text-disabled'),
        },
        // Primary (Meta blue)
        primary: {
          DEFAULT: '#0866FF',
          hover: '#0055DB',
          light: '#E7F0FF',
        },
        // CTA (warm orange)
        cta: {
          DEFAULT: '#FF6B35',
          hover: '#E55A28',
          light: '#FFF0EB',
        },
        // Status colors
        status: {
          urgent: '#FF3B30',
          warning: '#FF9500',
          success: '#34C759',
          info: '#007AFF',
        },
      },
      backgroundImage: {
        'eos-gradient': 'linear-gradient(135deg, #FCF0F5 0%, #F8E8F0 10%, #F0E6F8 20%, #E8E4FA 30%, #E4E4FC 40%, #E4ECFC 50%, #E0F4FC 60%, #E0F8F8 70%, #E4FAF0 85%, #E8FCE8 100%)',
        'eos-gradient-simple': 'linear-gradient(135deg, #FCF0F5 0%, #E4E4FC 50%, #E8FCE8 100%)',
      },
      backdropBlur: {
        glass: '12px',
      },
      boxShadow: {
        subtle: '0 1px 2px rgba(0, 0, 0, 0.04)',
        soft: '0 2px 8px -2px rgba(26, 26, 46, 0.06)',
        medium: '0 4px 16px rgba(0, 0, 0, 0.08)',
        strong: '0 8px 32px rgba(0, 0, 0, 0.12)',
        lifted: '0 12px 32px -8px rgba(26, 26, 46, 0.12)',
        'inner-glow': 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-in': 'slideIn 0.3s ease-out forwards',
        'slide-in-right': 'slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
        'scale-in': 'scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'progress-fill': 'progressFill 1s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        progressFill: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
      },
      transitionTimingFunction: {
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'bounce': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
