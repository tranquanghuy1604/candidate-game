import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx,css}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes : {
        "zoom-in": {
          "0%": {opacity: '0',transform: 'scale(-0.5)'},
          '100%': {opacity: '1',transform: 'scale(1)'}
        },
        'zoom-out': {
          '0%': {
            opacity: '1',
            transform: 'scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'scale(0.5)',
          },
        },
        pulse: {
          '0%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
          '100%': {
            opacity: '1',
          },
        }
      },
      animation: {
        "zoom-in": 'zoom-in 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'zoom-out': 'zoom-out 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        'pulse' : 'pulse 1.5s infinite'
      }
    },
  },
  plugins: [],
};
export default config;
