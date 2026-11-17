import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/data/site";
import { defaultLocale, isLocale, locales, localeSettings, type Locale } from "./config";
import { getDictionary } from "./dictionaries";

export const sections = ["music", "videos", "events", "about", "contact"] as const;
export type Section = (typeof sections)[number];

export async function sectionMetadata(params: Promise<{ locale: string }>, section: Section): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return pageMetadata(locale, section);
}

export function pageMetadata(locale: Locale, section?: Section): Metadata {
  const d = getDictionary(locale);
  const suffix = section ? `/${section}` : "";
  const title = section ? `${d.nav[section]} | ${site.name}` : d.meta.title;
  const description = section ? d.pageDescriptions[section] : d.meta.description;
  return {
    title,
    description,
    alternates: {
      canonical: `/${locale}${suffix}`,
      languages: {
        ...Object.fromEntries(locales.map((target) => [localeSettings[target].lang, `/${target}${suffix}`])),
        "x-default": `/${defaultLocale}${suffix}`,
      },
    },
    openGraph: {
      title, description, url: `/${locale}${suffix}`, siteName: site.name, type: "website",
      locale: localeSettings[locale].ogLocale,
      alternateLocale: locales.filter((target) => target !== locale).map((target) => localeSettings[target].ogLocale),
    },
  };
}