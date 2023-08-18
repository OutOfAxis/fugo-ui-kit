import "@testing-library/jest-dom/jest-globals";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

global.React = require("react");
global.matchMedia =
  global.matchMedia ||
  function () {
    return {
      addListener: jest.fn(),
      removeListener: jest.fn(),
    };
  };

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["translations"],
  defaultNS: "translations",
  interpolation: {
    escapeValue: false,
  },
  resources: { en: { translations: {} } },
});
