
export default {
  darkMode: 'class', // use .dark
  content: [
    './index.html',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Slate theme colors
        background: 'var(--slate-background)',
        foreground: 'var(--slate-foreground)',
        primary: 'var(--slate-primary)',
        'primary-foreground': 'var(--slate-primary-foreground)',
        secondary: 'var(--slate-secondary)',
        'secondary-foreground': 'var(--slate-secondary-foreground)',
        muted: 'var(--slate-muted)',
        'muted-foreground': 'var(--slate-muted-foreground)',
        accent: 'var(--slate-accent)',
        'accent-foreground': 'var(--slate-accent-foreground)',
        destructive: 'var(--slate-destructive)',
        border: 'var(--slate-border)',
        ring: 'var(--slate-ring)',
        card: 'var(--slate-card)',
        'card-foreground': 'var(--slate-card-foreground)',
        popover: 'var(--slate-popover)',
        'popover-foreground': 'var(--slate-popover-foreground)',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
    },
  },
  plugins: [],
};

