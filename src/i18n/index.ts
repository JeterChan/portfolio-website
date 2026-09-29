import en from './en';

export const locales = ['en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

type Key = keyof typeof en;
const dictionaries: Record<Locale, Record<Key, string>> = { en };

export function useTranslations(lang: Locale = defaultLocale) {
  return (key: Key) => dictionaries[lang][key] ?? dictionaries[defaultLocale][key];
}

/** Prefix a path for a locale. The default locale has no prefix. */
export function localizePath(path: string, lang: Locale = defaultLocale) {
  return lang === defaultLocale ? path : `/${lang}${path}`;
}
