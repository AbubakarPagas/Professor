import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.5rem', md: '2rem', lg: '3rem' },
      screens: { '2xl': '1300px' },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Brand palette
        navy: {
          DEFAULT: '#0D1829',
          50:  '#EEF1F7',
          100: '#D5DCE9',
          200: '#A9B7D2',
          300: '#7D92BB',
          400: '#506DA4',
          500: '#2C4B85',
          600: '#1A2F5A',
          700: '#101C32',
          800: '#0D1829',
          900: '#070E1A',
        },
        gold: {
          DEFAULT: '#C5A15A',
          50:  '#FBF6EC',
          100: '#F4E9CC',
          200: '#E9D39A',
          300: '#DBBE6B',
          400: '#C5A15A',
          500: '#A98443',
          600: '#8A6931',
          700: '#6C5024',
          800: '#4D3818',
          900: '#2E210E',
        },
        ivory: {
          DEFAULT: '#F5F2EB',
          50:  '#FDFCFA',
          100: '#F5F2EB',
          200: '#EAE5D9',
          300: '#DDD6C6',
          400: '#CFC5B0',
          500: '#C0B399',
        },
        charcoal: {
          DEFAULT: '#242B36',
          light: '#4A5568',
          muted: '#718096',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'ui-serif', 'Georgia', 'serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem,5.5vw,4.5rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.25rem,4.5vw,3.25rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.625rem,3vw,2.375rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
        'display-sm': ['clamp(1.25rem,2.5vw,1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        'section':    '6rem',
        'section-sm': '3.5rem',
      },
      boxShadow: {
        'card':       '0 1px 2px rgba(13,24,41,0.04), 0 4px 16px rgba(13,24,41,0.06)',
        'card-hover': '0 8px 32px rgba(13,24,41,0.12), 0 2px 6px rgba(13,24,41,0.06)',
        'card-gold':  '0 8px 32px rgba(197,161,90,0.18), 0 2px 6px rgba(197,161,90,0.1)',
        'nav':        '0 1px 0 rgba(13,24,41,0.12)',
        'modal':      '0 24px 64px rgba(13,24,41,0.18)',
        'gold':       '0 4px 24px rgba(197,161,90,0.30)',
        'gold-lg':    '0 12px 40px rgba(197,161,90,0.25)',
        'inner-gold': 'inset 0 1px 0 rgba(255,255,255,0.1)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'shimmer': {
          from: { backgroundPosition: '-200% center' },
          to: { backgroundPosition: '200% center' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-up': 'fade-up 0.6s ease-out forwards',
        'fade-in': 'fade-in 0.5s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
