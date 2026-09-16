import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
const roots = ["packages", "scripts"];
const forbidden = [/\bfetch\s*\(/i, /\baxios\b/i, /\bwebsocket\b/i, /\bhttp:\/\//i, /\bhttps:\/\//i, /\blocalhost\b/i, /127\.0\.0\.1/, /\bnode:http\b/i, /\bnode:net\b/i, /\bnode:dgram\b/i];
async function files(dir) { const result = []; for (const entry of await readdir(dir, { withFileTypes: true })) { const path = join(dir, entry.name); if (entry.isDirectory()) result.push(...await files(path)); else if (/\.(ts|js|mjs|json)$/.test(path)) result.push(path); } return result; }
const all = (await Promise.all(roots.map(files))).flat(); const hits = []; for (const file of all) { const text = await readFile(file, "utf8"); for (const pattern of forbidden) if (pattern.test(text)) hits.push(`${file}: ${pattern}`); }
if (hits.length) { console.error(`Offline audit failed:\n${hits.join("\n")}`); process.exit(1); } console.log(`Offline audit passed: ${all.length} runtime/configuration files scanned.`);
