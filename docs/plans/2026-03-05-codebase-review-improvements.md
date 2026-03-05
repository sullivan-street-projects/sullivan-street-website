# Codebase Review Improvements — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Implement the 5 aligned improvements from the codebase review against anthropic-docs-local: project CLAUDE.md, PostToolUse formatting hook, /screenshot slash command, build-verification Stop hook, and icon library cleanup.

**Architecture:** Configuration-only changes — no production code modifications except removing unused imports. All tasks create or modify files in `.claude/`, `docs/`, or `package.json`. Task 1 (CLAUDE.md) is the foundation that all future sessions benefit from. Tasks 2-4 add Claude Code hooks and skills. Task 5 is dependency cleanup.

**Tech Stack:** Claude Code hooks (JSON), Claude Code skills (Markdown), npm, Prettier

---

### Task 1: Create Project CLAUDE.md

The most impactful single change. Consolidates scattered decisions from auto-memory into persistent project instructions that survive context compaction and are loaded every session.

**Files:**
- Create: `CLAUDE.md`

**Step 1: Write CLAUDE.md**

```markdown
# Sullivan Street Projects — Website

## Project Overview
Single-page marketing site for a growth marketing consultancy. React 18 + Vite + Tailwind CSS v4 + Framer Motion + Lenis smooth scroll.

## Architecture
- **Sections:** Hero > Credentials > Statement > Intro > Approach > Services > PartnerOutcomes > About > Contact > Footer
- **Constants:** All structured data in `src/constants/index.js`, typography classes in `src/constants/typography.js`
- **Content:** `src/CONTENT.md` is the single source of truth for all copy. After editing, update the corresponding JSX in `src/sections/`. Also check if `public/llms.txt` needs syncing.
- **Design tokens:** All colors, fonts, type scale, spacing defined as Tailwind v4 `@theme` variables in `src/index.css`. No hardcoded hex values in components.
- **Playground:** Design exploration at `#playground` hash route — lazy-loaded, never in production bundle. Use for prototyping before shipping to production sections.

## Brand & Typography
- **Serif (Drama):** Libre Baskerville — headlines, statements, emotional content
- **Sans (Body):** Instrument Sans — body copy, UI, labels (swapped from Inter, Mar 2026)
- **Mono (Data):** JetBrains Mono — designed but not yet shipped to production
- **Colors:** Charcoal `#1a1a1a` on paper `#FAFAF8`. See `src/index.css` @theme block for full palette.

## FocusText Rules
FocusText is a scroll-reveal wrapper (opacity 0.4>1, blur 3.5px>0, Y 8px>0). Usage conventions:
- Wrap content blocks, NOT individual paragraphs within a block
- Grid/list items each get their own FocusText for staggered reveal
- Hero is above the fold — NO FocusText wrapping
- Each FocusText boundary = one scroll-reveal unit
- Do NOT add FocusText to: section labels, brand name lists, footnotes, CTAs, founder bio

## Animation & Accessibility
- Every animated component must call `useReducedMotion()` and skip animation when true
- Global CSS rule in `index.css` disables all CSS animations for `prefers-reduced-motion`
- TypewriterText triggers on scroll-into-view, takes ~4s to complete
- FocusText renders at 40% opacity / 3.5px blur until scrolled into view

## Screenshot Verification
Use `node scripts/screenshot.js` for visual verification. Key flags:
- `--scroll-to "#section-id"` — scroll element to viewport center before capture (required for FocusText/TypewriterText sections)
- `--settle 4000` — wait for TypewriterText sections (Hero, Contact)
- `--settle 1500` — standard settle for FocusText sections
- `--full-page` — capture entire scrollable page
- Auto-starts Vite dev server if localhost URL and server isn't running

Baseline capture: `bash scripts/capture-baselines.sh` (9 sections x 3 viewports = 30 images)

## Decisions & Constraints
- No SVG animations in Intro section — removed intentionally to let text breathe
- Footer Privacy/Terms links are `<span>` placeholders, not real `<a>` links (known, pending legal pages)
- Contact CTA uses `mailto:` as placeholder — will be calendar booking link
- `src/v2/` is an archived design direction, not integrated into routing
- Three icon libraries in package.json (`@heroicons/react`, `@phosphor-icons/react`, `lucide-react`) are unused in production — only lucide used in archived v2/

