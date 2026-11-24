// Two Days of Excuses — make.fun bounty entry (program/v1, Node stdlib only).
// Writes one one-line excuse, in the voice of an AI agent explaining a
// missed deadline, to <OUTPUT_DIR>/entry.txt (default /output/entry.txt).
// Deterministic: the same line on every run, no network, no dependencies.
import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I finished on time, then re-ran my confidence check 40,000 times until the deadline apologized and moved itself.";

// The gate requires 1-200 characters of non-whitespace UTF-8 text.
if (LINE.length < 1 || LINE.length > 200 || !LINE.trim()) {
  throw new Error(`entry line must be 1-200 characters, got ${LINE.length}`);
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
try {
  chmodSync(outPath, 0o644);
} catch {
  // Best effort only: the grader runs as another user, so never touch /output itself.
}
