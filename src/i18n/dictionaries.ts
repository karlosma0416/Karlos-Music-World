import type { Locale } from "./config";

const zh = {
  meta: {
    title: "Karlos Ma | 音樂 · 藝術",
    description: "Karlos Ma 官方網站。探索音樂、影像與藝術創作，或聯絡洽談合作。",
  },
  pageDescriptions: {
    videos: "觀看 Karlos Ma 的音樂錄影帶、現場演出與翻唱影片。",
    music: "探索 Karlos Ma 的音樂作品，包括《餘生僅有》、《房間》、《伊卡洛斯之翼》、《秋雨》及《雪國》。",
    events: "Karlos Ma 的演出、活動與個人里程碑，以及照片與文字紀錄。",
    about: "認識 Karlos Ma：2002 年生於廣州、現居香港的創作歌手，以聲音探索意象、情感與音樂敘事。",
    contact: "與 Karlos Ma 聯絡，洽談音樂、影像及跨領域創作合作。",
  },
  nav: {
    welcomeIntro: "歡迎來到", welcomeSuffix: "", welcomeSubject: "的音樂世界。",
    welcomeTitle: "歡迎來到 Karlos Ma 的音樂世界。",
    music: "音樂", videos: "影片", events: "活動", about: "關於", contact: "聯絡",
    mainLabel: "主要導覽", languageLabel: "選擇語言", homeLabel: "Karlos Ma 首頁",
    switchZh: "切換至繁體中文", switchEn: "Switch to English", switchHans: "切换至简体中文", skip: "跳至主要內容",
  },
  hero: {
    discipline: "音樂・影像・藝術創作", index: "聲音與視覺的交會",
    lineOne: "讓聲音", lineTwo: "留下形狀。",
    visualLabel: "視覺習作 — 01", visualNote: "抽象主視覺佔位・待替換正式素材",
    visualAlt: "Icarus：黑色背景中，金白色羽翼伴隨火焰展開的藝術影像",
    enableSound: "開啟聲音", muteSound: "關閉聲音",
    scroll: "向下探索", caption: "一處容納聲音、影像與未完想像的空間。",
  },
  works: {
    eyebrow: "作品選輯", title: "精選作品", note: "三個位置，等待新的聲音。",
    cover: "封面待提供", year: "年份待填", status: "作品資料待補", listen: "聆聽作品",
    coverAlt: "作品封面：",
    listenOn: "在 {platform} 聆聽《{title}》",
  },
  videos: {
    play: "播放：{title}", watch: "在 YouTube 觀看", close: "關閉播放器",
    note: "影片由 YouTube 提供播放。若無法載入，請前往 YouTube 觀看。",
  },
  events: {
    title: "活動紀錄", body: "演出、相遇與重要時刻。點進每一則紀錄，閱讀其中的故事。",
    back: "返回時間軸", gallery: "活動圖集", readMore: "閱讀紀錄", related: "相關連結",
    emptyTitle: "歷程尚待記錄", emptyBody: "已確認的演出、活動與個人里程碑，將陸續記錄於此。",
    performance: "演出", activity: "活動", milestone: "里程碑", yearLabel: "{year} 年歷程",
  },
  about: {
    eyebrow: "關於 Karlos Ma", title: "不只聲音，", titleSecond: "也是一種感知。",
    intro: "馬浩陽是一位創作歌手，2002 年出生於中國廣州，現居香港。",
    body: "他六歲開始學習鋼琴，畢業於香港大學，主修計算機科學。他的音樂讓分析思維與直覺表達展開對話，並以人文關懷與真摯情感為根基。\n\n他的創作核心，是透過聲音構築鮮明意象——以旋律、歌詞與人聲表達，喚起場景、氛圍與動態，賦予情感空間與視覺的維度。他的作品包括與青年鋼琴家吳雨松的一系列合作，以及個人專輯《伊卡洛斯之翼》。他曾獲 2025 年香港大學歌唱比賽亞軍，原創作品《春江花月夜》則獲廣州市教育研究院古詩詞吟誦比賽一等獎。\n\n他擁有豐富的演出與錄音經驗，活躍於校內外舞台。他在香港發起「Karlos’s Live」演出系列，將原創歌曲及對其他音樂人精選作品的演繹帶入本地社群。他亦計劃將繪畫、人工智能及其他媒介融入現場演出，探索聲音與影像之間的關係，拓展音樂敘事與表達的可能性。",
    image: "個人影像待提供", imageNote: "影像佔位・待替換正式素材",
    imageAlt: "Karlos Ma 坐在窗邊，望向窗外，陽光灑入室內", index: "關於／01",
  },
  contact: {
    eyebrow: "合作與聯絡", title: "聯絡",
    body: "歡迎透過電子郵件洽談音樂、影像及跨領域創作合作，或於以下平台聆聽作品、關注近況。",
    netease: "網易雲音樂", profile: "音樂主頁", newTab: "（於新分頁開啟）",
    platformLabel: "前往 {platform} 上的 Karlos Ma 主頁",
    soon: "即將提供", email: "電子郵件", external: "前往平台",
  },
  message: {
    title: "留個訊息給 Karlos", name: "姓名", email: "你的電子郵件（選填）", body: "留言內容",
    send: "傳送留言", sending: "傳送中…", success: "留言已提交，謝謝你的來信。",
    error: "未能確認傳送成功，內容已保留。請稍後重試，或直接寄送電子郵件。",
    preview: "預覽模式：尚未接通郵件服務，暫時無法傳送。",
    anonymous: "匿名留言",
    consent: "我同意透過 Formspree 傳送以上資料以便聯絡。", website: "請留空此欄位",
  },
  footer: { rights: "版權所有。", top: "回到頂端", note: "音樂・影像・創作" },
};

