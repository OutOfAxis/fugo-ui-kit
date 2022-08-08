const fugoPreset = require("@outofaxis/tailwind-fugo-preset");

/** @type {import('tailwindcss').Config} */
module.exports = {
  experimental: {
    optimizeUniversalDefaults: true,
  },
  content: ["./src/**/*.js", "./src/**/*.tsx", "./src/**/*.ts"],
  presets: [fugoPreset],
};
