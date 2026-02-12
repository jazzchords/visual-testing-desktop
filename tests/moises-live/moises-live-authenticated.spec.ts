import { test, expect, takeSnapshot } from '@chromatic-com/playwright';
import { MoisesLivePage } from '../../pages/moises-live/MoisesLivePage';

const AUTH_VALUE = 'APP-a2ccbf21-69d5-41f1-89a0-bb61eadcf231';

test('Authenticated Flow - With Page Object', async ({ page }, testInfo) => {

    const moises = new MoisesLivePage(page);

  // Login 
  await moises.login(AUTH_VALUE);

  // Access and handle modals
  await moises.goto();
  await moises.handlePopups(); 

  // --- Main Screen ---
  await takeSnapshot(page, '01-Auth-Main', testInfo);

  // --- Music Tab ---
  await moises.enableAI(); // Turn on the Toggle
  await expect(moises.sliders.first()).toBeVisible({ timeout: 15000 });
  await expect(moises.bannerGuest).toBeHidden(); // Validate that banner disappeared
  
  await takeSnapshot(page, '02-Auth-Music', testInfo);

  // Mute Test (Vocals)
  await moises.muteStem('Vocals');
  await takeSnapshot(page, '02b-Auth-Music-VocalsMuted', testInfo);

  // --- Speech Tab ---
  await moises.switchToTab(1); // Go to Speech tab
  await expect(moises.sliders).toHaveCount(2); // Validate loading
  await page.waitForTimeout(1000);
  
  await takeSnapshot(page, '03-Auth-Speech', testInfo);

  // Mute Test (Vocals + Other)
  await moises.muteStem('Vocals');
  await moises.muteStem('Other');
  
  await takeSnapshot(page, '03b-Auth-Speech-AllMuted', testInfo);
});