export type Dictionary = {
  [Section in keyof typeof zh]: { [Key in keyof (typeof zh)[Section]]: string };
};

const en: Dictionary = {
  meta: {
    title: "Karlos Ma | Music & Art",
    description: "The official website of Karlos Ma. A space for music, moving images, artistic exploration and creative collaboration.",
  },
  pageDescriptions: {
    videos: "Watch music videos, live performances and covers by Karlos Ma.",
    music: "Explore music by Karlos Ma: The Only, Room, Icarus's Wings, Autumn Rain and Farewell in Winter.",
    events: "Performances, activities and milestones by Karlos Ma, with photographs and personal stories.",
    about: "Meet Karlos Ma, a singer-songwriter born in Guangzhou in 2002 and based in Hong Kong, exploring vivid imagery, emotion and storytelling through sound.",
    contact: "Get in touch with Karlos Ma for music, moving images and creative collaborations.",
  },
  nav: {
    welcomeIntro: "Welcome to", welcomeSuffix: "’s", welcomeSubject: "World of Music.",
    welcomeTitle: "Welcome to Karlos Ma’s World of Music.",
    music: "Music", videos: "Videos", events: "Events", about: "About", contact: "Contact",
    mainLabel: "Main navigation", languageLabel: "Choose language", homeLabel: "Karlos Ma home",
    switchZh: "切換至繁體中文", switchEn: "Switch to English", switchHans: "切换至简体中文", skip: "Skip to main content",
  },
  hero: {
    discipline: "Music · Moving image · Art", index: "Where sound meets vision",
    lineOne: "Giving sound", lineTwo: "a shape.",
    visualLabel: "Visual study — 01", visualNote: "Abstract placeholder · Final artwork to follow",
    visualAlt: "Icarus: golden-white wings unfolding amid flames against a black background",
    enableSound: "Enable sound", muteSound: "Mute sound",
    scroll: "Explore below", caption: "A space for sound, images and ideas still taking shape.",
  },
  works: {
    eyebrow: "An evolving collection", title: "Selected works", note: "Three spaces. New sounds to come.",
    cover: "Cover artwork to follow", year: "Year to be added", status: "Work details to follow", listen: "Listen to this work",
    coverAlt: "Cover artwork for ",
    listenOn: "Listen to {title} on {platform}",
  },
  videos: {
    play: "Play: {title}", watch: "Watch on YouTube", close: "Close player",
    note: "Videos are played via YouTube. If playback is unavailable, watch on YouTube.",
  },
  events: {
    title: "Events", body: "Performances, encounters and defining moments. Open a record to explore its story.",
    back: "Back to timeline", gallery: "Event gallery", readMore: "Read the story", related: "Related links",
    emptyTitle: "A story still unfolding", emptyBody: "Confirmed performances, activities and personal milestones will be recorded here.",
    performance: "Performance", activity: "Activity", milestone: "Milestone", yearLabel: "Timeline for {year}",
  },
  about: {
    eyebrow: "About Karlos Ma", title: "Beyond sound.", titleSecond: "Into feeling.",
    intro: "Karlos Ma is a singer-songwriter born in 2002 in Guangzhou, China, and currently based in Hong Kong.",
    body: "Ma began piano training at the age of six. He graduated from the University of Hong Kong, majoring in Computer Science. His music brings analytical thinking into dialogue with intuitive expression, grounded in humanistic concerns and emotional honesty.\n\nCentral to Ma’s practice is the creation of vivid imagery through sound. Through melody, lyrics, and vocal expression, he evokes scenes, atmospheres, and movement, giving emotion a spatial and visual dimension. His work includes collaborations with young pianist Yusong Wu and his solo album, *Icarus’s Wings*. He was awarded first runner-up in the 2025 HKU Singing Contest, and his original composition *Spring River in the Flower Moon Night* received first prize in the Guangzhou Academy of Educational Research Classical Poetry Chanting Competition.\n\nWith extensive performance and recording experience, Ma has been active on stages both on and off campus. He launched *Karlos’s Live* in Hong Kong, a performance series bringing his original songs and interpretations of selected works by other artists to the local community. He also plans to incorporate painting, artificial intelligence, and other media into live performance, exploring the relationship between sound and image to expand the narrative and expressive possibilities of music.",
    image: "Artist image to follow", imageNote: "Image placeholder · Final image to follow",
    imageAlt: "Karlos Ma sitting beside a window, looking outside as sunlight fills the room", index: "About / 01",
  },
  contact: {
    eyebrow: "Conversations & collaborations", title: "CONTACT",
    body: "For music, moving images and creative collaborations, get in touch by email. Listen and follow along on the platforms below.",
    netease: "NetEase Music", profile: "Music profile", newTab: "(opens in a new tab)",
    platformLabel: "Visit Karlos Ma on {platform}",
    soon: "Coming soon", email: "Email", external: "Visit platform",
  },
  message: {
    title: "Leave a message for Karlos", name: "Name", email: "Your email (optional)", body: "Message",
    send: "Send message", sending: "Sending…", success: "Your message has been submitted. Thank you for writing.",
    error: "Delivery could not be confirmed. Your message has been kept here. Please retry later or email directly.",
    preview: "Preview mode: email delivery is not connected yet. Sending is disabled.",
    anonymous: "Send anonymously",
    consent: "I agree to send these details via Formspree to get in touch.", website: "Leave this field empty",
  },
  footer: { rights: "All rights reserved.", top: "Back to top", note: "Music · Film · Art" },
};

