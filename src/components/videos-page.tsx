"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { videos, videoUrl, videoEmbedUrl, getVideoTitle } from "@/data/videos";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { ExternalLinkArrow } from "./external-link-arrow";

export function VideosPage({ locale, dictionary: d }: { locale: Locale; dictionary: Dictionary }) {
    const [active, setActive] = useState<string | null>(null);
    const buttons = useRef(new Map<string, HTMLButtonElement>());

    return <>
        <h1>{d.nav.videos}</h1>
        <ul className="video-grid">
            {videos.map((video) => <li key={video.id}>
                <article className="video-card">
                    <div className="video-screen">
                        {active === video.id
                            ? <iframe key={video.id} src={videoEmbedUrl(video.id)} title={getVideoTitle(video, locale)}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                            : <button type="button" className="video-preview" onClick={() => setActive(video.id)}
                                ref={(element) => { if (element) buttons.current.set(video.id, element); else buttons.current.delete(video.id); }}
                                aria-label={d.videos.play.replace("{title}", getVideoTitle(video, locale))}>
                                <Image src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`} alt="" width={480} height={360}
                                    unoptimized sizes="(max-width: 700px) calc(100vw - 48px), 480px" loading="lazy" />
                                <span className="video-play" aria-hidden="true"><svg viewBox="0 0 24 24" fill="currentColor"><path d="m9 5 11 7-11 7Z" /></svg></span>
                            </button>}
                    </div>
                    <h2>{getVideoTitle(video, locale)}</h2>
                    <div className="video-actions">
                        <a href={videoUrl(video.id)} target="_blank" rel="noopener noreferrer">
                            {d.videos.watch}<ExternalLinkArrow /><span className="sr-only">{d.contact.newTab}</span>
                        </a>
                        {active === video.id && <button type="button" onClick={() => {
                            setActive(null);
                            requestAnimationFrame(() => buttons.current.get(video.id)?.focus());
                        }}>{d.videos.close}</button>}
                    </div>
                </article>
            </li>)}
        </ul>
    </>;
}