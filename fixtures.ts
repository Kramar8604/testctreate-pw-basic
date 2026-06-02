import { test as base, expect } from "@playwright/test";
import { AllPages } from "./pages/allPages"; 
import * as userCredentials from "./test_data/test.data.json";
import { Page } from "@playwright/test";

type MyFixtures = {
    app: AllPages;
    loggedInApp: AllPages;
};

export const test = base.extend<MyFixtures>({
    app: async ({ page }: { page: Page }, use) => {
        const app = new AllPages(page);
        await use(app);
    },

    loggedInApp: async ({ app }: { app: AllPages }, use) => {
        await app.loginPage.open();
        await app.loginPage.login(userCredentials.user.email, userCredentials.user.password);
        await use(app);
    },
});

export { expect };