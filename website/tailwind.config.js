/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        // Content type accent colors
        docs: {
          DEFAULT: '#3b82f6', // Blue
          light: '#dbeafe',
          dark: '#1e40af',
        },
        examples: {
          DEFAULT: '#10b981', // Green
          light: '#d1fae5',
          dark: '#047857',
        },
        guides: {
          DEFAULT: '#8b5cf6', // Purple
          light: '#ede9fe',
          dark: '#5b21b6',
        },
        // Difficulty level colors
        difficulty: {
          beginner: {
            DEFAULT: '#10b981', // Green
            light: '#d1fae5',
            dark: '#047857',
          },
          intermediate: {
            DEFAULT: '#f59e0b', // Amber
            light: '#fef3c7',
            dark: '#b45309',
          },
          advanced: {
            DEFAULT: '#ef4444', // Red
            light: '#fee2e2',
            dark: '#b91c1c',
          },
        },
      },
      lineHeight: {
        'relaxed': '1.75',
        'loose': '2',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
  darkMode: 'class',
}

