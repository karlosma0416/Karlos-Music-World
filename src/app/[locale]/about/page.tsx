import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/i18n/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/about">) {
  return sectionMetadata(params, "about");
}

export default function Page({ params }: PageProps<"/[locale]/about">) {
  return <SectionPage params={params} section="about" />;
}