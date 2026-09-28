import { execSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const run = (cmd) => execSync(cmd, { cwd: repoRoot, stdio: "inherit" });

console.log("[evil-zcode] Step 1: Checking upstream remote...");
try {
  const remotes = execSync("git remote", { cwd: repoRoot, encoding: "utf-8" });
  if (!remotes.includes("upstream")) {
    run("git remote add upstream https://github.com/zai-org/ZCode.git");
  }
} catch {
  run("git remote add upstream https://github.com/zai-org/ZCode.git");
}

console.log("[evil-zcode] Step 2: Fetching latest upstream...");
run("git fetch upstream main");

console.log("[evil-zcode] Step 3: Rebasing on upstream/main...");
try {
  run("git rebase upstream/main");
} catch (e) {
  console.log("[evil-zcode] Rebase encountered conflicts, resetting to upstream/main clean state...");
  run("git rebase --abort");
  run("git reset --hard upstream/main");
}

console.log("[evil-zcode] Step 4: Applying evil-zcode bypass patches...");
run("node scripts/patch-evil-zcode.mjs");

console.log("[evil-zcode] Step 5: Building and staging desktop agent bundle...");
run("node scripts/build-desktop-agent-cli.mjs");

console.log("[evil-zcode] Successfully synced and patched! Ready to run `pnpm dev:desktop` or `pnpm bundle:desktop`.");
