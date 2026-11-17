import Image from "next/image";
import { ExternalLinkArrow } from "@/components/external-link-arrow";
import { getEventCover, getEventImages, groupEventsByYear, type EventDate, type TimelineEvent } from "@/data/events";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function formatEventDate(event: EventDate, locale: Locale) {
    const [year, month = 1, day = 1] = event.date.split("-").map(Number);
    if (event.datePrecision === "day") return `${year}.${month}.${day}`;
    return new Intl.DateTimeFormat(
        { en: "en-GB", zh: "zh-Hant", "zh-cn": "zh-Hans" }[locale],
        {
            year: "numeric",
            ...(event.datePrecision !== "year" && { month: "long" }),
            timeZone: "UTC",
        },
    ).format(new Date(Date.UTC(year, month - 1, day)));
}

function EventFacts({ event, locale, dictionary: d }: {
    event: TimelineEvent; locale: Locale; dictionary: Dictionary;
}) {
    if (!event.category && !event.location) return null;
    return <div className="event-details">
        {event.category && <span className="event-type">{d.events[event.category]}</span>}
        {event.location && <p>{event.location[locale]}</p>}
    </div>;
}

export function EventsTimeline({ entries, locale, dictionary: d }: {
    entries: readonly TimelineEvent[];
    locale: Locale;
    dictionary: Dictionary;
}) {
    if (!entries.length) {
        return <div className="events-empty"><h2>{d.events.emptyTitle}</h2><p>{d.events.emptyBody}</p></div>;
    }
    return (
        <div className="events-timeline">
            {groupEventsByYear(entries).map((group) => (
                <section className="event-year-group" key={group.year} aria-label={d.events.yearLabel.replace("{year}", group.year)}>
                    <ol className="event-list" role="list">
                        {group.events.map((event) => {
                            const cover = getEventCover(event);
                            return <li id={`event-${event.id}`} className="event-node" key={event.id}>
                                <a className={`event-entry${cover ? " event-entry-with-cover" : ""}`} href={`/${locale}/events/${event.slug}/`}>
                                    <div className="event-entry-copy">
                                        <time className="event-date" dateTime={event.date}>{formatEventDate(event, locale)}</time>
                                        <h2 className="event-entry-title">{event.title[locale]}</h2>
                                        <EventFacts event={event} locale={locale} dictionary={d} />
                                        {event.summary && <p className="event-entry-summary">{event.summary[locale]}</p>}
                                        <span className="event-read-more">{d.events.readMore}<ExternalLinkArrow /></span>
                                    </div>
                                    {cover && <div className="event-cover">
                                        <Image src={cover.src} alt={cover.alt?.[locale] ?? ""} width={cover.width} height={cover.height}
                                            sizes="(max-width: 700px) 84px, 180px" loading="lazy" />
                                    </div>}
                                </a>
                            </li>;
                        })}
                    </ol>
                </section>
            ))}
        </div>
    );
}

export function EventDetail({ event, locale, dictionary: d }: {
    event: TimelineEvent;
    locale: Locale;
    dictionary: Dictionary;
}) {
    const images = getEventImages(event);
    return (
        <>
            <a className="event-back" href={`/${locale}/events/#event-${event.id}`}>{d.events.back}</a>
            <article className="event-detail">
                <header className="event-detail-header">
                    <time className="event-date" dateTime={event.date}>{formatEventDate(event, locale)}</time>
                    <h1>{event.title[locale]}</h1>
                    <EventFacts event={event} locale={locale} dictionary={d} />
                </header>
                {event.summary && <p className="event-summary">{event.summary[locale]}</p>}
                {event.body && <div className="event-body">
                    {"en" in event.body
                        ? event.body[locale].split(/\n\s*\n/).map((paragraph, index) => <p key={index}>{paragraph}</p>)
                        : event.body.map((block, index) => block.type === "heading"
                            ? <h2 key={index}>{block.text[locale]}</h2>
                            : <p key={index}>{block.text[locale]}</p>)}
                </div>}
                {!!images.length && (
                    <section className="event-gallery" aria-label={d.events.gallery}>
                        {images.map((image, index) => (
                            <figure className={image.layout === "wide" || images.length === 1 ? "event-image-wide" : undefined} key={image.src}>
                                <Image src={image.src} alt={image.alt?.[locale] ?? ""} width={image.width} height={image.height}
                                    sizes={image.layout === "wide" || images.length === 1
                                        ? "(max-width: 700px) calc(100vw - 48px), (max-width: 1200px) 65vw, 900px"
                                        : "(max-width: 700px) calc(100vw - 48px), (max-width: 1200px) 32vw, 440px"}
                                    loading={index === 0 ? "eager" : "lazy"} />
                                {(image.caption || image.credit) && <figcaption>
                                    {image.caption && <span>{image.caption[locale]}</span>}
                                    {image.credit && <span className="event-image-credit">{image.credit[locale]}</span>}
                                </figcaption>}
                            </figure>
                        ))}
                    </section>
                )}
                {!!event.links?.length && <section className="event-related" aria-label={d.events.related}>
                    <h2>{d.events.related}</h2>
                    <ul className="event-links" role="list">
                        {event.links.map((link) => <li key={link.href}>
                            <a href={link.href} target="_blank" rel="noopener noreferrer">
                                <span>{link.label[locale]}<span className="sr-only"> {d.contact.newTab}</span></span>
                                <ExternalLinkArrow />
                            </a>
                        </li>)}
                    </ul>
                </section>}
            </article>
        </>
    );
}