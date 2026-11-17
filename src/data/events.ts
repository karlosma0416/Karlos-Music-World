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
            en: "2025 HKU CSSAUD Singing Contest",
            zh: "2025 香港大學 CSSAUD 歌唱比賽",
            "zh-cn": "2025 香港大学 CSSAUD 歌唱比赛",
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
        id: "hku-singing-contest-2026",
        slug: "hku-singing-contest-2026",
        date: "2026-03-29",
        datePrecision: "day",
        title: {
            en: "2026 HKU CSSAUD Singing Contest",
            zh: "2026 香港大學 CSSAUD 歌唱比賽",
            "zh-cn": "2026 香港大学 CSSAUD 歌唱比赛",
        },
        location: {
            en: "Yuet Ming Auditorium, Chong Yuet Ming Cultural Centre, The University of Hong Kong, Hong Kong",
            zh: "香港大學莊月明文化中心月明劇院",
            "zh-cn": "香港大学庄月明文化中心月明剧院",
        },
        cover: {
            src: "/events/singcon9.jpg", width: 1707, height: 1280,
            alt: { en: "2026 HKU CSSAUD Singing Contest — photo 9", zh: "2026 年香港大學 CSSAUD 歌唱比賽照片九", "zh-cn": "2026 年香港大学 CSSAUD 歌唱比赛照片九" },
        },
        gallery: [
            {
                src: "/events/singcon9.jpg", width: 1707, height: 1280,
                alt: { en: "2026 HKU CSSAUD Singing Contest — photo 9", zh: "2026 年香港大學 CSSAUD 歌唱比賽照片九", "zh-cn": "2026 年香港大学 CSSAUD 歌唱比赛照片九" },
            },
            {
                src: "/events/singcon10.jpg", width: 1280, height: 960,
                alt: { en: "2026 HKU CSSAUD Singing Contest — photo 10", zh: "2026 年香港大學 CSSAUD 歌唱比賽照片十", "zh-cn": "2026 年香港大学 CSSAUD 歌唱比赛照片十" },
            },
            {
                src: "/events/singcon11.jpg", width: 1707, height: 1280,
                alt: { en: "2026 HKU CSSAUD Singing Contest — photo 11", zh: "2026 年香港大學 CSSAUD 歌唱比賽照片十一", "zh-cn": "2026 年香港大学 CSSAUD 歌唱比赛照片十一" },
            },
            {
                src: "/events/singcon12.jpg", width: 1707, height: 1280,
                alt: { en: "2026 HKU CSSAUD Singing Contest — photo 12", zh: "2026 年香港大學 CSSAUD 歌唱比賽照片十二", "zh-cn": "2026 年香港大学 CSSAUD 歌唱比赛照片十二" },
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
            src: "/events/live3.jpg", width: 1712, height: 1284,
            alt: { en: "Karlos's Live Ⅰ — cover photo", zh: "Karlos's Live Ⅰ 封面照片", "zh-cn": "Karlos's Live Ⅰ 封面照片" },
        },
        gallery: [
            {
                src: "/events/live0.jpg", width: 1284, height: 1712,
                alt: { en: "Karlos's Live Ⅰ — photo 0", zh: "Karlos's Live Ⅰ 原封面照片", "zh-cn": "Karlos's Live Ⅰ 原封面照片" },
            },
            {
                src: "/events/live13.jpg", width: 1280, height: 1920,
                alt: { en: "Karlos's Live Ⅰ — photo 13", zh: "Karlos's Live Ⅰ 照片十三", "zh-cn": "Karlos's Live Ⅰ 照片十三" },
            },
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
    {
        id: "karlos-live-ii-2026",
        slug: "karlos-live-ii-2026",
        date: "2026-08-23",
        datePrecision: "day",
        title: { en: "Karlos's Live Ⅱ", zh: "Karlos's Live Ⅱ", "zh-cn": "Karlos's Live Ⅱ" },
        location: {
            en: "ROCK' N ROLL, Panyu, Guangzhou",
            zh: "ROCK' N ROLL，廣州番禺",
            "zh-cn": "ROCK' N ROLL，广州番禺",
        },
        cover: {
            src: "/events/live11.jpg", width: 1496, height: 1279,
            alt: { en: "Karlos's Live Ⅱ — cover photo", zh: "Karlos's Live Ⅱ 封面照片", "zh-cn": "Karlos's Live Ⅱ 封面照片" },
        },
        gallery: [
            {
                src: "/events/live10.jpg", width: 1706, height: 1279, layout: "wide",
                alt: { en: "Karlos's Live Ⅱ — photo 10", zh: "Karlos's Live Ⅱ 照片十", "zh-cn": "Karlos's Live Ⅱ 照片十" },
            },
            {
                src: "/events/live9.jpg", width: 1279, height: 1706,
                alt: { en: "Karlos's Live Ⅱ — photo 9", zh: "Karlos's Live Ⅱ 照片九", "zh-cn": "Karlos's Live Ⅱ 照片九" },
            },
            {
                src: "/events/live12.jpg", width: 1279, height: 1496,
                alt: { en: "Karlos's Live Ⅱ — photo 12", zh: "Karlos's Live Ⅱ 照片十二", "zh-cn": "Karlos's Live Ⅱ 照片十二" },
            },
        ],
    },
    {
        id: "zhixin-centenary-2021",
        slug: "zhixin-centenary-2021",
        date: "2021-11-21",
        datePrecision: "day",
        title: {
            en: "Guangzhou Zhixin High School Centenary Celebration",
            zh: "廣州市執信中學百年校慶",
            "zh-cn": "广州市执信中学百年校庆",
        },
        location: {
            en: "Zhixin High School, Yuexiu, Guangzhou",
            zh: "執信中學，越秀，廣州",
            "zh-cn": "执信中学，越秀，广州",
        },
        cover: {
            src: "/events/Century.jpg", width: 1424, height: 801,
            alt: { en: "Guangzhou Zhixin High School centenary celebration — cover photo", zh: "廣州市執信中學百年校慶封面照片", "zh-cn": "广州市执信中学百年校庆封面照片" },
        },
        gallery: [
            {
                src: "/events/Century.jpg", width: 1424, height: 801, layout: "wide",
                alt: { en: "Guangzhou Zhixin High School centenary celebration — cover photo", zh: "廣州市執信中學百年校慶封面照片", "zh-cn": "广州市执信中学百年校庆封面照片" },
            },
            {
                src: "/events/century1.jpg", width: 1707, height: 1280, layout: "wide",
                alt: { en: "Guangzhou Zhixin High School centenary celebration — photo 1", zh: "廣州市執信中學百年校慶照片一", "zh-cn": "广州市执信中学百年校庆照片一" },
            },
            {
                src: "/events/century2.jpg", width: 2640, height: 1200, layout: "wide",
                alt: { en: "Guangzhou Zhixin High School centenary celebration — photo 2", zh: "廣州市執信中學百年校慶照片二", "zh-cn": "广州市执信中学百年校庆照片二" },
            },
            {
                src: "/events/century3.jpg", width: 2640, height: 1200, layout: "wide",
                alt: { en: "Guangzhou Zhixin High School centenary celebration — photo 3", zh: "廣州市執信中學百年校慶照片三", "zh-cn": "广州市执信中学百年校庆照片三" },
            },
            {
                src: "/events/century4.jpg", width: 3072, height: 4096,
                alt: { en: "Guangzhou Zhixin High School centenary celebration — photo 4", zh: "廣州市執信中學百年校慶照片四", "zh-cn": "广州市执信中学百年校庆照片四" },
            },
            {
                src: "/events/century5.jpg", width: 1620, height: 1080,
                alt: { en: "Guangzhou Zhixin High School centenary celebration — photo 5", zh: "廣州市執信中學百年校慶照片五", "zh-cn": "广州市执信中学百年校庆照片五" },
            },
            {
                src: "/events/fengenprize.jpg", width: 1123, height: 1080,
                alt: { en: "Guangzhou Zhixin High School centenary celebration — additional photo", zh: "廣州市執信中學百年校慶補充照片", "zh-cn": "广州市执信中学百年校庆补充照片" },
            },
            {
                src: "/events/fengenprize1.jpg", width: 1080, height: 1539,
                alt: { en: "Guangzhou Zhixin High School centenary celebration — additional photo 1", zh: "廣州市執信中學百年校慶補充照片一", "zh-cn": "广州市执信中学百年校庆补充照片一" },
            },
            {
                src: "/events/fengenprize2.jpg", width: 1920, height: 1080,
                alt: { en: "Guangzhou Zhixin High School centenary celebration — additional photo 2", zh: "廣州市執信中學百年校慶補充照片二", "zh-cn": "广州市执信中学百年校庆补充照片二" },
            },
            {
                src: "/events/fengenprize3.jpg", width: 1600, height: 1067,
                alt: { en: "Guangzhou Zhixin High School centenary celebration — additional photo 3", zh: "廣州市執信中學百年校慶補充照片三", "zh-cn": "广州市执信中学百年校庆补充照片三" },
            },
        ],
    },
    {
        id: "fengen-night-2020",
        slug: "fengen-night-2020",
        date: "2020-08-29",
        datePrecision: "day",
        // Date and venue corroborated by https://www.sohu.com/a/414120893_676050.
        title: {
            en: "“Zhixin Strength • Together We Go” Feng'en Night Fundraising Gala",
            zh: "「執信力量•你我同行」奉恩之夜籌款晚會",
            "zh-cn": "“执信力量•你我同行”奉恩之夜筹款晚会",
        },
        location: {
            en: "The Garden Hotel, Guangzhou",
            zh: "花園酒店，廣州",
            "zh-cn": "花园酒店，广州",
        },
        cover: {
            src: "/events/fengen.jpg", width: 1280, height: 813,
            alt: { en: "Feng'en Night fundraising gala — cover photo", zh: "奉恩之夜籌款晚會封面照片", "zh-cn": "奉恩之夜筹款晚会封面照片" },
        },
        gallery: [
            {
                src: "/events/fengen.jpg", width: 1280, height: 813, layout: "wide",
                alt: { en: "Feng'en Night fundraising gala — cover photo", zh: "奉恩之夜籌款晚會封面照片", "zh-cn": "奉恩之夜筹款晚会封面照片" },
            },
            {
                src: "/events/fengen2.jpg", width: 1440, height: 1080,
                alt: { en: "Feng'en Night fundraising gala — photo 2", zh: "奉恩之夜籌款晚會照片二", "zh-cn": "奉恩之夜筹款晚会照片二" },
            },
            {
                src: "/events/fengen3.jpg", width: 1440, height: 1080,
                alt: { en: "Feng'en Night fundraising gala — photo 3", zh: "奉恩之夜籌款晚會照片三", "zh-cn": "奉恩之夜筹款晚会照片三" },
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