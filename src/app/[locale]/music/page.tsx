import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/i18n/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/music">) {
  return sectionMetadata(params, "music");
}

export default function Page({ params }: PageProps<"/[locale]/music">) {
  return <SectionPage params={params} section="music" />;
}