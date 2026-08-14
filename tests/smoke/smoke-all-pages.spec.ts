import { test, expect } from '@fixtures/site.fixture';

/**
 * Multi-page smoke tests — verifies every major Callingly page loads with
 * HTTP 2xx and contains the Callingly brand in the page title.
 */

const PAGES = [
  { name: 'Homepage', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Features', path: '/features' },
  { name: 'Integrations', path: '/integrations' },
  { name: 'AI Agents', path: '/ai' },
  { name: 'Contact', path: '/contact' },
  { name: 'Login', path: '/login' },
  { name: 'Blog', path: '/blog' },
  { name: 'Privacy Policy', path: '/privacy-policy' },
  { name: 'Terms of Service', path: '/terms-of-service' },
] as const;

for (const { name, path } of PAGES) {
  test(`${name} page loads successfully @smoke`, async ({ page, siteConfig }) => {
    const response = await page.goto(`${siteConfig.url}${path}`);
    expect(response?.status()).toBeLessThan(400);
    await expect(page).toHaveTitle(/callingly/i);
  });
}

test.describe('@smoke Industry pages load', () => {
  const industries = [
    { name: 'Real Estate', path: '/industries/real-estate/' },
    { name: 'Mortgage', path: '/industries/mortgage/' },
    { name: 'Insurance', path: '/industries/insurance/' },
    { name: 'Home Services', path: '/industries/home-services/' },
    { name: 'Auto', path: '/industries/auto/' },
  ];

  for (const { name, path } of industries) {
    test(`${name} industry page loads @smoke`, async ({ page, siteConfig }) => {
      const response = await page.goto(`${siteConfig.url}${path}`);
      expect(response?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(/callingly/i);
    });
  }
});

test.describe('@smoke Benefit pages load', () => {
  const benefits = [
    { name: 'Speed to Lead', path: '/benefits/speed-to-lead/' },
    { name: 'Inbound Calls', path: '/benefits/inbound-calls-and-texts/' },
    { name: 'Lead Routing', path: '/benefits/intelligent-lead-routing/' },
    { name: 'Sales Performance', path: '/benefits/sales-performance-management/' },
  ];

  for (const { name, path } of benefits) {
    test(`${name} benefit page loads @smoke`, async ({ page, siteConfig }) => {
      const response = await page.goto(`${siteConfig.url}${path}`);
      expect(response?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(/callingly/i);
    });
  }
});
