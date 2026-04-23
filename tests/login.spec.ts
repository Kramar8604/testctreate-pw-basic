import { test, expect } from "@playwright/test";

test('Verify login as a user with valid credentials', async ({ page }) => {
  await page.goto('https://practicesoftwaretesting.com/auth/login');
  await page.fill('[data-test="email"]', 'customer@practicesoftwaretesting.com');
  await page.fill('[data-test="password"]', 'welcome01');
  await page.click('[data-test="login-submit"]');
  await expect(page).toHaveURL('https://practicesoftwaretesting.com/account');
  await expect(page.getByTestId('page-title')).toHaveText('My account');
  await expect(page.locator('.navbar')).toContainText('Jane Doe');
});