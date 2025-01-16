import { defineConfig, presetUno, presetIcons } from "unocss";

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons({
      collections: {
        heroicons: () => import("@iconify-json/heroicons/icons.json").then((i) => i.default),
      },
    }),
  ],
  theme: {
    colors: {
      primary: {
        50: "#f0f9f1",
        100: "#dcf0dd",
        200: "#bce3bf",
        300: "#94ce98",
        400: "#6cb471",
        500: "#4a9a4f",
        600: "#3c7e41",
        700: "#326436",
        800: "#284e2c",
        900: "#1f3d23",
      },
    },
    fontFamily: {
      "recia-light": "Recia-Light, serif",
      "recia-regular": "Recia-Regular, serif",
      "recia-medium": "Recia-Medium, serif",
      "recia-semibold": "Recia-Semibold, serif",
      "recia-bold": "Recia-Bold, serif",
    },
  },
  shortcuts: {
    btn: "px-4 py-2 rounded-full font-recia-medium transition-colors duration-200",
    "btn-primary": "bg-primary-500 hover:bg-primary-600 text-white",
    "btn-outline": "border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900",

    "btn-soft":
      "px-4 py-2 rounded-full font-recia-medium bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors duration-200",
    "btn-gradient":
      "px-4 py-2 rounded-lg font-recia-medium bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white shadow-sm transition-all duration-200 hover:shadow-md",
    "btn-glow":
      "px-4 py-2 rounded-lg font-recia-medium bg-primary-500 text-white shadow-[0_0_15px_rgba(249,115,22,0.5)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] transition-all duration-200",

    "input-modern":
      "px-4 py-3 rounded-xl border-2 bg-white/5 dark:bg-gray-800/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all duration-200",

    "card-basic": "bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6",
    "card-hover": "bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow duration-200",
    "card-gradient":
      "bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-sm p-6",

    glass: "backdrop-blur-md bg-white/10 dark:bg-gray-900/30",
    "border-gradient": "border-2 border-transparent bg-gradient-to-r from-primary-500 to-primary-600 bg-clip-border",
  },
});
