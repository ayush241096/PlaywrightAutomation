import { Page, Locator, expect } from '@playwright/test';

export class NetflixLoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly submitButton: Locator;
  readonly errorMsg: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[name="userLoginId"]');
    this.submitButton = page.locator('button[type="submit"]');
    this.errorMsg = page.locator('.ui-message-contents');
  }

  async validateLoginPage() {
    await expect(this.page).toHaveURL(/login/);
    await expect(this.page.locator('h1')).toContainText(/Sign In/i);
    await expect(this.emailInput).toBeVisible();
    await expect(this.emailInput).toHaveAttribute('type', 'email');
  }

  async submitInvalidEmail(email: string) {
    await this.emailInput.fill(email);
    await this.submitButton.click();
    await expect.poll(() => this.errorMsg.isVisible()).toBeTruthy();
    await expect(this.errorMsg).toContainText(/valid email/i);
  }
}
