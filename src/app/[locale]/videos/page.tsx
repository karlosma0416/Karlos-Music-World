import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/i18n/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/videos">) {
    return sectionMetadata(params, "videos");
}

export default function Page({ params }: PageProps<"/[locale]/videos">) {
    return <SectionPage params={params} section="videos" />;
}