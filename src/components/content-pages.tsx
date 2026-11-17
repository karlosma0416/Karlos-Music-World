import Image from "next/image";
import { ExternalLinkArrow } from "@/components/external-link-arrow";
import { site } from "@/data/site";
import { works } from "@/data/works";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";

export function MusicPage({ locale, dictionary: d }: { locale: Locale; dictionary: Dictionary }) {
    return (
        <>
            <h1>{d.nav.music}</h1>
            <ol className="works-list">
                {works.map((work) => (
                    <li className="work" key={work.id}>
                        <div className="work-cover">
                            {work.cover ? (
                                <Image src={work.cover} alt={`${d.works.coverAlt}${work.title[locale]}`} fill sizes="(max-width: 700px) 90px, 130px" />
                            ) : <span>{d.works.cover}</span>}
                        </div>
                        <div className="work-details">
                            {work.year !== undefined && <span className="work-index">{work.year}</span>}
                            <h2>
                                <span lang={locale === "zh-cn" ? "zh-Hans" : "zh-Hant"}>{work.title[locale === "zh-cn" ? "zh-cn" : "zh"]}</span>
                                {" "}
                                <span lang="en">{work.title.en}</span>
                            </h2>
                            <ul className="work-links">
                                {work.links.map((link) => (
                                    <li key={link.platform}>
                                        <a
                                            href={link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${d.works.listenOn.replace("{title}", work.title[locale]).replace("{platform}", link.platform === "NetEase" && locale !== "en" ? d.contact.netease : link.platform)} ${d.contact.newTab}`}
                                        >
                                            {link.platform === "NetEase" && locale !== "en" ? d.contact.netease : link.platform}<ExternalLinkArrow />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </li>
                ))}
            </ol>
        </>
    );
}

export function EventsPage({ dictionary: d }: { dictionary: Dictionary }) {
    return (
        <>
            <p className="eyebrow">{d.events.eyebrow}</p>
            <h1>{d.nav.events}</h1>
            <p className="page-intro">{d.events.body}</p>
        </>
    );
}

export function AboutPage({ dictionary: d }: { dictionary: Dictionary }) {
    return (
        <>
            <h1>{d.nav.about}</h1>
            <figure className="about-figure">
                <div className="about-image">
                    {site.about.src ? <Image src={site.about.src} alt={d.about.imageAlt} fill sizes="(max-width: 700px) 90vw, 65vw" /> : <p>{d.about.image}</p>}
                </div>
                {site.about.isPlaceholder && <figcaption>{d.about.imageNote}</figcaption>}
            </figure>
            <div className="about-text">
                <p className="about-name">{site.name}</p>
                <p>{d.about.intro}</p>
                {d.about.body.split("\n\n").map((paragraph, index) => (
                    <p key={index}>
                        {paragraph.split(/(\*[^*]+\*)/g).map((part, partIndex) => (
                            part.startsWith("*") && part.endsWith("*")
                                ? <em key={partIndex}>{part.slice(1, -1)}</em>
                                : part
                        ))}
                    </p>
                ))}
            </div>
        </>
    );
}

export function ContactPage({ dictionary: d }: { dictionary: Dictionary }) {
    const platforms = [
        { name: "Spotify", href: site.social.spotify },
        { name: d.contact.netease, href: site.social.netease },
        { name: "Instagram", href: site.social.instagram },
        { name: "YouTube", href: site.social.youtube },
    ];
    return (
        <div className="contact-content">
            <h1>{d.contact.title}</h1>
            <div className="contact-email">
                <p className="contact-label">{d.contact.email}</p>
                <a href={`mailto:${site.social.email}`}>{site.social.email}</a>
            </div>
            <ul className="contact-platforms">
                {platforms.map((platform) => (
                    <li key={platform.name}>
                        <a
                            href={platform.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${d.contact.platformLabel.replace("{platform}", platform.name)} ${d.contact.newTab}`}
                        >
                            {platform.name}<ExternalLinkArrow />
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}