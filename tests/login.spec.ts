import { test, expect } from "@playwright/test";
import { LoginPage } from "../page_objects/login.page";
import { AccountPage } from "../page_objects/account.page";
import { HomePage } from "../page_objects/home.page";
import testData from "../test_data/test.data.json";

test("Verify user can login successfully", async ({ page }) => {
    const loginPage = new LoginPage(page);
    const accountPage = new AccountPage(page);
    const homePage = new HomePage(page);

    await loginPage.open();
    await loginPage.login(testData.user.email, testData.user.password);

    await expect(page).toHaveURL("/account");
    await expect(accountPage.pageTitle).toHaveText("My account");
    
    const navbarText = await homePage.header.getUserName();
    expect(navbarText).toContain(testData.user.name);
});
