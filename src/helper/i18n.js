import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import enTranslation from "../helper/en/translation.json";
import laoTranslation from "../helper/lao/translation.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  lao: {
    translation: laoTranslation,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources, 
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
