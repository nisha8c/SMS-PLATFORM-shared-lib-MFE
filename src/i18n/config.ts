import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './locales/en.json';
import sv from './locales/sv.json';
import no from './locales/no.json';
import de from './locales/de.json';
import lv from './locales/lv.json';

export const resources = {
    en: { translation: en },
    sv: { translation: sv },
    no: { translation: no },
    de: { translation: de },
    lv: { translation: lv },
} as const;

export const languages = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
    { code: 'no', name: 'Norwegian', nativeName: 'Norsk' },
    { code: 'de', name: 'German', nativeName: 'Deutsch' },
    { code: 'lv', name: 'Latvian', nativeName: 'Latviešu' },
];

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;