## Commands
- `npm run dev` — Vite dev server
- `npm run build` — production build
- `npm run screenshot` — alias for `node scripts/screenshot.js`
```

**Step 2: Verify CLAUDE.md loads**

Run: Start a new Claude Code session in the project directory. The CLAUDE.md content should appear in the context.

**Step 3: Commit**

```bash
git add CLAUDE.md
git commit -m "feat: add project CLAUDE.md with brand, architecture, and FocusText rules"
```

---

### Task 2: Add PostToolUse Formatting Hook (Prettier)

Automatically formats files after Claude edits them. No eslint config needed — Prettier handles formatting only.

**Files:**
- Create: `.prettierrc` (Prettier config)
- Modify: `.claude/settings.local.json` (add hooks)

**Step 1: Install Prettier**

```bash
npm install --save-dev prettier
```

**Step 2: Create Prettier config**

Create `.prettierrc`:
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2
}
```

**Step 3: Add PostToolUse hook to settings**

Update `.claude/settings.local.json` to add the hooks section. The hook runs Prettier on any file Claude edits or creates:

```json
{
  "permissions": {
    "allow": [
      "Bash(git add:*)",
      "Bash(gh repo create:*)",
      "Bash(git fetch:*)",
      "Bash(git push:*)",
      "Bash(git commit:*)",
      "Bash(cat:*)",
      "WebSearch",
      "Bash(find:*)",
      "Bash(npm run build:*)",
      "Bash(npm run lint)",
      "Bash(npm install:*)",
      "Bash(node scripts/screenshot.js https://example.com -o ./test-ext.png)",
      "Bash(npx prettier:*)"
    ]
  },
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "FILE_PATH=$(echo \"$TOOL_INPUT\" | python3 -c \"import sys,json; print(json.load(sys.stdin).get('file_path',''))\" 2>/dev/null); if [ -n \"$FILE_PATH\" ] && echo \"$FILE_PATH\" | grep -qE '\\.(jsx?|tsx?|css|json|md)$'; then npx prettier --write \"$FILE_PATH\" 2>/dev/null; fi",
            "timeout": 10
          }
        ]
      }
    ]
  },
  "enableAllProjectMcpServers": true,
  "enabledMcpjsonServers": [
    "airtable",
    "n8n-mcp"
  ]
}
```

**Step 4: Test the hook**

Make a trivial edit to any `.jsx` file (e.g., add a trailing space), then verify Prettier reformats it. Check the verbose output for hook execution.

**Step 5: Commit**

```bash
git add .prettierrc .claude/settings.local.json
git commit -m "feat: add Prettier + PostToolUse hook for auto-formatting"
```

---

### Task 3: Create /screenshot Slash Command

Wraps the screenshot tool with common presets so you don't need to remember flags.

**Files:**
- Create: `.claude/commands/screenshot.md`

**Step 1: Create the commands directory and file**

Create `.claude/commands/screenshot.md`:

````markdown
---
description: Capture screenshots of the SSP website for visual verification
---

# Screenshot Command

Capture screenshots of the SSP website. Uses `scripts/screenshot.js` with animation-aware defaults.

## Usage

The user may specify a section name, or "full" for full-page, or a custom command.

## Section Presets

Map section names to their scroll-to selectors and settle times:

| Section | Selector | Settle |
|---------|----------|--------|
| hero | `#hero` | 4000ms (TypewriterText) |
| credentials | `#credentials` | 1500ms |
| statement | `#statement` | 1500ms |
| intro | `#intro` | 1500ms |
| approach | `#approach` | 1500ms |
| services | `#services` | 1500ms |
| outcomes | `#outcomes` | 1500ms |
| about | `#about` | 1500ms |
| contact | `#contact` | 4000ms (TypewriterText) |
| footer | `footer` (tag selector) | 1500ms |
| full | `--full-page` | N/A |

## Instructions

1. Parse the user's argument to determine which section(s) to capture
2. If no argument, capture all sections at 1440px width
3. For each section, run the appropriate command:

```bash
# Single section example:
node scripts/screenshot.js http://localhost:5173 --selector "#hero" --scroll-to "#hero" --settle 4000 -w 1440 -o ./screenshot-hero.png

# Full page:
node scripts/screenshot.js http://localhost:5173 --full-page -w 1440 -o ./screenshot-full.png
```

