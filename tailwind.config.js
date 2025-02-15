/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        colors: {
            secondary700: "#18181B",
            secondary500: "#3A3A43",
            secondary400: "#575765",
            secondary200: "#79798E",
            primary300: "#9898D9",
            primary600: "#5C5C9A",
        },
        extend: {
            animation: {
                match: "match 0.5s ease-in-out forwards",
            },
            keyframes: {
                match: {
                    "0%": { transform: "scale(1)" },
                    "25%": { transform: "scale(0.9)" },
                    "50%": { transform: "scale(1.05)" },
                    "100%": { transform: "scale(0)" },
                },
            },
        },
    },
    plugins: [],
};
