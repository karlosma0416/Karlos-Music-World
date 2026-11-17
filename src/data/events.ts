import type { Locale } from "@/i18n/config";

export type LocalizedText = Record<Locale, string>;
export type EventImage = {
    src: string;
    width: number;
    height: number;
    alt?: LocalizedText;
    caption?: LocalizedText;
    credit?: LocalizedText;
    layout?: "wide";
};
export type EventBodyBlock = { type: "paragraph" | "heading"; text: LocalizedText };
type Month = "01" | "02" | "03" | "04" | "05" | "06" | "07" | "08" | "09" | "10" | "11" | "12";

// ISO values preserve the known precision; never supply an invented month/day.
export type EventDate =
    | { datePrecision: "year"; date: `${number}` }
    | { datePrecision: "month"; date: `${number}-${Month}` }
    | { datePrecision: "day"; date: `${number}-${Month}-${number}` };

export type TimelineEvent = EventDate & {
    id: string;
    slug: string;
    title: LocalizedText;
    category?: "performance" | "activity" | "milestone";
    location?: LocalizedText;
    summary?: LocalizedText;
    body?: LocalizedText | readonly EventBodyBlock[];
    cover?: EventImage;
    gallery?: readonly EventImage[];
    links?: { href: string; label: LocalizedText }[];
};

