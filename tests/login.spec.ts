import { test, expect } from "../fixtures";
import testData from "../test_data/test.data.json";

test("Verify user can login successfully", async ({ app }) => {
    await app.loginPage.open();
    await app.loginPage.login(testData.user.email, testData.user.password);
    await expect(app.accountPage.pageTitle).toHaveText("My account");
    const navbarText = await app.homePage.header.getUserName();
    expect(navbarText).toContain(testData.user.name);
});