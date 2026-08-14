import { test, expect } from '@fixtures/site.fixture';

test.describe('@functional Homepage — Hero and key sections', () => {
  test('hero headline contains brand tagline @functional', async ({ homePage }) => {
    const h1 = homePage.page.getByRole('heading', { level: 1 }).first();
    await expect(h1).toContainText(/less dialing|more closing/i);
  });

  test('"Start Free 14 Day Trial" CTA is visible @functional', async ({ homePage }) => {
    const cta = homePage.page
      .getByRole('link', { name: /start free.*trial|start.*14.*day/i })
      .first();
    await expect(cta).toBeVisible();
  });

  test('primary CTA links to /register @functional', async ({ homePage }) => {
    const cta = homePage.page
      .getByRole('link', { name: /start free.*trial|start.*14.*day/i })
      .first();
    const href = await cta.getAttribute('href');
    expect(href).toMatch(/\/register/);
  });

  test('"Request a Demo" button is present @functional', async ({ homePage }) => {
    const demoBtn = homePage.page
      .getByRole('link', { name: /request a demo|book a demo/i })
      .first();
    await expect(demoBtn).toBeVisible();
  });

  test('"Introducing AI Agents" banner is visible @functional', async ({ homePage }) => {
    const banner = homePage.page.getByText(/introducing ai agents?/i).first();
    await expect(banner).toBeVisible();
  });

  test('"Learn More" link on AI banner navigates to /ai @functional', async ({ homePage }) => {
    const learnMore = homePage.page.getByRole('link', { name: /learn more/i }).first();
    await expect(learnMore).toBeVisible();
    const href = await learnMore.getAttribute('href');
    expect(href).toMatch(/\/ai/);
  });

  test('integrations section shows partner logos @functional', async ({ homePage }) => {
    const logos = homePage.page.locator('img[alt]');
    const count = await logos.count();
    expect(count).toBeGreaterThan(3);
  });

  test('"View All Integrations" link is present and points to /integrations @functional', async ({ homePage }) => {
    const link = homePage.page.getByRole('link', { name: /view all integrations/i });
    await expect(link).toBeVisible();
    const href = await link.getAttribute('href');
    expect(href).toMatch(/\/integrations/);
  });

  test('"How It Works" section is present @functional', async ({ homePage }) => {
    const section = homePage.page.getByText(/how it works/i).first();
    await expect(section).toBeVisible();
  });

  test('testimonials section is present @functional', async ({ homePage }) => {
    // Site uses div-based quote text (no blockquote elements)
    const testimonial = homePage.page
      .getByText(/ease of use is fantastic|dramatically increased.*bottom line/i)
      .first();
    await expect(testimonial).toBeAttached();
  });

  test('footer is present @functional', async ({ homePage }) => {
    await expect(homePage.page.locator('footer')).toBeVisible();
  });
});
