import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/i18n/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/events">) {
    return sectionMetadata(params, "events");
}

export default function Page({ params }: PageProps<"/[locale]/events">) {
    return <SectionPage params={params} section="events" />;
}