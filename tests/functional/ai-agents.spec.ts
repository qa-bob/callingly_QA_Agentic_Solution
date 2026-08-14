import { test, expect } from '@fixtures/site.fixture';
import { AIPage } from '@pages/ai.page';

test.describe('@functional AI Agents page (/ai)', () => {
  let aiPage: AIPage;

  test.beforeEach(async ({ page, siteConfig }) => {
    aiPage = new AIPage(page, siteConfig);
    await aiPage.navigateToAI();
  });

  test('AI page loads with Callingly in title @functional', async () => {
    const title = await aiPage.getTitle();
    expect(title.toLowerCase()).toContain('callingly');
  });

  test('page has a main heading @functional', async () => {
    await expect(aiPage.mainHeading).toBeVisible();
    const text = await aiPage.getHeadingText();
    expect(text.trim().length).toBeGreaterThan(0);
  });

  test('page has an AI agents section heading @functional', async () => {
    await expect(aiPage.aiAgentsHeading).toBeVisible();
  });

  test('page contains AI-related content @functional', async () => {
    const hasContent = await aiPage.hasAIContent();
    expect(hasContent).toBe(true);
  });

  test('CTA button is present on AI page @functional', async () => {
    const count = await aiPage.getCTACount();
    expect(count).toBeGreaterThan(0);
    // ctaButtons.first() may be a nav link hidden behind the hamburger on mobile
    await expect(aiPage.ctaButtons.first()).toBeAttached();
  });

  test('AI description mentions calling or SMS @functional', async () => {
    await expect(aiPage.aiDescription).toBeVisible();
  });
});
