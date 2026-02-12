import { test, expect, takeSnapshot } from "@chromatic-com/playwright";
import { MoisesLivePage } from '../../pages/moises-live/MoisesLivePage';

const URL_DO_APP = 'https://moises-live-ui-v3.vercel.app/v3';

const rawLocales = ["ar_SA", "de", "el", "en", "ru"];

for (const rawLocale of rawLocales) {
  const locale = rawLocale.replace('_', '-');

  test.describe(`Moises Live - ${locale}`, () => {
    test.use({ locale: locale });

    test('Validate layout and translations', async ({ page }, testInfo) => {

      const moises = new MoisesLivePage(page);
      
      await moises.goto();

      // Welcome screen
      await takeSnapshot(page, `01-Welcome`, testInfo);
      
      // Keep the generic selector (.first) that works in any language.
      await page.getByRole('button').first().click();

      // Main screen
      // Also use generic selector for switch (no specific name)
      await expect(page.getByRole('switch')).toBeVisible();

      await page.waitForTimeout(3000); 
      
      await takeSnapshot(page, `02-Main`, testInfo);
      
      await page.getByRole('switch').click();

      // Music Tab
      // Use the slider of the page (moises.sliders)
      await expect(moises.sliders.first()).toBeVisible({ timeout: 20000 });
      await page.waitForTimeout(1000); 
      
      await takeSnapshot(page, `04-Music`, testInfo);
            
      // Speech tab
      // switchToTab uses index (.nth), so it is safe for any language
      await moises.switchToTab(1);
      
      await expect(moises.sliders).toHaveCount(2, { timeout: 20000 });
      await page.waitForTimeout(1000); 
      
      await takeSnapshot(page, `05-Speech`, testInfo);
    });
  });
}