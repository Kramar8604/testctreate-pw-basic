import { test, expect } from "@playwright/test";
import { HomePage } from "../page_objects/home.page";

const sortingOptions = [
    { name: 'Name (A-Z)', value: 'name,asc', expectedOrder: 'asc'},
    { name: 'Name (Z-A)', value: 'name,desc', expectedOrder: 'desc' }
];

for (const option of sortingOptions) {
    test(`Verify user can sort products by ${option.name}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        await page.locator('[data-test="sort"]').selectOption(option.value);
        await page.waitForResponse(response => response.url().includes('/products') && response.status() === 200);

        await page.locator('[data-test="product-price"]').first().waitFor();
        await page.waitForTimeout(1000);

        const productNames = await page.locator('[data-test="product-name"]').allTextContents();
        const sortedNames = [...productNames].sort((a, b) => {
            if (option.expectedOrder === 'asc') {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        });

        expect(productNames).toEqual(sortedNames);
});
}