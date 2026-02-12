/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        forest: '#1a4d2e',
        forestLight: '#2d7a4a',
        gold: '#d4a853',
        goldLight: '#e6c47a',
        sunset: '#e07b39',
        cream: '#faf8f5',
        bark: '#2d1810',
        slate: '#374151',
      },
    },
  },
  plugins: [],
};
