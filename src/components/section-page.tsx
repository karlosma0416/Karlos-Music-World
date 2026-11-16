import { notFound } from "next/navigation";
import { isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Section } from "@/i18n/metadata";
import { MusicPage, EventsPage, AboutPage, ContactPage } from "./content-pages";

export async function SectionPage({ params, section }: { params: Promise<{ locale: string }>; section: Section }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dictionary = getDictionary(locale);
  return (
    <main id="main-content" className={`content-page ${section}-page`} tabIndex={-1}>
      {section === "music" && <MusicPage locale={locale} dictionary={dictionary} />}
      {section === "events" && <EventsPage dictionary={dictionary} />}
      {section === "about" && <AboutPage dictionary={dictionary} />}
      {section === "contact" && <ContactPage dictionary={dictionary} />}
    </main>
  );
}