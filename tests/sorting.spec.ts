import { test, expect } from "@playwright/test";
import { HomePage } from "../page_objects/home.page";

const sortingOptions = [
    { name: 'Name (A-Z)', value: 'name,asc' },
    { name: 'Name (Z-A)', value: 'name,desc' }
];

for (const option of sortingOptions) {
    test(`Verify user can sort products by ${option.name}`, async ({ page }) => {
        const homePage = new HomePage(page);

        await homePage.open();
        
        await homePage.selectSort(option.value);

        await page.waitForResponse(response => 
            response.url().includes('/products') && response.status() === 200
        );

        const productNames = await homePage.getProductNames();

        const sortedNames = [...productNames].sort((a, b) => {
            if (option.value === 'name,asc') {
                return a.localeCompare(b);
            } else {
                return b.localeCompare(a);
            }
        });

        expect(productNames).toEqual(sortedNames);
    });
}