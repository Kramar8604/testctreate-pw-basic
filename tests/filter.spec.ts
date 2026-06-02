import { expect } from "@playwright/test";
import { test } from "../fixtures";
import { PowerTools } from "../pages/home.page";

test('Verify user can filter products by category', async ({ app }) => {
    await app.homePage.open();
    await app.homePage.filterByCheckbox(PowerTools.Sander);

    await expect.poll(async () => {
        const productNames = await app.homePage.getProductNames();
        return productNames.every(name => name.toLowerCase().includes('sander'));
    }, {
        timeout: 5000,
        message: 'Products were not filtered by Sander'
    }).toBe(true);
});