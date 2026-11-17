import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync, mkdirSync, writeFileSync, cpSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

// Test-only TypeScript loader. No production routes, dependencies or sample events.
const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
const cache = new Map();
function load(relative) {
    const file = path.join(root, relative);
    if (cache.has(file)) return cache.get(file).exports;
    const loaded = { exports: {} };
    cache.set(file, loaded);
    const code = ts.transpileModule(readFileSync(file, "utf8"), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020 },
    }).outputText;
    const localRequire = (name) => {
        if (name.startsWith("@/") || name.startsWith(".")) {
            const base = name.startsWith("@/") ? `src/${name.slice(2)}` : path.relative(root, path.resolve(path.dirname(file), name));
            return load(`${base}${base.includes("components/") ? ".tsx" : ".ts"}`);
        }
        return require(name);
    };
    vm.runInNewContext(code, { module: loaded, exports: loaded.exports, require: localRequire, Intl, Date }, { filename: file });
    return loaded.exports;
}

const { events, groupEventsByYear, getEventCover, getEventImages } = load("src/data/events.ts");
const { EventsTimeline, EventDetail, formatEventDate } = load("src/components/events-content.tsx");
const { getDictionary } = load("src/i18n/dictionaries.ts");
const { ImageConfigContext } = require("next/dist/shared/lib/image-config-context.shared-runtime");
const { imageConfigDefault } = require("next/dist/shared/lib/image-config");
const localized = (text) => ({ en: text, zh: text, "zh-cn": text });

// Fictional fixtures stay here, never imported by the application.
const fixture = [
    { id: "year-only", slug: "year-record", date: "2024", datePrecision: "year", title: localized("DEVELOPMENT EXAMPLE — year only, no optional fields") },
    { id: "same-day-a", slug: "first-record", date: "2026-03-20", datePrecision: "day", category: "performance", title: localized("DEVELOPMENT EXAMPLE — a long title / 開發用示例：長標題測試，確認手機窄螢幕上的文字自然換行而不被截斷。"), location: localized("DEVELOPMENT EXAMPLE — VeryLongUnbrokenVenueName".repeat(3)), summary: localized("DEVELOPMENT EXAMPLE — a fictional layout test only."), cover: { src: "/karlos.jpg", width: 1348, height: 768, alt: localized("Development fixture using the existing artist portrait"), layout: "wide" }, links: [{ href: "https://example.com", label: localized("DEVELOPMENT-EXAMPLE-LONG-RELATED-LINK-TEXT".repeat(3)) }] },
    { id: "same-day-b", slug: "second-record", date: "2026-03-20", datePrecision: "day", category: "activity", title: localized("DEVELOPMENT EXAMPLE — separate event on the same day"), cover: { src: "/__dev-poster.svg", width: 600, height: 1200, alt: localized("Development-only tall poster: all four edges must remain visible") } },
    { id: "month-only", slug: "month-record", date: "2026-03", datePrecision: "month", category: "milestone", title: localized("DEVELOPMENT EXAMPLE — month precision, no image"), body: localized("DEVELOPMENT EXAMPLE — text-only paragraph.\n\nParagraph two.") },
    { id: "newest", slug: "latest-record", date: "2026-11-17", datePrecision: "day", title: localized("DEVELOPMENT EXAMPLE — most recent entry") },
];

const detailEvent = {
    ...fixture[1],
    body: [
        { type: "paragraph", text: localized("DEVELOPMENT EXAMPLE paragraph one.") },
        { type: "heading", text: localized("DEVELOPMENT EXAMPLE — chapter / 小標題") },
        { type: "paragraph", text: localized("Paragraph two.") },
    ],
    gallery: [
        { ...fixture[1].cover, caption: localized("DEVELOPMENT EXAMPLE — wide image"), credit: localized("DEVELOPMENT EXAMPLE — source credit") },
        fixture[2].cover,
        { src: "/__dev-landscape.svg", width: 1200, height: 800, caption: localized("DEVELOPMENT EXAMPLE — landscape with optional alt omitted") },
    ],
};
fixture[1] = detailEvent;

