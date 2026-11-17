// Titles and channel verified via YouTube oEmbed; keep the supplied ordering.
export const videos = [
    { id: "XNEAZKaBJdw", title: "餘生僅有 The Only (Music Video)" },
    { id: "usf--zNYsfs", title: "KarlosMa馬浩阳 - 雪國 Farewell in Winter (Official Music Video)" },
    { id: "cghNgP67-xk", title: "Autumn Rain (Live) with IMsweetyt" },
    { id: "c0GYclJArgI", title: "第一個清晨(First Morning) Cover" },
    { id: "Cb2blMlwI6U", title: "愛錯(Ai Cuo) Cover" },
    { id: "GB2ZiYnwi0A", title: "Falling into you (Cover) with IMsweetyt" },
    { id: "AfX6MF48icU", title: "Spring River Flower Moonlight Night" },
] as const;

export const videoChannel = "KarlosMa 馬浩阳";
export const videoUrl = (id: string) => `https://www.youtube.com/watch?v=${id}`;
export const videoEmbedUrl = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1`;