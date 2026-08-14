---
name: Bug report
about: A test is failing, producing incorrect results, or a selector is broken
title: '[BUG] '
labels: bug
assignees: ''
---

## Describe the bug

<!-- What is failing? What did you expect to happen vs. what actually happened? -->

## Test file and test name

- **File:** `tests/.../...spec.ts`
- **Test:**

## Steps to reproduce

```bash
npm run test:smoke     # or whichever suite
# or
npx playwright test tests/path/to/file.spec.ts --headed
```

## Error output

<!-- Paste the Playwright error or screenshot here -->

```
Error: ...
  at ...
```

## Environment

- Node version: (`node --version`)
- Playwright version: (`npx playwright --version`)
- Browser:
- OS:
- Site URL tested: `https://callingly.com`

## Root cause hypothesis

- [ ] Selector changed — the site HTML changed and the locator no longer matches
- [ ] Timing issue — the element exists but the test is racing
- [ ] Site outage — the page didn't load
- [ ] Test logic bug — the assertion or test flow is incorrect
- [ ] Other

## Additional context

<!-- Is this a selector issue caused by a site change? A timing problem? A CI-only failure? -->
