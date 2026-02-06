import { test, expect, takeSnapshot } from '@chromatic-com/playwright';

const URL_DO_APP = 'https://moises-live-ui-v3.vercel.app/v3';

test.afterEach(async ({ page }) => {
    //clean localStorage
    await page.evaluate(() => window.localStorage.clear());
  });

test('Rating screen validation', async ({ page }, testInfo) => {
  

  await page.addInitScript(() => {
      window.localStorage.setItem('moises:showReviewApp', 'true');
  });

  await page.goto(URL_DO_APP);
  await page.waitForLoadState('networkidle');

  
  await page.waitForTimeout(2000); 

  await takeSnapshot(page, '06-Rating-Modal', testInfo);
});