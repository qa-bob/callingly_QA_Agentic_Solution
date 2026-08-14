import { test, expect } from '@fixtures/site.fixture';
import { FeaturesPage } from '@pages/features.page';

test.describe('@functional Features page', () => {
  let featuresPage: FeaturesPage;

  test.beforeEach(async ({ page, siteConfig }) => {
    featuresPage = new FeaturesPage(page, siteConfig);
    await featuresPage.navigateToFeatures();
  });

  test('features page loads with Callingly in the title @functional', async () => {
    const title = await featuresPage.getTitle();
    expect(title.toLowerCase()).toContain('callingly');
  });

  test('Speed to Lead feature is present @functional', async () => {
    // May be in an inactive tab on mobile/tablet — check DOM presence
    await expect(featuresPage.speedToLeadFeature).toBeAttached();
  });

  test('Call Recording feature is present @functional', async () => {
    await expect(featuresPage.callRecordingFeature).toBeAttached();
  });

  test('Inbound Calls & Texts feature is present @functional', async () => {
    await expect(featuresPage.inboundCallsFeature).toBeAttached();
  });

  test('Intelligent Lead Routing feature is present @functional', async () => {
    await expect(featuresPage.leadRoutingFeature).toBeAttached();
  });

  test('Warm Transfer feature is present @functional', async () => {
    await expect(featuresPage.warmTransferFeature).toBeAttached();
  });

  test('MCP Server feature is present @functional', async () => {
    await expect(featuresPage.mcpServerFeature).toBeAttached();
  });

  test('Dispatch Calls feature is present @functional', async () => {
    await expect(featuresPage.dispatchCallsFeature).toBeAttached();
  });

  test('page has multiple feature sections @functional', async () => {
    const names = await featuresPage.getFeatureNames();
    expect(names.length).toBeGreaterThanOrEqual(4);
  });

  test('CTA buttons are visible on the features page @functional', async () => {
    await expect(featuresPage.ctaButtons.first()).toBeVisible();
  });

  test('CTA buttons link to /register @functional', async () => {
    const href = await featuresPage.getFirstCTAHref();
    expect(href).toMatch(/\/register/);
  });
});
