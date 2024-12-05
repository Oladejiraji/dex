import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "geist-thin": ["geist-thin", "sans-serif"],
        "geist-bold": ["geist-bold", "sans-serif"],
        "geist-light": ["geist-light", "sans-serif"],
        "geist-medium": ["geist-medium", "sans-serif"],
        "geist-semibold": ["geist-semibold", "sans-serif"],
        "geist-regular": ["geist-regular", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-custom":
          "linear-gradient(180deg, rgba(13, 14, 15, 0.5) 37.5%, #0D0E0F 168.06%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        primary: {
          "100": "#040506",
          "200": "#18191A",
          "300": "#0D0E0F",
          "400": "#060708",
          "500": "#1E1E1E",
          "600": "#101112",
          "700": "#08090A",
          "800": "#F9F9F9",
        },
        grey: {
          "100": "#C3C3C3",
          "200": "#272727",
          "300": "#7D7D7D",
          "400": "#D7D7D7",
          "500": "#A5A5A5",
        },
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