export const events: readonly TimelineEvent[] = [
    {
        id: "hku-singing-contest-2025",
        slug: "hku-singing-contest-2025",
        date: "2025-04-07",
        datePrecision: "day",
        // Award confirmed in the biography; exact date supplied by the user.
        title: {
            en: "First runner-up in the HKU CSSAUD Singing Contest",
            zh: "香港大學 CSSAUD 歌唱比賽亞軍",
            "zh-cn": "香港大学 CSSAUD 歌唱比赛亚军",
        },
        location: {
            en: "Yuet Ming Auditorium, Chong Yuet Ming Cultural Centre, The University of Hong Kong, Hong Kong",
            zh: "香港大學莊月明文化中心月明劇院",
            "zh-cn": "香港大学庄月明文化中心月明剧院",
        },
        cover: {
            src: "/events/singcon2.jpg", width: 6960, height: 4640,
            alt: {
                en: "HKU CSSAUD Singing Contest stage with performers and audience members",
                zh: "香港大學 CSSAUD 歌唱比賽的舞台、表演者與觀眾",
                "zh-cn": "香港大学 CSSAUD 歌唱比赛的舞台、表演者与观众",
            },
        },
        gallery: [
            {
                src: "/events/singcon1.jpg", width: 6960, height: 4640, layout: "wide",
                alt: { en: "2025 HKU CSSAUD Singing Contest — photo 1", zh: "2025 年香港大學 CSSAUD 歌唱比賽照片一", "zh-cn": "2025 年香港大学 CSSAUD 歌唱比赛照片一" },
            },
            {
                src: "/events/singcon3.jpg", width: 1000, height: 1500,
                alt: { en: "2025 HKU CSSAUD Singing Contest — photo 3", zh: "2025 年香港大學 CSSAUD 歌唱比賽照片三", "zh-cn": "2025 年香港大学 CSSAUD 歌唱比赛照片三" },
            },
            {
                src: "/events/singcon4.jpg", width: 873, height: 1390,
                alt: { en: "2025 HKU CSSAUD Singing Contest — photo 4", zh: "2025 年香港大學 CSSAUD 歌唱比賽照片四", "zh-cn": "2025 年香港大学 CSSAUD 歌唱比赛照片四" },
            },
            {
                src: "/events/singcon5.jpg", width: 1000, height: 1500,
                alt: { en: "2025 HKU CSSAUD Singing Contest — photo 5", zh: "2025 年香港大學 CSSAUD 歌唱比賽照片五", "zh-cn": "2025 年香港大学 CSSAUD 歌唱比赛照片五" },
            },
            {
                src: "/events/singcon6.jpg", width: 1000, height: 1500,
                alt: { en: "2025 HKU CSSAUD Singing Contest — photo 6", zh: "2025 年香港大學 CSSAUD 歌唱比賽照片六", "zh-cn": "2025 年香港大学 CSSAUD 歌唱比赛照片六" },
            },
        ],
    },
    {
        id: "karlos-live-i-2026",
        slug: "karlos-live-i-2026",
        date: "2026-04-19",
        datePrecision: "day",
        title: { en: "Karlos's Live Ⅰ", zh: "Karlos's Live Ⅰ", "zh-cn": "Karlos's Live Ⅰ" },
        location: {
            en: "Open House 響館, Wan Chai, Hong Kong",
            zh: "Open House 響館，香港灣仔",
            "zh-cn": "Open House 响馆，香港湾仔",
        },
        cover: {
            src: "/events/live0.jpg", width: 1284, height: 1712,
            alt: { en: "Karlos's Live Ⅰ — cover photo", zh: "Karlos's Live Ⅰ 封面照片", "zh-cn": "Karlos's Live Ⅰ 封面照片" },
        },
        gallery: [
            {
                src: "/events/live6.jpg", width: 1707, height: 1280, layout: "wide",
                alt: { en: "Karlos's Live Ⅰ — photo 6", zh: "Karlos's Live Ⅰ 照片六", "zh-cn": "Karlos's Live Ⅰ 照片六" },
            },
            {
                src: "/events/live1.jpg", width: 1284, height: 1712,
                alt: { en: "Karlos's Live Ⅰ — photo 1", zh: "Karlos's Live Ⅰ 照片一", "zh-cn": "Karlos's Live Ⅰ 照片一" },
            },
            {
                src: "/events/live4.jpg", width: 1284, height: 1712,
                alt: { en: "Karlos's Live Ⅰ — photo 4", zh: "Karlos's Live Ⅰ 照片四", "zh-cn": "Karlos's Live Ⅰ 照片四" },
            },
            {
                src: "/events/live2.jpg", width: 1707, height: 1280,
                alt: { en: "Karlos's Live Ⅰ — photo 2", zh: "Karlos's Live Ⅰ 照片二", "zh-cn": "Karlos's Live Ⅰ 照片二" },
            },
            {
                src: "/events/live3.jpg", width: 1712, height: 1284,
                alt: { en: "Karlos's Live Ⅰ — photo 3", zh: "Karlos's Live Ⅰ 照片三", "zh-cn": "Karlos's Live Ⅰ 照片三" },
            },
            {
                src: "/events/live5.jpg", width: 1320, height: 1710,
                alt: { en: "Karlos's Live Ⅰ — photo 5", zh: "Karlos's Live Ⅰ 照片五", "zh-cn": "Karlos's Live Ⅰ 照片五" },
            },
            {
                src: "/events/live7.jpg", width: 1344, height: 2016,
                alt: { en: "Karlos's Live Ⅰ — photo 7", zh: "Karlos's Live Ⅰ 照片七", "zh-cn": "Karlos's Live Ⅰ 照片七" },
            },
            {
                src: "/events/live8.jpg", width: 1706, height: 1279, layout: "wide",
                alt: { en: "Karlos's Live Ⅰ — photo 8", zh: "Karlos's Live Ⅰ 照片八", "zh-cn": "Karlos's Live Ⅰ 照片八" },
            },
        ],
    },
];

export function groupEventsByYear(entries: readonly TimelineEvent[]) {
    // Missing components sort at the end of their known period, without being displayed.
    // Stable sort retains the source order for multiple events on the same date.
    const sorted = [...entries].sort((a, b) => {
        const key = ({ date }: TimelineEvent) => Number(date.replaceAll("-", "").padEnd(8, "0"));
        return key(b) - key(a);
    });
    const groups: { year: string; events: TimelineEvent[] }[] = [];
    for (const event of sorted) {
        const year = event.date.slice(0, 4);
        const previous = groups[groups.length - 1];
        if (previous?.year === year) previous.events.push(event);
        else groups.push({ year, events: [event] });
    }
    return groups;
}

export function getEventCover(event: TimelineEvent) {
    return event.cover ?? event.gallery?.[0];
}

export function getEventImages(event: TimelineEvent) {
    // An explicit gallery controls the detail images independently of the overview cover.
    // With no gallery, the cover remains available as a single-image detail.
    const images = new Map<string, EventImage>();
    for (const image of event.gallery ?? (event.cover ? [event.cover] : [])) {
        if (image) images.set(image.src, { ...images.get(image.src), ...image });
    }
    return [...images.values()];
}