# Agents

Documentation for all AI agents and automated workflows configured in this repository.

---

## Claude Code Agent

This repository is initialized for **Claude Code** agentic execution. Claude Code reads `CLAUDE.md` at session start and can autonomously:

- Fetch the live Callingly site to discover pages, forms, and elements
- Generate Page Object Model classes from live site HTML
- Write and maintain Playwright tests
- Run test suites and interpret results
- Update visual regression baselines
- Review code for POM compliance and TypeScript correctness

### Configuration Files

| File | Purpose |
|------|---------|
| `CLAUDE.md` | Primary project instructions — loaded at every Claude Code session |
| `.claude/settings.json` | Permissions, hooks, and environment variables |
| `.claude/rules/testing.md` | Test file rules (path-scoped to `tests/**`) |
| `.claude/rules/code-style.md` | TypeScript and naming rules (path-scoped to `src/**`, `tests/**`) |
| `.claude/rules/pom-architecture.md` | Page object model rules (path-scoped to `src/pages/**`) |
| `.claude/commands/` | Slash command definitions |
| `.claude/agents/` | Subagent definitions |
| `.claude/hooks/` | Lifecycle automation scripts |

### Slash Commands

| Command | File | Description |
|---------|------|-------------|
| `/generate-full-suite` | `.claude/commands/generate-full-suite.md` | Analyze site and generate complete POM + tests |
| `/analyze-site` | `.claude/commands/analyze-site.md` | Inspect live site and report structure |
| `/run-smoke` | `.claude/commands/run-smoke.md` | Run smoke tests and produce readable summary |
| `/update-baseline` | `.claude/commands/update-baseline.md` | Refresh visual regression baselines |
| `/generate-report` | `.claude/commands/generate-report.md` | Format and display latest test results |

### Subagents

| Agent | File | Role |
|-------|------|------|
| Site Analyzer | `.claude/agents/site-analyzer.md` | Crawls the live site to discover pages, forms, and elements |
| Test Generator | `.claude/agents/test-generator.md` | Generates POM classes and test files from site analysis output |

---

## GitHub Actions Agents

### Claude Code Action (`claude.yml`)

Responds to `@claude` mentions in GitHub Issues and Pull Requests.

**Trigger:** Post a comment containing `@claude <your request>` on any issue or PR.

**What Claude can do:**
- Review test code and suggest selector improvements
- Explain test failures by reading error output in the thread
- Generate new page objects or tests on request
- Update documentation

**Required secret:** `ANTHROPIC_API_KEY` in repository settings.

---

### Automated Code Review (`claude-review.yml`)

Runs automatically on every Pull Request targeting `main`.

**What Claude checks:**
- POM architecture compliance — no `expect()` in page objects, no raw `page.locator()` calls in test bodies
- TypeScript strict-mode compliance — no untyped `any`, all properties typed
- Test tagging — every test must carry at least one tag
- Playwright best practices — no `waitForTimeout`, proper auto-waiting strategies
- No hardcoded base URLs — all navigation through config or page object `navigate()`
- No form submissions

Claude posts inline comments on specific lines where violations are found.

---

### Playwright CI (`playwright.yml`)

Runs the Playwright test suite automatically on every push and pull request.

**On push to `main`:** Smoke tests only (fast feedback).

**On PR to `main`:** Full suite across three projects — `chromium-desktop`, `mobile-chrome`, `tablet`.

**Artifacts:** HTML test report uploaded on every run, retained for 30 days.

---

## Agent Rules

All agents — Claude Code, GitHub Actions, or subagents — must follow these rules:

| Rule | Reason |
|------|--------|
| Read `site.config.json` first | Always get the target URL from config, not hardcoded values |
| `WebFetch` the live site before writing selectors | Selectors must match actual HTML, not assumptions |
| Never submit forms | Tests must be non-destructive |
| Never create accounts | No auth flows unless `auth.required: true` in config |
| Follow POM architecture | All page interactions through page objects |
| Run `npx tsc --noEmit` before completing tasks | TypeScript must compile cleanly |
| Tag all tests | Every test needs at least one suite tag |

---

## Adding New Agents

### Subagent

1. Create a markdown file in `.claude/agents/`
2. Define: role, inputs, outputs, step-by-step instructions
3. Reference from a slash command in `.claude/commands/` or from `CLAUDE.md`
4. Add a row to the Subagents table above

### GitHub Actions Workflow

1. Create a `.yml` file in `.github/workflows/`
2. Follow the patterns in `claude.yml`, `claude-review.yml`, or `playwright.yml`
3. Add `ANTHROPIC_API_KEY` to repo secrets if the workflow calls Claude
4. Document the workflow in this file

---

## AGENTS.md and CLAUDE.md Relationship

`CLAUDE.md` is the authoritative instruction file for Claude Code — it is loaded first and takes highest precedence. This `AGENTS.md` file serves as human-readable documentation of the agents and automation configured in the project. When another agent framework references `AGENTS.md`, add a line to `CLAUDE.md` importing it:

```markdown
@AGENTS.md
```
