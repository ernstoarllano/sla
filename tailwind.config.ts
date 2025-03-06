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
        sans: ["var(--font-lato)"],
        serif: ["var(--font-playfair)", "serif"],
      },
      colors: {
        // Solace brand colors - Green
        solace: {
          50: "#f0f7f5",
          100: "#d9e9e5",
          200: "#b4d3cc",
          300: "#8ebdb3",
          400: "#68a799",
          500: "#437f72",
          600: "#265b4e", // Primary green
          700: "#1d4a3f",
          800: "#14382f",
          900: "#0b2720",
        },
        // Solace gold colors
        gold: {
          50: "#fdf8ed",
          100: "#faefd5",
          200: "#f5deac",
          300: "#e9c57c",
          400: "#d7a13b", // Primary gold
          500: "#c68d2c",
          600: "#a67324",
          700: "#855721",
          800: "#6b4620",
          900: "#583b1f",
        },
        // Semantic colors
        primary: {
          DEFAULT: "#265b4e", // Solace green
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#d7a13b", // Solace gold
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "#8ebdb3", // Lighter green
          foreground: "#14382f",
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "#265b4e",
      },
      borderColor: {
        solace: "#d4e2dd",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        solace: "0 4px 6px -4px #0000001a,0 10px 15px -3px #0000001a",
      },
      backgroundImage: {
        "gradient-pattern": `
          linear-gradient(var(--tw-gradient-stops)),
          url('https://cdn.prod.website-files.com/632a21d0ec93a082b11988a0/65d577f2611a585c10627879_Frame%2013102.svg'),
          linear-gradient(to bottom, #fff, #fff)
        `,
      },
      gradientColorStops: {
        "opal-light": "#e9f0ee33",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
