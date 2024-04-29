import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'main-capsule': '#326ce5',
        'main-recapsule': '#F37021',
        'second-capsule': '#a35af6',
        'black-capsule': '#020713',
        'second-black-capsule': '#242e42',
        'main-capsule-low': '#1d52ff',
        'main-capsule-50': '#f0f8fa',
        'grey-capsule': '#fbfbfb',
        'kubernetes' : '#0086ff',
      },
    },
  },
  plugins: [],
};
export default config;
