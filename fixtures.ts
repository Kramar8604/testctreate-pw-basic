import { test as base, Page } from "@playwright/test";
import { App } from "./pages/allPages";
import testData from "./test_data/test.data.json";

type MyFixtures = {
    app: App;
    loggedInApp: App;
};

export const test = base.extend<MyFixtures>({
    app: async ({ page }: { page: Page }, use) => {
        const app = new App(page);
        await use(app);
    },

    loggedInApp: async ({ app }: { app: App }, use) => {
        await app.loginPage.open();
        await app.loginPage.login(testData.user.email, testData.user.password);
        await use(app);
    },
});

export { expect } from "@playwright/test";