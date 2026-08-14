import { test, expect } from '@fixtures/site.fixture';
import { IntegrationsPage } from '@pages/integrations.page';

test.describe('@functional Integrations page', () => {
  let integrationsPage: IntegrationsPage;

  test.beforeEach(async ({ page, siteConfig }) => {
    integrationsPage = new IntegrationsPage(page, siteConfig);
    await integrationsPage.navigateToIntegrations();
  });

  test('integrations page loads with Callingly in title @functional', async () => {
    const title = await integrationsPage.getTitle();
    expect(title.toLowerCase()).toContain('callingly');
  });

  test('page has an integrations heading @functional', async () => {
    await expect(integrationsPage.pageHeading).toBeVisible();
  });

  test('HubSpot integration is present @functional', async () => {
    await expect(integrationsPage.hubspotLogo).toBeVisible();
  });

  test('Salesforce integration is present @functional', async () => {
    await expect(integrationsPage.salesforceLogo).toBeVisible();
  });

  test('Zapier integration is present @functional', async () => {
    await expect(integrationsPage.zapierLogo).toBeVisible();
  });

  test('more than 5 integration images are present @functional', async () => {
    const count = await integrationsPage.getIntegrationCount();
    expect(count).toBeGreaterThan(5);
  });

  test('integration images have non-empty alt text @functional', async () => {
    const names = await integrationsPage.getIntegrationNames();
    expect(names.length).toBeGreaterThan(0);
    names.forEach(name => expect(name.length).toBeGreaterThan(0));
  });
});
