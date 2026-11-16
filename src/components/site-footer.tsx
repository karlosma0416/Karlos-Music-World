import { site } from "@/data/site";
import type { Dictionary } from "@/i18n/dictionaries";

export function SiteFooter({ dictionary: d }: { dictionary: Dictionary }) {
  return (
    <footer className="site-footer">
      <span>© {site.copyrightYear} {site.name}. {d.footer.rights}</span>
    </footer>
  );
}