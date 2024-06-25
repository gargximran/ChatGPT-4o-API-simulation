/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: process.env.NODE_ENV === "production",
  content: [
    // "./src/pages/*/.{js,ts,jsx,tsx,mdx}",
    // "./src/components/*/.{js,ts,jsx,tsx,mdx}",
    // "./src/app/*/.{js,ts,jsx,tsx,mdx}",
    // "./layouts/*/.{js,ts,jsx,tsx}",

    './pages/*/.{js,ts,jsx,tsx,mdx}',
    './components/*/.{js,ts,jsx,tsx,mdx}',
    './app/*/.{js,ts,jsx,tsx,mdx}',
    './src/*/.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ["Istok Web", "sans-serif"],
    },
    listStyleType: {
      none: 'none',
      disc: 'disc',
      decimal: 'decimal',
      square: 'square',
      roman: 'upper-roman',
    }
  },
  plugins: [],
};