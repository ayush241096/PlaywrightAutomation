import { test, expect } from '@playwright/test';

test.describe('Netflix Advanced UI Test', () => {

  test('Homepage UI and Navigation Assertions', async ({ page }) => {
    await page.goto('https://www.netflix.com');

    // 1. Assertion: URL
    await expect(page).toHaveURL(/netflix\.com/);

    // 2. Assertion: Title
    await expect(page).toHaveTitle(/Netflix/);

    // 3. Using default locator - get by role (accessibility)
    const signInButton = page.getByRole('link', { name: /Sign In/i });
    await expect(signInButton).toBeVisible();

    // 4. Dynamic locator using text content (partial)
    const watchAnywhereText = page.locator('text=Watch anywhere');
    await expect(watchAnywhereText).toContainText('Watch anywhere');

    // 5. Assert with advanced condition - Wait for element to contain specific class
    const heroSection = page.locator('section').first();
    await expect.poll(() => heroSection.getAttribute('class')).toMatch(/hero/i);

    // 6. Click on Sign In and assert navigation
    await signInButton.click();
    await expect(page).toHaveURL(/login/);
    await expect(page.locator('h1')).toContainText(/Sign In/i);

    // 7. Form input assertion
    const emailInput = page.locator('input[name="userLoginId"]');
    await expect(emailInput).toHaveAttribute('type', 'email');
    await expect(emailInput).toBeVisible();

    // 8. Fill invalid email and check error after clicking Next
    await emailInput.fill('invalid_email');
    await page.locator('button[type="submit"]').click();

    // 9. Advanced conditional: wait for error message to show up with polling
    const errorMsg = page.locator('.ui-message-contents');
    await expect.poll(() => errorMsg.isVisible(), {
      timeout: 5000
    }).toBeTruthy();

    await expect(errorMsg).toContainText(/valid email/i);
  });

});
