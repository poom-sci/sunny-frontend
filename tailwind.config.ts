import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  daisyui: {
    themes: [
      {
        mytheme: {
          ...require("daisyui/src/theming/themes")["cupcake"]
        }
      },
      "cupcake",
      "night"
    ]
  },
  theme: {
    fontFamily: {
      IBMPlexSanThai: ["var(--font-ibm-plex-sans-thai)"],
      serif: ["Merriweather", "serif"],
      Londrina: ["var(--font-londrina)"]
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },

      colors: {
        core: {
          lightBlue: "#81C2CC",
          coral: "#FF9A7E",
          lightGreen: "#ADD597",
          orange: "#FFA755",
          grey: "#979797"
        },
        green: {
          100: "#ADD597",
          200: "#DDE7A6",
          300: "#C5DEA1",
          400: "#D2E4A6",
          500: "#B7D799",
          600: "#AAD399",
          700: "#94CBA4",
          800: "#88C6A8",
          900: "#9FCE9F"
        },
        pink: {
          100: "#E587AF",
          200: "#EC8FA2",
          300: "#BC7DA9",
          400: "#B17BAB",
          500: "#CD81AA"
        },
        yellow: {
          100: "#FFD251",
          200: "#F9E27A"
        },
        purple: {
          100: "#8E92BD",
          200: "#756887",
          300: "#91A6C8",
          400: "#8E92BD",
          500: "#91B0CF",
          600: "#92BDD6"
        },
        red: {
          100: "#F3B194",
          200: "#F2AC8E",
          300: "#F9D9AC",
          400: "#F0A589",
          500: "#F7C6A8",
          600: "#F4B697"
        },
        blue: {
          100: "#81C2CC",
          200: "#79C2CF",
          300: "#86C2CA",
          400: "#99C8C1",
          500: "#A3CBBE",
          600: "#8FC4C7",
          700: "#3C768C"
        },
        misc: {
          100: "#87C48B",
          200: "#3C768C",
          300: "#E587AF",
          400: "#FF9A7E",
          500: "#81C2CC",
          600: "#FFA755",
          700: "#F9E27A",
          800: "#238F35",
          900: "#CD81AA"
        }
      }
    }
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")]
};
export default config;
