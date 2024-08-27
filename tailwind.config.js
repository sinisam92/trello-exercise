/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#264653",
        primaryHover: "#38687C",
        danger: "#B52F2F",
        success: "#087506",
        disabled: "#8F908E",
        white: "#FFFFFF",
      },
    },
  },
  plugins: [],
}

