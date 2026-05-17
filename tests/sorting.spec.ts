import { test, expect } from "@playwright/test";
import { HomePage } from "../page_objects/home.page";

const nameOptions = [
    { name: 'Name (A - Z)', value: 'name,asc' },
    { name: 'Name (Z - A)', value: 'name,desc' }
];

for (const option of nameOptions) {
    test(`Verify user can sort products by ${option.name}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        await homePage.productNames.first().waitFor();

        await homePage.selectSort(option.value);
        await page.waitForResponse(r => r.url().includes('/products') && r.status() === 200);

        await expect.poll(async () => {
            const names = await homePage.getProductNames();
            const sorted = [...names].sort((a, b) => 
                option.value === 'name,asc' ? a.localeCompare(b) : b.localeCompare(a)
            );
            
            return JSON.stringify(names) === JSON.stringify(sorted);
        }, {
            timeout: 5000,
            message: `Products were not sorted by ${option.name}`
        }).toBe(true);
    });
}