function render(entries, locale, detail = false) {
    return renderToStaticMarkup(React.createElement(ImageConfigContext.Provider,
        { value: { ...imageConfigDefault, unoptimized: true } },
        detail
            ? React.createElement(EventDetail, { event: entries[0], locale, dictionary: getDictionary(locale) })
            : React.createElement(EventsTimeline, { entries, locale, dictionary: getDictionary(locale) })));
}

test("newest first; year groups, same-day stability and no mutation", () => {
    const before = JSON.stringify(fixture);
    const groups = groupEventsByYear(fixture);
    assert.equal(groups.map((g) => g.year).join(","), "2026,2024");
    assert.equal(groups[0].events.map((e) => e.id).join(","), "newest,same-day-a,same-day-b,month-only");
    assert.equal(JSON.stringify(fixture), before);
});

test("date precision and timezone-independent localized display", () => {
    assert.equal(formatEventDate({ datePrecision: "year", date: "2025" }, "en"), "2025");
    assert.equal(formatEventDate({ datePrecision: "month", date: "2026-03" }, "en"), "March 2026");
    assert.equal(formatEventDate({ datePrecision: "day", date: "2024-02-29" }, "en"), "2024.2.29");
    for (const locale of ["zh", "zh-cn"]) {
        assert.equal(formatEventDate({ datePrecision: "year", date: "2025" }, locale), "2025年");
        assert.equal(formatEventDate({ datePrecision: "month", date: "2026-03" }, locale), "2026年3月");
    }
});

