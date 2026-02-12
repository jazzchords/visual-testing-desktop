import { Page, Locator, expect } from '@playwright/test';

export class MoisesLivePage {
  readonly page: Page;
  
  // Elements (Selectors)
  readonly btnContinue: Locator;
  readonly toggleAI: Locator;
  readonly btnDismissRating: Locator;
  readonly bannerGuest: Locator;
  readonly tabs: Locator;
  readonly sliders: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Mapping of elements
    this.btnContinue = page.getByRole('button', { name: 'Continue' });
    this.toggleAI = page.getByRole('switch', { name: 'Toggle Switch for AI Volume Control' });
    this.btnDismissRating = page.getByRole('button', { name: 'Dismiss' });
    this.bannerGuest = page.getByText('Connect your account');
    
    // Generic useful selectors
    this.tabs = page.getByRole('button').filter({ hasText: /Tabs/i }).or(page.getByRole('button')); 
    // Note: We use the .nth() strategy in the tests, here we leave generic
    
    this.sliders = page.getByRole('slider');
  }

    // --- ACTIONS (Methods) ---

  // Login
  async login(tokenValue: string) {
    await this.page.addInitScript((value) => {
        window.localStorage.setItem('moises:userToken', value);
    }, tokenValue);
  }

  // Go to the app
  async goto() {
    await this.page.goto('https://moises-live-ui-v3.vercel.app/v3');
    await this.page.waitForLoadState('networkidle');
  }

  // Handle Welcome/Rating modals
  async handlePopups() {
    if (await this.btnDismissRating.isVisible()) {
      await this.btnDismissRating.click();
    }
    if (await this.btnContinue.isVisible()) {
      await this.btnContinue.click();
    }
  }

  // Turn on the Toggle
  async enableAI() {
    await this.toggleAI.click();
  }

  async switchToTab(index: number) {
    // Click on the tab by index (0 = Music, 1 = Speech)
    // Use the robust strategy of getting all buttons and choosing by position
    await this.page.getByRole('button').nth(index).click();
  }

  async muteStem(stemName: string) {
    // Find the container and click on the mute button
    const container = this.page.locator('div').filter({ hasText: stemName }).first();
    const btnMute = container.getByRole('img', { name: new RegExp(`Stem ${stemName}`, 'i') });
    await btnMute.click();
  }
}