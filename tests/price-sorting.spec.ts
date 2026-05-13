import { test, expect } from "@playwright/test";
import { HomePage } from "../page_objects/home.page";

const priceOptions = [
    { name: 'Price (Low - High)', value: 'price,asc' },
    { name: 'Price (High - Low)', value: 'price,desc' }
];

for (const option of priceOptions) {
    test(`Verify user can sort products by ${option.name}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.productPrices.first().waitFor();
        await homePage.selectSort(option.value);
        await page.waitForURL(new RegExp(option.value));
        await page.waitForResponse(r => r.url().includes('/products') && r.status() === 200);
        await expect.poll(async () => {
            const prices = await homePage.getProductPrices();
            const sorted = [...prices].sort((a, b) => 
                option.value === 'price,asc' ? a - b : b - a
            );
            return JSON.stringify(prices) === JSON.stringify(sorted);
        }, {
            timeout: 5000,
        }).toBe(true);
        const finalPrices = await homePage.getProductPrices();
        const expectedOrder = [...finalPrices].sort((a, b) => 
            option.value === 'price,asc' ? a - b : b - a
        );
        expect(finalPrices).toEqual(expectedOrder);
    });
}