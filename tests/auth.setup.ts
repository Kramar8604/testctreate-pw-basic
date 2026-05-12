import { test as setup, expect } from '@playwright/test';
import userCredentials from "../test_data/test.data.json";

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.locator('#email').fill(userCredentials.user.email);
  await page.locator('#password').fill(userCredentials.user.password);
  await page.locator('.btnSubmit').click();
  await expect(page.locator('.navbar')).toContainText(userCredentials.user.name);
  await page.context().storageState({ path: authFile });
});