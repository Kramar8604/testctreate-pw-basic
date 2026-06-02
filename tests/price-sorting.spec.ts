import { expect } from "@playwright/test";
import { test } from "../fixtures";
import { PriceSorting } from "../pages/home.page";

const priceOptions = [
    { name: 'Price (Low - High)', value: PriceSorting.LowToHigh },
    { name: 'Price (High - Low)', value: PriceSorting.HighToLow }
];

for (const option of priceOptions) {
    test(`Verify user can sort products by ${option.name}`, async ({ app }) => {
        await app.homePage.open();
        await app.homePage.waitForPricesLoad();
        await app.homePage.changeSorting(option.value);

        await expect.poll(async () => {
            const prices = await app.homePage.getProductPrices();
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