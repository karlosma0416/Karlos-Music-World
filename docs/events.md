# 维护 Events 时间轴与事件详情

事件集中维护在 [src/data/events.ts](../src/data/events.ts) 的 `events` 数组中。
每一笔是一件独立的事，同一天可添加多笔，必须使用不同且稳定的 `id` 和 `slug`。
`id` 用于节点及返回定位，`slug` 用于公开网址；公开后建议保持两者不变。
总览为单侧垂直时间轴，左侧细线与节点，右侧为可整项点击的事件入口；不显示顶部简介与独立年份标题。
页面自动按日期由新到旧排列；同日保持资料中的原始顺序。
总览只展示日期、标题、类型、地点、简短摘要及一张可选缩图，不展开正文或图集。
点击后进入独立详情页；返回链接包含 `#event-事件id`，即使从外部直接进入也能返回并定位。
新增资料后，构建会自动导出三语言详情页，无需手工增加路由。

## 新增一笔

以下仅为字段格式示例，**不是实际事件，请勿原样加入正式资料**：

```ts
{
    id: "replace-with-a-stable-unique-id",
    slug: "replace-with-a-public-url-slug",
    date: "2026", // 换成已确认年份
    datePrecision: "year",
    title: {
        en: "Confirmed event title",
        zh: "已確認的事件標題",
        "zh-cn": "已确认的事件标题",
    },
    // 可选：category: "performance" | "activity" | "milestone"
    // 可选：location、summary，格式与 title 相同（三种语言）
    // 可选：body、cover、gallery、links，见下方示例
},
```

只需往数组加入该对象，无需复制 JSX。没有资料的可选字段请直接省略。
图片放在 public 下，填写原始宽高以保留比例，并为三种语言提供有意义的 `alt`。
`cover` 是列表封面；未填时使用 `gallery` 的第一张图片。
无图事件使用文字链接，不生成假图片或空白图片框。
填写 `gallery` 时，详情只按其顺序展示，不自动加入总览封面；未填 `gallery` 时才使用封面作为详情单图。相同路径只出现一次。
不要补造演出、日期、场地，或从作品发行年份推断活动。

## 正文与三语内容

所有文字使用 `{ en, zh, "zh-cn" }`：分别为英文、繁体中文、简体中文。
同一事件三个语言版本共用 `id` 和 `slug`，语言切换保留事件。
`body` 可用三语纯文字对象，以 `\n\n` 分段；需要小标题时用有序内容区块：

```ts
body: [
    { type: "heading", text: { en: "Background", zh: "背景", "zh-cn": "背景" } },
    { type: "paragraph", text: { en: "Confirmed account…", zh: "已確認的記錄……", "zh-cn": "已确认的记录……" } },
    { type: "heading", text: { en: "Reflections", zh: "感受", "zh-cn": "感受" } },
    { type: "paragraph", text: { en: "Your own words…", zh: "你的文字……", "zh-cn": "你的文字……" } },
],
```

区块小标题渲染为 h2，文章标题为 h1；正文不固定高度、限制阅读栏宽。
不解析 HTML，不使用 `dangerouslySetInnerHTML`，不引入 Markdown/CMS 套件。

## 封面与图集

以下仍是字段说明，不是实际图片或活动：

```ts
cover: {
    src: "/events/your-event/cover.jpg", width: 1800, height: 1200,
    alt: { en: "Describe the photo", zh: "描述照片內容", "zh-cn": "描述照片内容" },
    layout: "wide",
},
gallery: [
    {
        src: "/events/your-event/photo-02.jpg", width: 1200, height: 1800,
        alt: { en: "Describe the photo", zh: "描述照片內容", "zh-cn": "描述照片内容" },
        caption: { en: "Photo caption", zh: "圖說", "zh-cn": "图说" },
        credit: { en: "Photography: name", zh: "攝影：姓名", "zh-cn": "摄影：姓名" },
    },
],
links: [{ href: "https://example.com/replace-with-real-url",
          label: { en: "Watch video", zh: "觀看影片", "zh-cn": "观看影片" } }],
```

- 图集桌面双栏、手机单栏，原始比例完整显示、不裁成正方形。
- `layout: "wide"` 跨满两栏；单张图片自动宽幅。未设置的图片占一栏。
- `alt`、`caption`、`credit`、`layout` 可省略。省略 alt 时输出空 alt；有信息的照片建议填写描述。
- 所有图片提供原始宽高，第一张详情图正常加载，后续图片与总览缩图 lazy load。
- 只有文字、只有图集都可；不显示空图片框、不自动播放、不嵌入第三方播放器。

### 日期精度

| 已知资料 | datePrecision | date | 英文显示示意 |
| --- | --- | --- | --- |
| 年份 | year | 2025 | 2025 |
| 年月 | month | 2025-03 | March 2025 |
| 年月日 | day | 2025-03-20 | 2025.3.20 |

使用有效的 ISO 日期，月、日补齐两位。`date` 同时用于排序及 `<time dateTime>`；
`datePrecision` 控制显示，不会将只有年份的事件显示为 1 月 1 日。
同一年内，只有年份的记录排在该年已知月日记录之后；同月内只有年月的记录也排在该月已知日期之后。

## 当前正式资料

收录用户确认的两笔事件，均不显示类型标签：
- 香港大学 CSSAUD 歌唱比赛亚军：2025.4.7，香港大学庄月明文化中心月明剧院；英文地址末尾包含 Hong Kong。
- Karlos's Live Ⅰ：2026.4.19，Open House 響館，香港湾仔。
歌唱比赛总览封面为 singcon2，详情按顺序展示 singcon1、3、4、5、6；使用用户提供的真实图片。
Live 总览封面为 live0；详情顺序为 live6（宽幅）、live1／4、live2／3、live5／7、live8（宽幅）。
返回锚点设在列表节点，而非链接；返回后不显示目标高亮，键盘操作仍保留可见焦点。
清空 `events` 数组即可显示已翻译的空白状态。

## 检查

运行 `node --test tests/events.test.mjs` 检查排序、日期精度、同日节点、三语、时间轴链接、正文区块、安全转义、图片署名、图集去重及空状态。
另外执行 `npm run build`、`npm run lint`。

测试中的虚构数据均标注 DEVELOPMENT EXAMPLE，不被应用导入，不进入正式静态导出。
可指定 `EVENTS_PREVIEW_DIR` 环境变量，将有图／无图／长文及空状态测试页面输出到仓库外的临时目录。
测试会将已构建静态资源复制到临时目录；用 3003 端口提供该目录即可独立预览。
详情使用 /[locale]/events/[slug]/ 静态路由，`generateStaticParams` 为每个 slug 和三个语言预先生成 HTML。
例如总览 `/zh/events/`、详情 `/zh/events/hku-singing-contest-2025/`；直接访问和刷新不依赖客户端路由。
未知 slug 使用原有 404。静态预览服务器应关闭 SPA fallback（serve 的 `-s`），避免未知网址被根首页接管。
没有新增依赖、筛选器或部署设置。
