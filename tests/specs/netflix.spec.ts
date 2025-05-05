import { test } from '@playwright/test';
import { NetflixHomePage } from '../pages/NetflixHomePage';
import { NetflixLoginPage } from '../pages/NetflixLoginPage';

test.describe('Netflix Site UI - POM Version', () => {
  test('Validate homepage and login with invalid email', async ({ page }) => {
    const homePage = new NetflixHomePage(page);
    const loginPage = new NetflixLoginPage(page);

    await homePage.goto();
    await homePage.validateHomePage();
    await homePage.clickSignIn();

    await loginPage.validateLoginPage();
    await loginPage.submitInvalidEmail('invalid_email');
  });
});
