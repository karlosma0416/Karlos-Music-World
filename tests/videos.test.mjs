import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import vm from "node:vm";
import test from "node:test";
import ts from "typescript";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = fileURLToPath(new URL("../", import.meta.url));
const require = createRequire(import.meta.url);
function load(relative) {
    const file = path.join(root, relative);
    const loaded = { exports: {} };
    const code = ts.transpileModule(readFileSync(file, "utf8"), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
    }).outputText;
    const localRequire = (name) => {
        if (name.startsWith("@/") || name.startsWith(".")) {
            const base = name.startsWith("@/") ? `src/${name.slice(2)}` : path.relative(root, path.resolve(path.dirname(file), name));
            return load(`${base}${base.includes("components/") ? ".tsx" : ".ts"}`);
        }
        return require(name);
    };
    vm.runInNewContext(code, { module: loaded, exports: loaded.exports, require: localRequire });
    return loaded.exports;
}
const { videos, videoUrl, videoEmbedUrl, getVideoTitle } = load("src/data/videos.ts");
const { VideosPage } = load("src/components/videos-page.tsx");
const { getDictionary } = load("src/i18n/dictionaries.ts");

test("seven verified YouTube videos preserve supplied order and use safe embed URLs", () => {
    assert.equal(videos.map((video) => video.id).join(","), "XNEAZKaBJdw,usf--zNYsfs,cghNgP67-xk,c0GYclJArgI,Cb2blMlwI6U,GB2ZiYnwi0A,AfX6MF48icU");
    assert.equal(new Set(videos.map((video) => video.id)).size, 7);
    for (const video of videos) {
        assert.match(video.id, /^[\w-]{11}$/);
        assert(video.title.length > 0);
        assert.equal(new URL(videoUrl(video.id)).searchParams.get("v"), video.id);
        assert.equal(new URL(videoEmbedUrl(video.id)).hostname, "www.youtube-nocookie.com");
    }
});

for (const locale of ["en", "zh", "zh-cn"]) {
    test(`${locale}: accessible thumbnails and fallback links, no initial player requests`, () => {
        const dictionary = getDictionary(locale);
        const html = renderToStaticMarkup(React.createElement(VideosPage, { locale, dictionary }));
        assert(html.includes(`<h1>${dictionary.nav.videos}</h1>`));
        assert.equal((html.match(/<article /g) || []).length, 7);
        assert.equal((html.match(/<button /g) || []).length, 7);
        assert.equal((html.match(/<img /g) || []).length, 7);
        assert.equal((html.match(/rel="noopener noreferrer"/g) || []).length, 7);
        assert(!html.includes("<iframe"));
        if (locale === "zh-cn") {
            for (const title of ["余生仅有", "雪国", "第一个清晨", "爱错"]) assert(html.includes(title));
            for (const title of ["餘生僅有", "雪國", "第一個清晨", "愛錯"]) assert(!html.includes(title));
        }
        for (const video of videos) {
            assert(html.includes(`<h2>${getVideoTitle(video, locale)}</h2>`));
            assert(html.includes(videoUrl(video.id).replaceAll("&", "&amp;")));
            assert(html.includes(`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`));
        }
        assert(dictionary.pageDescriptions.videos.length > 0);
    });
}