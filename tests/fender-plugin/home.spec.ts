import { test, expect, takeSnapshot } from '@chromatic-com/playwright';

const URL_PLUGIN = 'https://fender-app-stage.vercel.app/';

test('Fender Plugin: Home (Guest)', async ({ page }, testInfo) => {
  
  await page.goto(URL_PLUGIN);
  
  // Validation of main elements (Radios)
  await expect(page.getByRole('radio', { name: /Separate Stems/i })).toBeVisible();
  await expect(page.getByRole('radio', { name: /Generate Stem/i })).toBeVisible();
  await expect(page.getByRole('radio', { name: /Convert Voice/i })).toBeVisible();

  // Validation of Login Button
  await expect(page.getByRole('button', { name: /Connect Account/i })).toBeVisible();

  // Take official photo
  await takeSnapshot(page, '01-Fender-Guest-Home', testInfo);

  // --- INTERACTION (Click Test) ---
  // Click on first radio
  await page.getByRole('radio', { name: /Separate Stems/i }).click();
  
  // Small pause to see the UI reaction
  await page.waitForTimeout(1000);

  // Take photo of selected state
  await takeSnapshot(page, '02-Fender-Guest-Clicked', testInfo);
});