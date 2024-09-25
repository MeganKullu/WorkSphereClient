import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: "500px",
        md: "800px",
        lg: "1200px",
        xl: "1536px",
      },
      scrollbar: {
        hide: {
          "::-webkit-scrollbar": { display: "none" },
          "-ms-overflow-style": "none", 
          "scrollbar-width": "none", 
        },
      },

      colors: {
        brand: {
          accent: "#5AD769",
          main: "#324BC3",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#0C0F19",
        },
        background: {
          primary: "#0C0F19",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        mono: [...defaultTheme.fontFamily.mono],
        poppins: ["var(--font-poppins)"],
      },
    },
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, any>, options?: { variants?: string[], respectPrefix?: boolean, respectImportant?: boolean }) => void }) {
      addUtilities({
        '.no-scrollbar': {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none', /* Chrome, Safari, and Opera */
          },
        },
      });
    },

  ],
};
export default config;
