import type { Locale } from "@/i18n/config";

type LocalizedText = Record<Locale, string>;
export type Work = {
  id: string;
  title: LocalizedText;
  year?: number;
  cover: string | null;
  links: { platform: "Spotify" | "NetEase"; href: string }[];
};

export const works: Work[] = [
  {
    id: "the-only", title: { zh: "餘生僅有", en: "The Only", "zh-cn": "余生仅有" }, year: 2026, cover: "/Theonly.jpg",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/track/2I13FZzJClWx0t2ne4SI8A?si=83fe0545168c4bfd" },
      { platform: "NetEase", href: "https://163cn.tv/blajgW1v" },
    ],
  },
  {
    id: "room", title: { zh: "房間", en: "Room", "zh-cn": "房间" }, year: 2026, cover: "/Room.jpg",
    links: [{ platform: "NetEase", href: "https://163cn.tv/blajrrxT" }],
  },
  {
    id: "icarus-wings", title: { zh: "伊卡洛斯之翼", en: "Icarus's Wings", "zh-cn": "伊卡洛斯之翼" }, year: 2024, cover: "/Icarus's Wings.jpg",
    links: [{ platform: "NetEase", href: "https://163cn.tv/blajx1Gz" }],
  },
  {
    id: "autumn-rain", title: { zh: "秋雨", en: "Autumn Rain", "zh-cn": "秋雨" }, year: 2024, cover: "/Autumnrain.jpg",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/track/7BN3VjvX01WfGkJ98qrthc?si=xnEmYKJlQqSkXwxvKVHuCg&utm_source=copy-link" },
      { platform: "NetEase", href: "https://163cn.tv/blajI76T" },
    ],
  },
  {
    id: "santa-monica", title: { zh: "聖莫尼卡", en: "Santa Monica", "zh-cn": "圣莫尼卡" }, year: 2023, cover: "/Santamonica.jpg",
    links: [
      { platform: "Spotify", href: "https://open.spotify.com/track/7Kfa9fdo7L1xZrsw8JEegT?si=_w2eceCSSoG_yMPLAqU37w&utm_source=copy-link" },
      { platform: "NetEase", href: "https://163cn.tv/blaj4NgV" },
    ],
  },
  {
    id: "farewell-in-winter", title: { zh: "雪國", en: "Farewell in Winter", "zh-cn": "雪国" }, year: 2021, cover: "/Farewell in Winter.jpg",
    links: [{ platform: "NetEase", href: "https://163cn.tv/blajZF9Q" }],
  },
  {
    id: "spring-river", title: { zh: "春江花月夜", en: "Spring River in the Flower Moon Night", "zh-cn": "春江花月夜" }, year: 2020, cover: "/Springflower.jpg",
    links: [{ platform: "NetEase", href: "https://163cn.tv/blajtfWj" }],
  },
];