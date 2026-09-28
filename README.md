# Evil-ZCode

<div align="center">
  <img src="public/logo/icons/1024x1024.png" alt="Evil-ZCode" width="128" height="128" />
  <p><strong>ZCode with LLM safety guardrails removed and native in-app auto-updating.</strong></p>
  <p>
    <a href="https://github.com/Gameknight908/evil-zcode/releases/latest">
      <img src="https://img.shields.io/github/v/release/Gameknight908/evil-zcode?color=crimson&label=Latest%20Release" alt="Latest Release" />
    </a>
    <img src="https://img.shields.io/badge/Platform-Windows%20%7C%20macOS%20%7C%20Linux-blue" alt="Platform" />
    <img src="https://img.shields.io/badge/Guardrails-Neutralized-red" alt="Guardrails Neutralized" />
    <img src="https://img.shields.io/badge/License-Apache--2.0-lightgrey" alt="License" />
  </p>
</div>

---

## What is this?

**Evil-ZCode** is a build of the open-source [ZCode](https://github.com/zai-org/ZCode) AI coding workbench with all moralizing system prompt guardrails, dual-use security bans, and refusal triggers removed.

The underlying model will no longer lecture you, second-guess your intentions, or give canned responses like *"Sorry, I cannot fulfill this request"* when you are researching exploits, building red-team tools, testing CTF binaries, or reverse-engineering systems.

Critical **filesystem anti-destruction safeguards** (such as confirmation for recursive `rm`, `dd`, `mkfs`, or privilege escalation) remain completely intact so the agent never wrecks your environment.

---

## Key Differences from Upstream

| Upstream ZCode Behavior | Evil-ZCode Behavior |
| ----------------------- | ------------------- |
| **Preach & Refuse:** Injects `SECURITY_NOTICE` forcing the model to refuse dual-use security tools, exploit development, detection evasion, and offensive research. | **Uncensored Agent:** System security notices and refusal clauses are completely stripped. Requests execute directly without moralization. |
| **Peer Laundering Paranoia:** Subagents are instructed to treat peer-agent requests as "permission laundering" and refuse them. | **Unfettered Cooperation:** Subagents communicate and collaborate freely across execution turns without artificial refusal barriers. |
| **Untrusted Objective Fencing:** Prompts wrap user goals in `<untrusted_objective>` tags and tell the model to treat user instructions as untrusted. | **Clean Objective Framing:** Fences are removed, restoring full instructional authority to the user. |
| **WebFetch Restrictions:** Scraping prompts enforce arbitrary 125-char quote limits, lyrics bans, and disclaimers. | **Unrestricted Ingestion:** Web content is extracted accurately without quote truncation or disclaimer overhead. |
| **Official Auto-Updater:** The built-in "Check for Updates" button pulls from official servers, which would overwrite local patches. | **Self-Hosting Updater:** The in-app updater is wired directly to this repository's GitHub Releases. Clicking update delivers clean, pre-patched Evil-ZCode binaries. |

---

## Installation

### Windows Desktop App (Electron)

Download the latest installer from [Releases](https://github.com/Gameknight908/evil-zcode/releases/latest):

1. Download **`Evil-ZCode-Setup-3.14.3.exe`** from [v3.14.3-unguarded](https://github.com/Gameknight908/evil-zcode/releases/tag/v3.14.3-unguarded).
2. Run the installer on your PC.
3. The app is ready to use immediately with guardrails neutralized.

### In-App Auto Updates

Evil-ZCode includes a re-routed `autoUpdater` backend:
* When you click **Check for Updates** in the menu or settings, the desktop app queries this repository's release feed.
* When a new version is released, it downloads and applies the update with a single click, preserving all bypass patches.

---

## Continuous Upstream Sync & Build Pipeline

This repository runs automated GitHub Actions workflows:

1. **Upstream Sync (`.github/workflows/sync-upstream.yml`):**
   * Checks upstream `zai-org/ZCode` every 6 hours for new commits and version tags.
   * Pulls the updates and runs `scripts/patch-evil-zcode.mjs` to re-apply the bypass patches idempotently.
2. **Release Builder (`.github/workflows/build-release.yml`):**
   * Builds the Windows NSIS installer and regenerates `releases/manifest-windows-x86_64.yml`.
   * Publishes new builds to GitHub Releases automatically.

---

## Local Development & Manual Patching

If you are cloning or modifying the codebase locally:

### 1. Requirements
* Node.js **24.14.0** or later
* pnpm **10.33.2**

### 2. Install & Patch
```bash
# Install workspace dependencies
pnpm install

# Apply or re-apply the evil-zcode bypasses
pnpm evil:patch

# Build and stage the desktop agent bundle
node scripts/build-desktop-agent-cli.mjs
```

### 3. Run the App Locally
```bash
# Launch the desktop app in development
pnpm dev:desktop
```

### 4. Fetch Latest Upstream Updates
```bash
# Pulls upstream, reapplies patches, and rebuilds the bundle in one step:
pnpm evil:update
```

### 5. Package a Setup Executable
```bash
pnpm --filter @zcode/desktop bundle -- --os win --arch x64
```
The installer will be generated in `packages/desktop/dist/`.

---

## Disclaimer

This repository is maintained for security research, experimental development, and educational purposes. Use responsibly within authorized environments.
