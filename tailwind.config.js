const withMT = require("@material-tailwind/react/utils/withMT");

/** @type {import('tailwindcss').Config} */
module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        primary: "#f1ff00",
        secondary: "#191919",
        // lightBackground: '#f5f5f5', // Light mode background color
        // darkBackground: '#191919', // Dark mode background color
        // lightText: '#000000', // Light mode text color
        // darkText: '#ffffff', // Dark mode text color
        // #252525
      },
      fontFamily: {
        jost: ["Jost", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities(
        {
          ".drop-shadow-4xl": {
            textShadow: "5px 5px 8px rgba(0, 0, 0, 0.7)",
          },
        },
        ["responsive", "hover"]
      );
    },
  ],
});
