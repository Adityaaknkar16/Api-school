/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        themeBg: 'var(--bg-primary)',
        themeCard: 'var(--bg-secondary)',
        themeText: 'var(--text-primary)',
        themeMuted: 'var(--text-secondary)',
        themeBorder: 'var(--border-glass)',
        themeConsole: 'var(--bg-console)',
      },
    },
  },
  plugins: [],
}