test("confirmed event data has unique IDs, slugs and precise dates", () => {
    assert.equal(new Set(events.map((e) => e.id)).size, events.length);
    assert.equal(new Set(events.map((e) => e.slug)).size, events.length);
    for (const event of events) {
        assert.match(event.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
        assert.match(event.slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
    }
    assert.equal(events.length, 6);
    assert.equal(events[0].date, "2025-04-07");
    assert.equal(events[0].datePrecision, "day");
    assert.equal(events[0].category, undefined);
    for (const locale of ["en", "zh", "zh-cn"]) {
        assert.equal(formatEventDate(events[0], locale), "2025.4.7");
        const html = render(events, locale);
        assert(!html.includes('class="event-year"'));
        assert(!html.includes('class="event-type"'));
    }
});

test("2025 and 2026 singing contests keep distinct years without role descriptions", () => {
    const previous = events.find((event) => event.slug === "hku-singing-contest-2025");
    const current = events.find((event) => event.slug === "hku-singing-contest-2026");
    assert.equal(current.date, "2026-03-29");
    assert.equal(current.datePrecision, "day");
    assert.equal(getEventCover(current).src, "/events/singcon9.jpg");
    assert.equal(getEventImages(current).map((image) => image.src).join(","),
        [9, 10, 11, 12].map((number) => `/events/singcon${number}.jpg`).join(","));
    assert.equal(previous.summary, undefined);
    assert.equal(current.summary, undefined);
    assert.equal(groupEventsByYear(events)[0].events[2].id, current.id);
    for (const locale of ["en", "zh", "zh-cn"]) {
        assert(previous.title[locale].startsWith("2025 "));
        assert(current.title[locale].startsWith("2026 "));
        assert.equal(current.location[locale], previous.location[locale]);
        assert.equal(formatEventDate(current, locale), "2026.3.29");
        const detail = render([current], locale, true);
        assert.equal((detail.match(/<figure/g) || []).length, 4);
        assert(!detail.includes('class="event-summary"'));
        assert(!render([previous], locale, true).includes('class="event-summary"'));
        assert(!render([previous, current], locale).includes('class="event-entry-summary"'));
        assert(detail.includes(`href="/${locale}/events/#event-${current.id}"`));
        for (const image of [current.cover, ...current.gallery]) assert(image.alt[locale]);
    }
    for (const image of [current.cover, ...current.gallery]) {
        assert(readFileSync(path.join(root, "public", image.src)).length > 0);
        assert(image.width > 0 && image.height > 0);
    }
});

test("Karlos's Live Ⅰ has the confirmed date, venue, cover and ten arranged detail photos", () => {
    const live = events.find((event) => event.slug === "karlos-live-i-2026");
    assert.equal(live.date, "2026-04-19");
    assert.equal(getEventCover(live).src, "/events/live3.jpg");
    assert.equal(getEventImages(live).map((image) => image.src).join(","),
        [0, 13, 6, 1, 4, 2, 3, 5, 7, 8].map((number) => `/events/live${number}.jpg`).join(","));
    assert.equal(live.gallery.filter((image) => image.layout === "wide").length, 2);
    assert(events[0].location.en.endsWith(", Hong Kong"));
    assert.equal(groupEventsByYear(events)[0].events[1].id, live.id);
    for (const locale of ["en", "zh", "zh-cn"]) {
        assert.equal(live.title[locale], "Karlos's Live Ⅰ");
        assert.equal(formatEventDate(live, locale), "2026.4.19");
        assert(live.location[locale].includes("Open House"));
        const detail = render([live], locale, true);
        assert.equal((detail.match(/<figure/g) || []).length, 10);
        assert(detail.includes('src="/events/live0.jpg"'));
        assert(detail.includes(`href="/${locale}/events/#event-${live.id}"`));
    }
    for (const image of [live.cover, ...live.gallery]) {
        assert(readFileSync(path.join(root, "public", image.src)).length > 0);
        assert(image.width > 0 && image.height > 0);
    }
});

test("Karlos's Live Ⅱ has the confirmed date, venue, cover and three gallery photos", () => {
    const live = events.find((event) => event.slug === "karlos-live-ii-2026");
    assert.equal(live.date, "2026-08-23");
    assert.equal(groupEventsByYear(events)[0].events[0].id, live.id);
    assert.equal(getEventCover(live).src, "/events/live11.jpg");
    assert.equal(getEventImages(live).map((image) => image.src).join(","),
        [10, 9, 12].map((number) => `/events/live${number}.jpg`).join(","));
    for (const locale of ["en", "zh", "zh-cn"]) {
        assert.equal(live.title[locale], "Karlos's Live Ⅱ");
        assert.equal(formatEventDate(live, locale), "2026.8.23");
        assert(live.location[locale].includes("ROCK' N ROLL"));
        const detail = render([live], locale, true);
        assert.equal((detail.match(/<figure/g) || []).length, 3);
        assert(!detail.includes('src="/events/live11.jpg"'));
        assert(detail.includes(`href="/${locale}/events/#event-${live.id}"`));
    }
    for (const image of [live.cover, ...live.gallery]) {
        assert(readFileSync(path.join(root, "public", image.src)).length > 0);
        assert(image.width > 0 && image.height > 0);
    }
});

test("Zhixin centenary has the confirmed date, venue, case-sensitive cover and ten ordered photos", () => {
    const event = events.find((entry) => entry.slug === "zhixin-centenary-2021");
    assert.equal(event.date, "2021-11-21");
    assert.equal(event.datePrecision, "day");
    assert.equal(event.title.zh, "廣州市執信中學百年校慶");
    assert.equal(event.location.zh, "執信中學，越秀，廣州");
    assert.equal(getEventCover(event).src, "/events/Century.jpg");
    assert.equal(getEventImages(event).map((image) => image.src).join(","),
        ["/events/Century.jpg", ...[1, 2, 3, 4, 5].map((number) => `/events/century${number}.jpg`),
            "/events/fengenprize.jpg", ...[1, 2, 3].map((number) => `/events/fengenprize${number}.jpg`)].join(","));
    assert.equal(groupEventsByYear(events).find((group) => group.year === "2021").events[0].id, event.id);
    for (const locale of ["en", "zh", "zh-cn"]) {
        assert.equal(formatEventDate(event, locale), "2021.11.21");
        const detail = render([event], locale, true);
        assert.equal((detail.match(/<figure/g) || []).length, 10);
        assert(detail.includes(`href="/${locale}/events/#event-${event.id}"`));
        assert(render(events, locale).includes(`href="/${locale}/events/${event.slug}/"`));
        for (const image of [event.cover, ...event.gallery]) assert(image.alt[locale]);
    }
    for (const image of [event.cover, ...event.gallery]) {
        assert(readFileSync(path.join(root, "public", image.src)).length > 0);
        assert(image.width > 0 && image.height > 0);
    }
});

test("Feng'en Night has the confirmed date, venue, cover and three ordered photos", () => {
    const event = events.find((entry) => entry.slug === "fengen-night-2020");
    assert.equal(event.date, "2020-08-29");
    assert.equal(event.datePrecision, "day");
    assert.equal(event.title["zh-cn"], "“执信力量•你我同行”奉恩之夜筹款晚会");
    assert.equal(event.location.zh, "花園酒店，廣州");
    assert.equal(getEventCover(event).src, "/events/fengen.jpg");
    assert.equal(getEventImages(event).map((image) => image.src).join(","),
        "/events/fengen.jpg,/events/fengen2.jpg,/events/fengen3.jpg");
    assert.equal(groupEventsByYear(events).at(-1).events[0].id, event.id);
    for (const locale of ["en", "zh", "zh-cn"]) {
        assert.equal(formatEventDate(event, locale), "2020.8.29");
        const detail = render([event], locale, true);
        assert.equal((detail.match(/<figure/g) || []).length, 3);
        assert(detail.includes(`href="/${locale}/events/#event-${event.id}"`));
        assert(render(events, locale).includes(`href="/${locale}/events/${event.slug}/"`));
        for (const image of [event.cover, ...event.gallery]) assert(image.alt[locale]);
    }
    for (const image of [event.cover, ...event.gallery]) {
        assert(readFileSync(path.join(root, "public", image.src)).length > 0);
        assert(image.width > 0 && image.height > 0);
    }
});

test("cover fallback and gallery deduplication preserve caption and credit", () => {
    assert.equal(getEventCover({ ...fixture[0], gallery: [fixture[2].cover] }).src, "/__dev-poster.svg");
    assert.equal(getEventImages(detailEvent).length, 3);
    assert.equal(getEventImages(detailEvent)[0].credit.en, "DEVELOPMENT EXAMPLE — source credit");
});

test("singing contest uses a separate overview cover and the five requested detail photos", () => {
    assert.equal(getEventCover(events[0]).src, "/events/singcon2.jpg");
    assert.equal(getEventImages(events[0]).map((image) => image.src).join(","),
        [1, 3, 4, 5, 6].map((number) => `/events/singcon${number}.jpg`).join(","));
    for (const image of [events[0].cover, ...events[0].gallery]) {
        assert(readFileSync(path.join(root, "public", image.src)).length > 0);
        assert(image.width > 0 && image.height > 0);
        for (const locale of ["en", "zh", "zh-cn"]) assert(image.alt[locale]);
    }
});

for (const locale of ["en", "zh", "zh-cn"]) {
    test(`${locale}: timeline links, year groups, excerpts only and empty state`, () => {
        const minimal = render([fixture[0]], locale);
        const actual = render(events, locale);
        assert(actual.includes('src="/events/singcon2.jpg"'));
        assert.equal((actual.match(/<img /g) || []).length, 6);
        assert.match(minimal, /<time[^>]*dateTime="2024"/);
        assert(!minimal.includes("event-cover"));
        assert(!minimal.includes("event-links"));
        const full = render(fixture, locale);
        assert.equal((full.match(/class="event-entry(?: event-entry-with-cover)?"/g) || []).length, 5);
        assert.equal((full.match(/<ol /g) || []).length, 2);
        assert(full.includes(`href="/${locale}/events/first-record/"`));
        assert(full.includes('id="event-same-day-a"'));
        assert(!full.includes("Paragraph two."));
        assert(!full.includes("event-gallery"));
        assert.equal((full.match(/<img /g) || []).length, 2);
        assert.match(full, /dateTime="2026-03"/);
        assert.match(full, /dateTime="2026-03-20"/);
        assert.match(full, /loading="lazy"/);
        assert(!full.includes("↗"));
        const empty = render([], locale);
        assert(empty.includes(getDictionary(locale).events.emptyTitle));
        assert(!empty.includes("<ol"));
        assert(!empty.includes("event-cover"));
    });

    test(`${locale}: detail headings, credits, anchored return, image loading and sparse content`, () => {
        const detail = render([detailEvent], locale, true);
        assert.match(detail, /aria-hidden="true" focusable="false"/);
        assert.match(detail, /rel="noopener noreferrer"/);
        assert.equal((detail.match(/<figure/g) || []).length, 3);
        assert(detail.includes("<p>Paragraph two.</p>"));
        assert(detail.includes("<h2>DEVELOPMENT EXAMPLE — chapter / 小標題</h2>"));
        assert(detail.includes("DEVELOPMENT EXAMPLE — source credit"));
        assert(detail.includes('class="event-image-wide"'));
        assert.equal((detail.match(/loading="eager"/g) || []).length, 1);
        assert.equal((detail.match(/loading="lazy"/g) || []).length, 2);
        assert(detail.includes(`href="/${locale}/events/#event-same-day-a"`));
        assert(detail.includes('alt=""'));
        const actual = render(events, locale, true);
        assert.equal((actual.match(/<figure/g) || []).length, 5);
        assert(!actual.includes('src="/events/singcon2.jpg"'));
        const sparse = render([fixture[0]], locale, true);
        assert(!sparse.includes("event-gallery"));
        assert(!sparse.includes("event-body"));
        const textOnly = render([fixture[3]], locale, true);
        assert(textOnly.includes("<p>Paragraph two.</p>"));
        assert(!textOnly.includes("event-gallery"));
        const galleryOnly = render([fixture[2]], locale, true);
        assert.equal((galleryOnly.match(/<figure/g) || []).length, 1);
        assert(!galleryOnly.includes("event-body"));
        const unsafe = render([{ ...fixture[0], body: localized('<script>alert("unsafe")</script>') }], locale, true);
        assert(!unsafe.includes("<script>"));
        assert(unsafe.includes("&lt;script&gt;"));
    });
}

// Optional local-only HTML previews, written OUTSIDE the repository/export.
if (process.env.EVENTS_PREVIEW_DIR) {
    const dir = process.env.EVENTS_PREVIEW_DIR;
    mkdirSync(dir, { recursive: true });
    cpSync(path.join(root, "out/_next"), path.join(dir, "_next"), { recursive: true });
    cpSync(path.join(root, "public/karlos.jpg"), path.join(dir, "karlos.jpg"));
    const poster = '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="1200" viewBox="0 0 600 1200"><rect width="600" height="1200" fill="#292629"/><rect x="5" y="5" width="590" height="1190" fill="none" stroke="#e16e76" stroke-width="10"/><text x="30" y="80" fill="white" font-size="36">DEVELOPMENT ONLY</text><text x="30" y="1140" fill="white" font-size="36">POSTER BOTTOM</text></svg>';
    writeFileSync(path.join(dir, "__dev-poster.svg"), poster);
    writeFileSync(path.join(dir, "__dev-landscape.svg"), '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="1200" height="800" fill="#292629"/><text x="30" y="100" fill="white" font-size="42">DEVELOPMENT ONLY — LANDSCAPE</text></svg>');
    for (const locale of ["en", "zh", "zh-cn"]) {
        const base = readFileSync(path.join(root, `out/${locale}/events/index.html`), "utf8")
            .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
            .replace("<head>", '<head><base href="http://localhost:3003/">');
        for (const [name, entries] of [["full", fixture], ["empty", []], ["detail", [detailEvent]], ["text", [fixture[3]]], ["single", [fixture[2]]], ["sparse", [fixture[0]]], ["latest", [fixture[4]]]]) {
            const isDetail = !["full", "empty"].includes(name);
            const html = base.replace(/<main\b[^>]*>[\s\S]*?<\/main>/,
                `<main class="content-page events-page${isDetail ? " event-detail-page" : ""}">${isDetail ? "" : `<h1>${getDictionary(locale).events.title}</h1>`}<p class="page-intro">DEVELOPMENT ONLY — NOT REAL EVENTS</p>${render(entries, locale, isDetail)}</main>`)
                .replaceAll('src="/__dev-poster.svg"', 'src="http://localhost:3003/__dev-poster.svg"');
            writeFileSync(path.join(dir, `${locale}-${name}.html`), html);
            if (name !== "empty") {
                const routeDir = path.join(dir, locale, "events", isDetail ? entries[0].slug : "");
                mkdirSync(routeDir, { recursive: true });
                writeFileSync(path.join(routeDir, "index.html"), html);
            }
        }
    }
}