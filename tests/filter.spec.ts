import { test, expect } from "@playwright/test";
import { HomePage } from "../page_objects/home.page";

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();
    await homePage.filterByCheckbox('Hammer');
    
    await page.waitForResponse(r => r.url().includes('/products') && r.status() === 200);

    const productNames = await homePage.getProductNames();

    expect(productNames.length).toBeGreaterThan(0);
    for (const name of productNames) {
        expect(name.toLowerCase()).toContain('hammer');
    }
});