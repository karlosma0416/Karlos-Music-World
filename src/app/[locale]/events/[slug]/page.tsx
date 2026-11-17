import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EventDetail } from "@/components/events-content";
import { events, getEventCover } from "@/data/events";
import { site } from "@/data/site";
import { defaultLocale, isLocale, locales, localeSettings } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export const dynamicParams = false;

export function generateStaticParams() {
    return events.map(({ slug }) => ({ slug }));
}

function getEvent(locale: string, slug: string) {
    const event = events.find((entry) => entry.slug === slug);
    if (!isLocale(locale) || !event) notFound();
    return event;
}

export async function generateMetadata({ params }: PageProps<"/[locale]/events/[slug]">): Promise<Metadata> {
    const { locale, slug } = await params;
    const event = getEvent(locale, slug);
    if (!isLocale(locale)) notFound();
    const title = `${event.title[locale]} | ${site.name}`;
    const description = event.summary?.[locale] ?? event.title[locale];
    const cover = getEventCover(event);
    return {
        title, description,
        alternates: {
            canonical: `/${locale}/events/${slug}/`,
            languages: {
                ...Object.fromEntries(locales.map((target) => [localeSettings[target].lang, `/${target}/events/${slug}/`])),
                "x-default": `/${defaultLocale}/events/${slug}/`,
            },
        },
        openGraph: {
            title, description, url: `/${locale}/events/${slug}/`, siteName: site.name,
            locale: localeSettings[locale].ogLocale,
            ...(cover && { images: [{ url: cover.src, width: cover.width, height: cover.height, alt: cover.alt?.[locale] ?? event.title[locale] }] }),
        },
    };
}

export default async function Page({ params }: PageProps<"/[locale]/events/[slug]">) {
    const { locale, slug } = await params;
    const event = getEvent(locale, slug);
    if (!isLocale(locale)) notFound();
    return (
        <main id="main-content" className="content-page events-page event-detail-page" tabIndex={-1}>
            <EventDetail event={event} locale={locale} dictionary={getDictionary(locale)} />
        </main>
    );
}