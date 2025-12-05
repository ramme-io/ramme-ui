/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        border: 'rgb(var(--app-border-color) / <alpha-value>)',
        input: 'rgb(var(--app-input-border-color) / <alpha-value>)',
        ring: 'rgb(var(--app-input-focus-ring-color) / <alpha-value>)',
        background: 'rgb(var(--app-bg-color) / <alpha-value>)',
        foreground: 'rgb(var(--app-text-color) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--app-primary-color) / <alpha-value>)',
          foreground: 'rgb(var(--app-primary-foreground-color) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'rgb(var(--app-secondary-color) / <alpha-value>)',
          foreground: 'rgb(var(--app-secondary-foreground-color) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'rgb(var(--app-danger-color) / <alpha-value>)',
          foreground: 'rgb(var(--app-danger-foreground-color) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'rgb(var(--app-card-bg-color) / <alpha-value>)',
          foreground: 'rgb(var(--app-text-color) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--app-accent-color) / <alpha-value>)',
          foreground: 'rgb(var(--app-accent-foreground-color) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'rgb(var(--app-card-bg-color) / <alpha-value>)',
          foreground: 'rgb(var(--app-text-color) / <alpha-value>)',
        },
        // ADDED: Notification Colors
        info: {
          DEFAULT: 'rgb(var(--app-info-color) / <alpha-value>)',
          foreground: 'rgb(var(--app-info-foreground-color) / <alpha-value>)',
        },
        success: {
          DEFAULT: 'rgb(var(--app-success-color) / <alpha-value>)',
          foreground: 'rgb(var(--app-success-foreground-color) / <alpha-value>)',
        },
        warning: {
          DEFAULT: 'rgb(var(--app-warning-color) / <alpha-value>)',
          foreground: 'rgb(var(--app-warning-foreground-color) / <alpha-value>)',
        },
        error: {
          DEFAULT: 'rgb(var(--app-danger-color) / <alpha-value>)', // Re-using danger for error
          foreground: 'rgb(var(--app-danger-foreground-color) / <alpha-value>)',
        },
        // ADDED: Chart Colors
        chart: {
          1: 'rgb(var(--app-chart-1) / <alpha-value>)',
          2: 'rgb(var(--app-chart-2) / <alpha-value>)',
          3: 'rgb(var(--app-chart-3) / <alpha-value>)',
          4: 'rgb(var(--app-chart-4) / <alpha-value>)',
          5: 'rgb(var(--app-chart-5) / <alpha-value>)',
        },
      },
      borderRadius: {
        lg: `var(--app-border-radius-lg)`,
        md: `var(--app-border-radius-md)`,
        sm: `var(--app-border-radius-sm)`,
      },
      fontFamily: {
        sans: ['var(--app-font-sans)'],
        serif: ['var(--app-font-serif)'],
      },
      fontSize: {
        xs: ['calc(var(--app-font-size-base) * 0.75)', { lineHeight: '1rem' }],
        sm: ['calc(var(--app-font-size-base) * 0.875)', { lineHeight: '1.25rem' }],
        base: ['var(--app-font-size-base)', { lineHeight: '1.5rem' }],
        lg: ['calc(var(--app-font-size-base) * 1.125)', { lineHeight: '1.75rem' }],
        xl: ['calc(var(--app-font-size-base) * 1.25)', { lineHeight: '1.75rem' }],
      },
    },
  },
  plugins: [],
};