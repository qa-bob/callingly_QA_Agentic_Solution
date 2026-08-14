## Description

<!-- What does this PR change? Which pages, tests, or page objects are affected? -->

## Type of change

- [ ] New test(s)
- [ ] New page object
- [ ] Bug fix — broken test or incorrect selector
- [ ] Refactor — no behavior change
- [ ] Baseline update — visual snapshots refreshed
- [ ] Documentation

## Test coverage

**Tags affected:** `@smoke` / `@navigation` / `@forms` / `@functional` / `@visual` / `@responsive` / `@regression`

**Files changed:**

- `src/pages/`
- `tests/`

## Checklist

- [ ] `npm run typecheck` passes — zero TypeScript errors
- [ ] `npm run test:smoke` passes locally
- [ ] Every new test has at least one suite tag
- [ ] New page objects are registered in `src/fixtures/site.fixture.ts`
- [ ] No hardcoded URLs — navigation uses `baseURL` or page object `navigate()`
- [ ] No form submissions
- [ ] No `page.waitForTimeout()` calls
- [ ] Visual baselines updated if needed — `npm run baseline`

## Notes for reviewer

<!-- Anything the reviewer should know: tricky selectors, site quirks, known flakiness, etc. -->
