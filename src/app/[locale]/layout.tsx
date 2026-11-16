import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { site } from "@/data/site";
import { isLocale, locales, localeSettings } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import "@fontsource-variable/inter-tight/wght.css";
import "../globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  applicationName: site.name,
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return (
    <html lang={localeSettings[locale].lang}>
      <body>
        <a className="skip-link" href="#main-content">{dictionary.nav.skip}</a>
        <div className="site-frame">
          <Suspense><SiteHeader locale={locale} dictionary={dictionary} /></Suspense>
          {children}
          <SiteFooter dictionary={dictionary} />
        </div>
      </body>
    </html>
  );
}