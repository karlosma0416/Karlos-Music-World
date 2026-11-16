// Brand, assets and contact destinations live here. Null means not published.
// Use local paths under public/images; do not insert unlicensed artwork.
export const site = {
  name: "Karlos Ma",
  wordmark: "KARLOS MA",
  url: "https://karlosma.com",
  copyrightYear: new Date().getFullYear(),
  hero: { src: "/Icarus.jpg", video: "/video/Icarusmov.mov", isPlaceholder: false },
  about: { src: "/karlos.jpg" as string | null, isPlaceholder: false },
  social: {
    email: "mahaoyanghk@outlook.com",
    instagram: "https://www.instagram.com/karlos_ma0416/",
    youtube: "https://youtube.com/@karlosmahk?si=eBtHRCSbMh62EQPQ",
    spotify: "https://open.spotify.com/artist/00Fre4gV5RW9I15CYbK1NC",
    netease: "https://y.music.163.com/m/user?id=581858421",
  },
};