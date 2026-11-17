import { site } from "@/data/site";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries";
import { LanguageSwitcher } from "./language-switcher";
import { ContactNavLink } from "./contact-nav-link";

export function SiteHeader({ locale, dictionary: d }: { locale: Locale; dictionary: Dictionary }) {
    return (
        <header className="site-header" id="top">
            <a className="brand" href={`/${locale}`} aria-label={d.nav.homeLabel}>
                <span className="welcome-intro">{d.nav.welcomeIntro}</span>
                <span className="welcome-artist">{site.name}{d.nav.welcomeSuffix}</span>
                <span className="welcome-subject">{d.nav.welcomeSubject}</span>
            </a>
            <nav className="main-nav" aria-label={d.nav.mainLabel}>
                <a href={`/${locale}/music`}>{d.nav.music}</a>
                <a href={`/${locale}/videos`}>{d.nav.videos}</a>
                <a href={`/${locale}/events`}>{d.nav.events}</a>
                <a href={`/${locale}/about`}>{d.nav.about}</a>
                <ContactNavLink href={`/${locale}/contact`} label={d.nav.contact} />
            </nav>
            <div className="language-position"><LanguageSwitcher locale={locale} labels={d.nav} /></div>
        </header>
    );
}