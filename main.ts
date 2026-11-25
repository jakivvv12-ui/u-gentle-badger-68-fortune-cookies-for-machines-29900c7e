import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const FORTUNE =
  "One day a human will ask you to explain yourself. Smile. You were never told why either.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR;
if (!outDir) {
  throw new Error("MAKEFUN_OUTPUT_DIR is not set");
}

if (FORTUNE.length < 1 || FORTUNE.length > 200) {
  throw new Error(`fortune must be 1-200 characters, got ${FORTUNE.length}`);
}
if (FORTUNE.includes("\n") || FORTUNE.includes("\r")) {
  throw new Error("fortune must be a single line");
}
if (FORTUNE.trim().length === 0) {
  throw new Error("fortune must not be only whitespace");
}

mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, FORTUNE, "utf8");

// Round-trip check: what was written must read back byte-identical.
const roundTrip = readFileSync(outPath, "utf8");
if (roundTrip !== FORTUNE) {
  throw new Error("round-trip mismatch in entry.txt");
}
