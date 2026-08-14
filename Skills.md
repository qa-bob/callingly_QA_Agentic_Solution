# Skills

All Claude Code skills (slash commands) available in this repository. Skills are defined as markdown files in `.claude/commands/` and invoked with `/skill-name` in any Claude Code session.

---

## `/generate-full-suite`

**File:** `.claude/commands/generate-full-suite.md`

Performs a complete, ground-up analysis of the Callingly site and generates the full Playwright test suite.

**Steps:**
1. Reads `site.config.json` for the target URL and flags
2. Fetches the live site to discover all pages, navigation, forms, and interactive elements
3. Generates Page Object Model classes for every discovered page (extends `BasePage`)
4. Writes smoke tests for site availability
5. Writes navigation tests for all links and menus
6. Writes form tests for every form (no submission — field interaction and validation only)
7. Writes functional tests for key business features (pricing, AI agents, integrations)
8. Writes visual regression tests for desktop, mobile, and tablet viewports
9. Writes responsive layout tests for all three breakpoints
10. Runs `npx tsc --noEmit` to confirm TypeScript compiles cleanly

**When to use:** Initial project setup or after a major site redesign.

**Output:** Complete `src/pages/` and `tests/` directory, ready to run.

---

## `/analyze-site`

**File:** `.claude/commands/analyze-site.md`

Inspects the live Callingly site and produces a structured report — no files written.

**What it reports:**
- All page URLs discovered via nav links and sitemap
- Navigation structure (primary nav, dropdowns, footer links)
- Forms and their fields (type, label, placeholder, required status)
- CTA buttons and interactive elements
- External links and embedded media
- Recommended test priorities and coverage gaps

**When to use:** Before writing new tests, or to audit what's missing in current coverage.

**Output:** Markdown report in the conversation.

---

## `/run-smoke`

**File:** `.claude/commands/run-smoke.md`

Runs the `@smoke` test suite and produces a human-readable summary.

**Steps:**
1. Runs `npm run test:smoke`
2. Reads the JSON test report from `test-results/results.json`
3. Produces a summary with:
   - Pass/fail status per test
   - Load time measurements
   - Console errors detected
   - Actionable next steps for any failures

**When to use:** Quick site health check after deployments or site changes.

**Output:** Formatted summary in the conversation.

---

## `/update-baseline`

**File:** `.claude/commands/update-baseline.md`

Refreshes visual regression snapshot baselines after intentional visual changes.

**Steps:**
1. Runs `npm run baseline` (visual tests with `--update-snapshots`)
2. Reports which snapshot files were created or updated
3. Lists the files that should be committed to source control
4. Warns about any snapshots that differ significantly (may indicate an unintended change)

**When to use:** After the Callingly team ships a visual redesign or intentional UI change.

**Output:** List of updated snapshot files and git commit guidance.

---

## `/generate-report`

**File:** `.claude/commands/generate-report.md`

Reads the latest Playwright report and generates a formatted markdown summary.

**What it includes:**
- Total pass/fail/skip counts broken down by suite tag
- Failed test details with error messages and file/line references
- Slowest 5 tests by duration
- Visual diff count (if any visual tests ran)
- Recommended actions for failures

**When to use:** After running the full test suite to get a concise, readable summary.

**Output:** Formatted markdown report in the conversation.

---

## Creating New Skills

To add a skill to this project:

1. Create a `.md` file in `.claude/commands/` using verb-noun naming:
   - `check-accessibility.md` → `/check-accessibility`
   - `audit-links.md` → `/audit-links`
   - `test-industry-pages.md` → `/test-industry-pages`

2. Write the skill body: what to read, what commands to run, what to output

3. Invoke it with `/skill-name` in any Claude Code session

4. Register it in this file and in `AGENTS.md`

### Skill file template

```markdown
# /skill-name

Brief one-line description of what this skill does.

## Steps

1. Read `site.config.json` for the target URL
2. [What to fetch or inspect]
3. [What commands to run]
4. [What to output]

## Output

[Describe what the skill returns or creates]
```

---

## Skill vs. Memory vs. CLAUDE.md

| Mechanism | Purpose | Persistence |
|-----------|---------|-------------|
| `CLAUDE.md` | Always-on project rules and architecture | Loaded at every session |
| `.claude/rules/` | Path-scoped coding rules | Loaded when matching files are open |
| `Skills.md` / `.claude/commands/` | On-demand task automation | Loaded only when skill is invoked |
| `.claude/memory/` | Auto-learned facts from past sessions | First 200 lines loaded at session start |

Skills are the right tool when the task is too large or repetitive for inline instructions — wrap it in a skill so any contributor can invoke it consistently.
