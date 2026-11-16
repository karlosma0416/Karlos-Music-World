"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function HeroVideo({ labels }: { labels: Dictionary["hero"] }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [failed, setFailed] = useState(false);
    const [muted, setMuted] = useState(true);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = true;
        video.volume = 0;
        const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
        const silence = () => {
            video.muted = true;
            video.volume = 0;
        };
        const stop = () => {
            silence();
            video.pause();
        };
        const silenceBeforeNavigation = (event: MouseEvent) => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
            if (!(link instanceof HTMLAnchorElement) || link.target === "_blank" || link.hasAttribute("download")) return;
            const destination = new URL(link.href, window.location.href);
            if (destination.origin !== window.location.origin || destination.pathname !== window.location.pathname || destination.search !== window.location.search) {
                silence();
            }
        };
        const restoreSilently = () => {
            silence();
            if (!motion.matches) void video.play().catch(() => { /* Respect browser autoplay settings. */ });
        };
        const respectMotion = () => {
            if (motion.matches) video.pause();
        };
        if (motion.matches) video.pause();
        else void video.play().catch(() => { /* Autoplay can be blocked by browser settings. */ });
        motion.addEventListener("change", respectMotion);
        document.addEventListener("click", silenceBeforeNavigation, true);
        window.addEventListener("pagehide", stop);
        window.addEventListener("pageshow", restoreSilently);
        return () => {
            stop();
            motion.removeEventListener("change", respectMotion);
            document.removeEventListener("click", silenceBeforeNavigation, true);
            window.removeEventListener("pagehide", stop);
            window.removeEventListener("pageshow", restoreSilently);
        };
    }, []);

    async function toggleSound() {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !video.muted;
        video.volume = video.muted ? 0 : 0.12;
        if (!video.muted && video.paused) {
            await video.play().catch(() => {
                video.muted = true;
                video.volume = 0;
            });
        }
    }

    return (
        <>
            <div className="entrance-artwork">
                {failed ? <Image src={site.hero.src} alt={labels.visualAlt} fill sizes="(max-width: 700px) 100vw, 75vw" /> : (
                    <video
                        ref={videoRef}
                        className="hero-video"
                        src={site.hero.video}
                        poster={site.hero.src}
                        aria-label={labels.visualAlt}
                        autoPlay
                        loop
                        muted={muted}
                        playsInline
                        preload="auto"
                        onError={() => setFailed(true)}
                        onVolumeChange={(event) => setMuted(event.currentTarget.muted)}
                    />
                )}
            </div>
            {!failed && (
                <button
                    type="button"
                    className="hero-sound-toggle"
                    aria-label={muted ? labels.enableSound : labels.muteSound}
                    title={muted ? labels.enableSound : labels.muteSound}
                    aria-pressed={!muted}
                    onClick={toggleSound}
                >
                    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                        <path d="M8 4 4 7H2v4h2l4 3V4Z" strokeLinejoin="round" />
                        {muted ? <path d="m12 7 4 4m0-4-4 4" /> : <path d="M11 6c2 1.5 2 4.5 0 6m2-8c4 2.5 4 7.5 0 10" strokeLinecap="round" />}
                    </svg>
                </button>
            )}
        </>
    );
}