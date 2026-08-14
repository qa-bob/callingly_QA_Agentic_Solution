import { test, expect } from '@fixtures/site.fixture';

/**
 * Content regression — verifies specific text values and page structure that
 * should remain stable across Callingly site updates. Failures here indicate
 * an intentional or unintentional site change that needs human review.
 */

test.describe('@regression Homepage content regression', () => {
  test('site title includes "Callingly" @regression', async ({ homePage }) => {
    const title = await homePage.getTitle();
    expect(title).toContain('Callingly');
  });

  test('site title references AI, call, or SMS @regression', async ({ homePage }) => {
    const title = await homePage.getTitle();
    expect(title.toLowerCase()).toMatch(/ai|call|sms/);
  });

  test('homepage H1 contains brand tagline @regression', async ({ homePage }) => {
    const h1 = homePage.page.getByRole('heading', { level: 1 }).first();
    await expect(h1).toContainText(/less dialing|more closing/i);
  });

  test('"Start Free 14 Day Trial" CTA copy is intact @regression', async ({ homePage }) => {
    const cta = homePage.page.getByRole('link', { name: /start free.*trial/i }).first();
    await expect(cta).toContainText(/trial/i);
  });

  test('"no credit card" claim is present near trial CTA @regression', async ({ homePage }) => {
    const noCCClaim = homePage.page.getByText(/no credit card/i).first();
    await expect(noCCClaim).toBeVisible();
  });
});

test.describe('@regression Navigation structure regression', () => {
  test('Pricing nav link is present @regression', async ({ homePage }) => {
    await expect(
      homePage.page.getByRole('link', { name: /^pricing$/i }).first()
    ).toBeVisible();
  });

  test('Integrations nav link is present @regression', async ({ homePage }) => {
    await expect(
      homePage.page.getByRole('link', { name: /^integrations$/i }).first()
    ).toBeVisible();
  });

  test('Login nav link is present @regression', async ({ homePage }) => {
    await expect(
      homePage.page.getByRole('link', { name: /^login$/i }).first()
    ).toBeVisible();
  });

  test('"Why Callingly?" nav item is present @regression', async ({ homePage }) => {
    const item = homePage.page
      .getByText(/why callingly\?/i)
      .or(homePage.page.getByRole('button', { name: /why callingly/i }));
    await expect(item.first()).toBeVisible();
  });

  test('"Who We Serve" nav item is present @regression', async ({ homePage }) => {
    const item = homePage.page
      .getByText(/who we serve/i)
      .or(homePage.page.getByRole('button', { name: /who we serve/i }));
    await expect(item.first()).toBeVisible();
  });
});

test.describe('@regression Footer links regression', () => {
  test('footer contains Terms of Service link @regression', async ({ homePage }) => {
    await expect(
      homePage.page.locator('footer').getByRole('link', { name: /terms of service/i })
    ).toBeVisible();
  });

  test('footer contains Privacy Policy link @regression', async ({ homePage }) => {
    await expect(
      homePage.page.locator('footer').getByRole('link', { name: /privacy policy/i })
    ).toBeVisible();
  });

  test('footer contains Contact Us link @regression', async ({ homePage }) => {
    await expect(
      homePage.page.locator('footer').getByRole('link', { name: /contact/i })
    ).toBeVisible();
  });

  test('footer contains Pricing link @regression', async ({ homePage }) => {
    await expect(
      homePage.page.locator('footer').getByRole('link', { name: /pricing/i })
    ).toBeVisible();
  });

  test('footer contains Integrations link @regression', async ({ homePage }) => {
    await expect(
      homePage.page.locator('footer').getByRole('link', { name: /integrations/i })
    ).toBeVisible();
  });

  test('footer contains Blog link @regression', async ({ homePage }) => {
    await expect(
      homePage.page.locator('footer').getByRole('link', { name: /blog/i })
    ).toBeVisible();
  });
});
