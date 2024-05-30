import type { Config } from "tailwindcss"

const config = {
  
   
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    fontSize: {
      sm: '0.750rem',
      base: '1rem',
      xl: '1.333rem',
      '2xl': '1.777rem',
      '3xl': '2.369rem',
      '4xl': '3.158rem',
      '5xl': '4.210rem',
    },
    fontFamily: {
      heading: 'Alkatra',
      body: 'Carme',
    },
    fontWeight: {
      normal: '400',
      bold: '700',
    },   
    colors: {
      'text': '#f7f9f5',
      'background': '#070a05',
      'primary': '#79b842',
      'secondary': '#406a1b',
      'accent': '#559a18',
     },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),
  function({ addUtilities } : any) {
    const newUtilities = {
      '.scrollbar-hide': {
        'scrollbar-width': 'none', /* Firefox */
        '-ms-overflow-style': 'none', /* Internet Explorer 10+ */
      }
    }
    addUtilities(newUtilities)
  }
  ],
} satisfies Config

export default config