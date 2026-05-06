/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
// If the import above causes an error, use: const daisyui = require("daisyui");

export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [daisyui],
    daisyui: {
        themes: [
            "light",
            {
                black: {
                    // Standard way to spread the black theme without deep-linking into src
                    "color-scheme": "dark",
                    "primary": "rgb(29, 155, 240)",
                    "secondary": "rgb(24, 24, 24)",
                    "accent": "rgb(29, 155, 240)",
                    "neutral": "rgb(24, 24, 24)",
                    "base-100": "rgb(0, 0, 0)",
                    "info": "rgb(29, 155, 240)",
                    "success": "rgb(0, 255, 127)",
                    "warning": "rgb(255, 215, 0)",
                    "error": "rgb(255, 0, 0)",
                },
            },
        ],
    },
};