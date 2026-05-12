import { test, expect } from "@playwright/test";

const priceOptions = [
    { name: 'Price (Low - High)', value: 'price,asc', expectedOrder: 'asc' },
    { name: 'Price (High - Low)', value: 'price,desc', expectedOrder: 'desc' }
];

for (const option of priceOptions) {
    test(`Verify user can sort products by ${option.name}`, async ({ page }) => {
        await page.goto('/');
        await page.locator('[data-test="sort"]').selectOption(option.value);
        await page.waitForResponse(r => r.url().includes('/products') && r.status() === 200);
        await page.waitForTimeout(3000);
        const priceTexts = await page.locator('[data-test="product-price"]').allTextContents();
        const prices = priceTexts.map(text => {
            return parseFloat(text.replace('$', '').trim());
        });
        const sortedPrices = [...prices].sort((a, b) => {
            if (option.expectedOrder === 'asc') {
                return a - b;
            } else {
                return b - a;
            }
        });
        expect(prices).toEqual(sortedPrices);
    });
}