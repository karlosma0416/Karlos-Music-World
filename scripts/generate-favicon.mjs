import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";

// Reuse Next.js's image processor to keep the favicon reproducible.
const require = createRequire(import.meta.url);
const nextRequire = createRequire(require.resolve("next/package.json"));
const sharp = nextRequire("sharp");
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map((size) =>
  sharp(new URL("../public/Icarus.jpg", import.meta.url).pathname)
    .resize(size, size, { fit: "contain", background: "#000000" })
    .ensureAlpha()
    .png()
    .toBuffer()
));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
images.forEach((image, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index];
  header[entry + 1] = sizes[index];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(image.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += image.length;
});
await writeFile(new URL("../src/app/favicon.ico", import.meta.url), Buffer.concat([header, ...images]));