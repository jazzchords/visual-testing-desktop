import { test, expect, takeSnapshot } from '@chromatic-com/playwright';
import { MoisesLivePage } from '../../pages/moises-live/MoisesLivePage';


test('Full UI Flow (Guest) - With Page Object', async ({ page }, testInfo) => {

  const moises = new MoisesLivePage(page);
  
  // Access
  await moises.goto();

  // --- Welcome Screen ---
  await test.step('1. Welcome screen', async () => {
    // Validate that we are on the right screen
    await expect(page.getByText('Welcome to Moises Live')).toBeVisible();
    
    await takeSnapshot(page, '01-Guest-Welcome', testInfo);
  });

  // Use the mapped element in the class to click
  await moises.btnContinue.click();

  // --- 2. MAIN SCREEN (Toggle off) ---
  await test.step('2. Main screen', async () => {
    await expect(page.getByText('Turn on AI volume control')).toBeVisible({ timeout: 10000 });
    
    // Use the mapping of the banner
    await expect(moises.bannerGuest).toBeVisible({ timeout: 15000 });
    
    await takeSnapshot(page, '02-Guest-Main', testInfo);
  });
  
  // Turn on the Toggle using the class method
  await moises.enableAI();

  // --- 3. MUSIC TAB (Validação de Visitante) ---
  await test.step('3. Tab Music (Guest)', async () => {
    
    // Validate  banner
    await expect(moises.bannerGuest).toBeVisible();

    // Teste de Bloqueio de Mute (Using class method)
    // The method clicks on the mute button of Vocals
    await moises.muteStem('Vocals');
    
    await takeSnapshot(page, '03-Guest-Mute-Blocked', testInfo);

    // Slider Limit Test
    // Access the 'sliders' property of the class
    const slider = moises.sliders.first();
    await slider.hover();
    
    const box = await slider.boundingBox();
    if (box) {
        await slider.click({ position: { x: box.width * 0.1, y: box.height / 2 } });
    }
    
    await takeSnapshot(page, '03-Guest-Slider-Limited', testInfo);
  });

   // --- 4. SPEECH TAB ---
   await test.step('4. Aba Speech', async () => {
    
    // Use the class method to switch to the tab (Index 1 = Speech)
    await moises.switchToTab(1);
    
    await expect(page.getByText('Vocals')).toBeVisible({ timeout: 15000 });
    // Validate Other button with Regex
    await expect(page.getByRole('button', { name: /Other/i })).toBeVisible();
    
    await page.waitForTimeout(1000);
    
    await takeSnapshot(page, '04-Guest-Speech-Tab', testInfo);
  });
});