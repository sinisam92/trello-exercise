/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        draw: "draw 5s linear forwards",
      },
      keyframes: {
        draw: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
      },
      colors: {
        primary: "var(--primary)",
        secundary: "var(--secundary)",
        primaryTextColor: "var(--primary-text-color)",
        secundaryTextColor: "var(--secundary-text-color)",
        primaryHover: "#38687C",
        danger: "#B52F2F",
        success: "#087506",
        disabled: "#8F908E",
        white: "#FFFFFF",
        primaryDark: "#323132",
        myBlue: "#1f8ef1",
        myOrange: "#ff8c00",
        myPurple: "#8a2be2",
      },
    },
  },
  plugins: [],
};
