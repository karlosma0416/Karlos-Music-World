export const locales = ["en", "zh", "zh-cn"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeSettings = {
  zh: { lang: "zh-Hant", label: "繁中", menuLabel: "繁體中文", ogLocale: "zh_TW" },
  en: { lang: "en", label: "EN", menuLabel: "EN", ogLocale: "en_US" },
  "zh-cn": { lang: "zh-Hans", label: "简中", menuLabel: "简体中文", ogLocale: "zh_CN" },
} as const;

export function isLocale(value: string): value is Locale {
  return locales.some((locale) => locale === value);
}

// Replaces only the locale, retaining future paths such as /zh/music.
export function localizedPath(pathname: string, locale: Locale) {
  const segments = pathname.split("/");
  if (isLocale(segments[1] ?? "")) segments[1] = locale;
  else segments.splice(1, 0, locale);
  return segments.join("/");
}