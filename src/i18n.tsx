import React from "react";
import { createRoot } from 'react-dom/client';
import i18n from "i18next";
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { useTranslation, initReactI18next } from "react-i18next";

i18n
  .use(Backend) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
  });

export default i18n;