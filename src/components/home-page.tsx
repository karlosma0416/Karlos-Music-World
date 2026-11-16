import { HeroVideo } from "@/components/hero-video";
import type { Dictionary } from "@/i18n/dictionaries";

export function HomePage({ dictionary: d }: { dictionary: Dictionary }) {
    return (
        <main id="main-content" className="entrance" tabIndex={-1}>
            <h1 className="sr-only">{d.nav.welcomeTitle}</h1>
            <HeroVideo labels={d.hero} />
        </main>
    );
}