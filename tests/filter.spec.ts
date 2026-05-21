import { test, expect } from "@playwright/test";
import { HomePage, PowerTools } from "../page_objects/home.page";

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.filterByCheckbox(PowerTools.Sander);

    await expect.poll(async () => {
        const productNames = await homePage.getProductNames();
        return productNames.every(name => name.toLowerCase().includes('sander'));
    }, {
        timeout: 5000,
        message: 'Products were not filtered by Sander'
    }).toBe(true);
});