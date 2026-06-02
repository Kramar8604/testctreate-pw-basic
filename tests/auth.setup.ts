import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import testData from "../test_data/test.data.json";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.open();
    await loginPage.login(testData.user.email, testData.user.password);

    await expect(page).toHaveURL("/account");

    await page.context().storageState({ path: authFile });
});