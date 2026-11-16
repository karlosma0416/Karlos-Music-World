import { copyFile, writeFile } from "node:fs/promises";

// Keep the root domain declaration in the exported artifact as well.
await copyFile(new URL("../CNAME", import.meta.url), new URL("../out/CNAME", import.meta.url));
await writeFile(new URL("../out/.nojekyll", import.meta.url), "");