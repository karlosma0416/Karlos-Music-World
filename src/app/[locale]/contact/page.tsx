import { SectionPage } from "@/components/section-page";
import { sectionMetadata } from "@/i18n/metadata";

export function generateMetadata({ params }: PageProps<"/[locale]/contact">) {
  return sectionMetadata(params, "contact");
}

export default function Page({ params }: PageProps<"/[locale]/contact">) {
  return <SectionPage params={params} section="contact" />;
}