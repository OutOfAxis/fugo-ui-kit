import React, { Suspense } from "react";
import { Route, Routes, MemoryRouter } from "react-router-dom";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import "../src/styles.css";

export const parameters = {
  viewMode: "docs",
  actions: { argTypesRegex: "^on[A-Z].*" },
  docs: { source: { state: "open" } },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    debug: false,
    ns: ["translations"],
    defaultNS: "translations",
    keySeparator: ".",
    resources: {
      en: {}
    },
    interpolation: {
      escapeValue: false,
      formatSeparator: ",",
    },
    load: "languageOnly",
    react: {
      useSuspense: false,
      wait: true,
    }
  });

export const decorators = [
  (Story) => (
    <Suspense fallback={<div>Loading...</div>}>
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Story />} />
        </Routes>
      </MemoryRouter>
    </Suspense>
  ),
];
