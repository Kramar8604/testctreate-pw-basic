import { test, expect } from "@playwright/test";
import { LoginPage } from "../page_objects/login.page";
import { AccountPage } from "../page_objects/account.page";

test('Verify login as a user with valid credentials', async ({ page }) => {
 const loginPage = new LoginPage(page);
 const accountPage = new AccountPage(page);
 await page.goto('/auth/login');
 await loginPage.login('customer@practicesoftwaretesting.com', 'welcome01');
 await expect(page).toHaveURL('/account');
 await expect(accountPage.pageTitle).toHaveText('My account');
 await expect(page.locator('.navbar')).toContainText('Jane Doe');}
)
