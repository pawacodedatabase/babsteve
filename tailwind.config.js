/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        marquee: 'marquee 10s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': {
            transform: 'translateX(100%)', // Start off-screen on the right
          },
          '100%': {
            transform: 'translateX(-100%)', // End off-screen on the left
          },
        },
      },
    },
  },
  plugins: [],
}
