import { expect } from "@playwright/test";
import { test } from "../fixtures";

test('Verify user can view product details', async ({ app, page }) => {
    await app.homePage.open();
    await app.homePage.clickProductByName('Combination Pliers');

    await expect(page).toHaveURL(/.*product/);
    
    await expect(app.productPage.productName).toHaveText('Combination Pliers');
    await expect(app.productPage.productPrice).toHaveText('14.15');
    await expect(app.productPage.addToCartBtn).toBeVisible();
});