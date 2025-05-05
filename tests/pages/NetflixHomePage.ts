import { Page, Locator, expect } from '@playwright/test';

export class NetflixHomePage {
  readonly page: Page;
  readonly signInButton: Locator;
  readonly watchAnywhereText: Locator;
  readonly heroSection: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.getByRole('link', { name: /Sign In/i });
    this.watchAnywhereText = page.locator('text=Watch anywhere');
    this.heroSection = page.locator('section').first();
  }

  async goto() {
    await this.page.goto('https://www.netflix.com');
  }

  async validateHomePage() {
    await expect(this.page).toHaveURL(/netflix\.com/);
    await expect(this.page).toHaveTitle(/Netflix/);
    await expect(this.signInButton).toBeVisible();
    await expect(this.watchAnywhereText).toContainText('Watch anywhere');
    await expect.poll(() => this.heroSection.getAttribute('class')).toMatch(/hero/i);
  }

  async clickSignIn() {
    await this.signInButton.click();
  }
}
