import { test, expect } from "@playwright/test";
import { HomePage } from "../page_objects/home.page";

test('Verify user can filter products by category', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.open();

    const hammerCheckbox = page.getByRole('checkbox', { name: 'Hammer' });
    await hammerCheckbox.waitFor({ state: 'visible' });
    await hammerCheckbox.check();

    await page.waitForResponse(r => r.url().includes('/products') && r.status() === 200);

    const products = page.locator('[data-test="product-name"]');
    await expect(products.first()).toBeVisible();

    const productNames = await products.allTextContents();
    
    expect(productNames.length).toBeGreaterThan(0);
    for (const name of productNames) {
        expect(name.toLowerCase()).toContain('hammer');
    }
});