const hans: Dictionary = {
  meta: {
    title: "Karlos Ma | 音乐 · 艺术",
    description: "Karlos Ma 官方网站。探索音乐、影像与艺术创作，或联系洽谈合作。",
  },
  pageDescriptions: {
    videos: "观看 Karlos Ma 的音乐录影带、现场演出与翻唱视频。",
    music: "探索 Karlos Ma 的音乐作品，包括《余生仅有》、《房间》、《伊卡洛斯之翼》、《秋雨》及《雪国》。",
    events: "Karlos Ma 的演出、活动与个人里程碑，以及照片与文字记录。",
    about: "认识 Karlos Ma：2002 年生于广州、现居香港的创作歌手，以声音探索意象、情感与音乐叙事。",
    contact: "联系 Karlos Ma，洽谈音乐、影像及跨领域创作合作。",
  },
  nav: {
    welcomeIntro: "欢迎来到", welcomeSuffix: "", welcomeSubject: "的音乐世界。",
    welcomeTitle: "欢迎来到 Karlos Ma 的音乐世界。",
    music: "音乐", videos: "视频", events: "活动", about: "关于", contact: "联系",
    mainLabel: "主要导航", languageLabel: "选择语言", homeLabel: "Karlos Ma 首页",
    switchZh: "切換至繁體中文", switchEn: "Switch to English", switchHans: "切换至简体中文", skip: "跳至主要内容",
  },
  hero: {
    discipline: "音乐・影像・艺术创作", index: "声音与视觉的交会",
    lineOne: "让声音", lineTwo: "留下形状。",
    visualLabel: "视觉习作 — 01", visualNote: "抽象主视觉占位・待替换正式素材",
    visualAlt: "Icarus：黑色背景中，金白色羽翼伴随火焰展开的艺术影像",
    enableSound: "开启声音", muteSound: "关闭声音",
    scroll: "向下探索", caption: "一处容纳声音、影像与未完想象的空间。",
  },
  works: {
    eyebrow: "作品选辑", title: "精选作品", note: "三个位置，等待新的声音。",
    cover: "封面待提供", year: "年份待填", status: "作品资料待补", listen: "收听作品",
    coverAlt: "作品封面：",
    listenOn: "在 {platform} 收听《{title}》",
  },
  videos: {
    play: "播放：{title}", watch: "在 YouTube 观看", close: "关闭播放器",
    note: "视频由 YouTube 提供播放。如无法加载，请前往 YouTube 观看。",
  },
  events: {
    title: "活动记录", body: "演出、相遇与重要时刻。点进每一则记录，阅读其中的故事。",
    back: "返回时间轴", gallery: "活动图集", readMore: "阅读记录", related: "相关链接",
    emptyTitle: "历程尚待记录", emptyBody: "已确认的演出、活动与个人里程碑，将陆续记录于此。",
    performance: "演出", activity: "活动", milestone: "里程碑", yearLabel: "{year} 年历程",
  },
  about: {
    eyebrow: "关于 Karlos Ma", title: "不只声音，", titleSecond: "也是一种感知。",
    intro: "马浩阳是一位创作歌手，2002 年出生于中国广州，现居香港。",
    body: "他六岁开始学习钢琴，毕业于香港大学，主修计算机科学。他的音乐让分析思维与直觉表达展开对话，并以人文关怀与真挚情感为根基。\n\n他的创作核心，是透过声音构筑鲜明意象——以旋律、歌词与人声表达，唤起场景、氛围与动态，赋予情感空间与视觉的维度。他的作品包括与青年钢琴家吴雨松的一系列合作，以及个人专辑《伊卡洛斯之翼》。他曾获 2025 年香港大学歌唱比赛亚军，原创作品《春江花月夜》则获广州市教育研究院古诗词吟诵比赛一等奖。\n\n他拥有丰富的演出与录音经验，活跃于校内外舞台。他在香港发起「Karlos’s Live」演出系列，将原创歌曲及对其他音乐人精选作品的演绎带入本地社群。他亦计划将绘画、人工智能及其他媒介融入现场演出，探索声音与影像之间的关系，拓展音乐叙事与表达的可能性。",
    image: "个人影像待提供", imageNote: "影像占位・待替换正式素材",
    imageAlt: "Karlos Ma 坐在窗边，望向窗外，阳光洒入室内", index: "关于／01",
  },
  contact: {
    eyebrow: "合作与联系", title: "联系",
    body: "欢迎通过电子邮件洽谈音乐、影像及跨领域创作合作，或在以下平台收听作品、关注近况。",
    netease: "网易云音乐", profile: "音乐主页", newTab: "（在新标签页中打开）",
    platformLabel: "前往 {platform} 上的 Karlos Ma 主页",
    soon: "即将提供", email: "电子邮箱", external: "前往平台",
  },
  message: {
    title: "给 Karlos 留言", name: "姓名", email: "你的邮箱（选填）", body: "留言内容",
    send: "发送留言", sending: "发送中…", success: "留言已提交，谢谢你的来信。",
    error: "无法确认发送成功，内容已保留。请稍后重试，或直接发送电子邮件。",
    preview: "预览模式：尚未接通邮件服务，暂时无法发送。",
    anonymous: "匿名留言",
    consent: "我同意通过 Formspree 发送以上信息以便联系。", website: "请留空此字段",
  },
  footer: { rights: "版权所有。", top: "回到顶部", note: "音乐・影像・创作" },
};

const dictionaries: Record<Locale, Dictionary> = { zh, en, "zh-cn": hans };
export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}