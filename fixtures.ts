import { test as base, Page, APIRequestContext } from "@playwright/test";
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

    loggedInApp: async ({ app, request }: { app: App, request: APIRequestContext }, use) => {
        const response = await request.post("https://api.practicesoftwaretesting.com/users/login", {
            data: {
                email: testData.user.email,
                password: testData.user.password,
            },
        });
        const body = await response.json();
        const token = body.access_token;

        await app.homePage.open();
        await app.page.evaluate((t) => {
            localStorage.setItem("auth-token", t);
        }, token);
        await app.page.reload();

        await use(app);
    },
});

export { expect } from "@playwright/test";