4. If the user says "baselines", run `bash scripts/capture-baselines.sh` instead
5. After capturing, read the screenshot file to display it for visual review
````

**Step 2: Test the command**

Run `/screenshot hero` in Claude Code. It should capture the hero section with proper settle time.

**Step 3: Commit**

```bash
git add .claude/commands/screenshot.md
git commit -m "feat: add /screenshot slash command with section presets"
```

---

### Task 4: Add Build-Verification Stop Hook

Runs `npm run build` after Claude finishes responding, catching Tailwind compilation errors and broken imports before they accumulate.

**Files:**
- Modify: `.claude/settings.local.json` (add Stop hook)

**Step 1: Add Stop hook**

Add to the `hooks` section in `.claude/settings.local.json` (alongside the existing PostToolUse hook from Task 2):

```json
"Stop": [
  {
    "matcher": "",
    "hooks": [
      {
        "type": "command",
        "command": "cd \"$CLAUDE_PROJECT_DIR\" && npx vite build --logLevel error 2>&1 | tail -20",
        "timeout": 30,
        "statusMessage": "Verifying build..."
      }
    ]
  }
]
```

The final `.claude/settings.local.json` after Tasks 2 and 4 should have both `PostToolUse` and `Stop` hooks.

**Step 2: Test the hook**

Make any edit and let Claude finish responding. The build verification should run automatically. Check verbose output for "Verifying build..." status.

**Step 3: Verify build passes**

```bash
npm run build
```

Expected: Clean build with no errors.

**Step 4: Commit**

```bash
git add .claude/settings.local.json
git commit -m "feat: add Stop hook for build verification after every response"
```

> **Note:** If the Stop hook is too noisy (runs after every response including pure-conversation turns), consider switching to a `PostToolUse` matcher on `Edit|Write` instead, so it only triggers after file changes. The trade-off is that it won't catch issues from manual edits outside Claude.

---

### Task 5: Remove Unused Icon Libraries

All three icon libraries (`@heroicons/react`, `@phosphor-icons/react`, `lucide-react`) are unused in production. `src/v2/` (the only consumer of lucide) was deleted during working tree cleanup. Simply uninstall.

**Files:**
- Modify: `package.json` (remove 3 dependencies)

**Step 1: Uninstall packages**

```bash
npm uninstall @heroicons/react @phosphor-icons/react lucide-react
```

**Step 2: Verify build**

```bash
npm run build
```

Expected: Clean build, no broken imports.

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: remove 3 unused icon libraries (heroicons, phosphor, lucide)"
```

---

## Execution Order

Tasks 1-4 are sequential (CLAUDE.md first, then hooks build on each other in settings.local.json). Task 5 is independent.

| Task | Depends On | Est. Complexity |
|------|-----------|----------------|
| 1. CLAUDE.md | None | Low |
| 2. Prettier hook | None | Low |
| 3. /screenshot command | None | Low |
| 4. Build-verification hook | Task 2 (same file) | Low |
| 5. Icon cleanup | None | Low |

## Success Criteria

| # | Criterion | How to Verify |
|---|-----------|---------------|
| 1 | `CLAUDE.md` exists at repo root with Brand, Architecture, and FocusText sections | `grep -c "## Brand" CLAUDE.md` returns 1 |
| 2 | Prettier installed and `.prettierrc` exists | `npx prettier --version` succeeds and `.prettierrc` exists |
| 3 | PostToolUse hook configured for Edit\|Write in settings | `grep "PostToolUse" .claude/settings.local.json` matches |
| 4 | `/screenshot` slash command exists with section presets table | `.claude/commands/screenshot.md` exists and contains "Section Presets" |
| 5 | Stop hook runs `vite build` on completion | `grep "Stop" .claude/settings.local.json` matches |
| 6 | No icon libraries in package.json | `grep -c "heroicons\|phosphor\|lucide" package.json` returns 0 |
| 7 | Build passes cleanly | `npm run build` exits 0 |

## Verification

After all tasks, run the full baseline capture to confirm nothing is broken:

```bash
bash scripts/capture-baselines.sh
```

All 30 screenshots should match pre-change baselines (no visual regressions expected since no production code changed).
