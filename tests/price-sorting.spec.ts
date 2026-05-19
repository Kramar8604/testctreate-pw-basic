import { test, expect } from "@playwright/test";
import { HomePage, PriceSorting } from "../page_objects/home.page";

const priceOptions = [
    { name: 'Price (Low - High)', value: PriceSorting.LowToHigh },
    { name: 'Price (High - Low)', value: PriceSorting.HighToLow }
];

for (const option of priceOptions) {
    test(`Verify user can sort products by ${option.name}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.waitForPricesLoad();
        await homePage.changeSorting(option.value);

        await expect.poll(async () => {
            const prices = await homePage.getProductPrices();
            const sorted = [...prices].sort((a, b) => 
                option.value === PriceSorting.LowToHigh ? a - b : b - a
            );
            return JSON.stringify(prices) === JSON.stringify(sorted);
        }, {
            timeout: 5000,
            message: `Products were not sorted by ${option.name}`
        }).toBe(true);
    });
}