import { expect } from "@playwright/test";
import { test } from "../fixtures";
import userCredentials from "../test_data/test.data.json";

test('Verify user can add product to cart', async ({ app, page }) => {
    await app.homePage.open();

    const productName = userCredentials.products.slipJointPliers.name;
    const productPrice = userCredentials.products.slipJointPliers.price;
    const successMsg = userCredentials.products.slipJointPliers.successMessage;

    await app.homePage.clickProductByName(productName);
    
    await expect(page).toHaveURL(/.*product/);
    await expect(app.productPage.productName).toHaveText(productName);
    await expect(app.productPage.productPrice).toHaveText(productPrice);

    const responsePromise = page.waitForResponse(r => r.url().includes('/carts') && r.status() === 200);
    await app.productPage.addToCart();
    await responsePromise;

    await expect(app.productPage.alert).toBeVisible();
    await expect(app.productPage.alert).toContainText(successMsg);
    await expect(app.homePage.header.cartQuantity).toHaveText('1');

    await app.homePage.header.cartIcon.click();

    await expect(page).toHaveURL(/.*checkout/);
    await expect(app.productPage.cartRows).toHaveCount(1);
    await expect(app.productPage.cartProductTitle).toHaveText(productName);
    await expect(app.productPage.proceedToCheckoutBtn).toBeVisible();
});