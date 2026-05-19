import { test, expect } from "@playwright/test";
import { HomePage } from "../page_objects/home.page";
import { ProductPage } from "../page_objects/product.page";
import userCredentials from "../test_data/test.data.json";

test('Verify user can add product to cart', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);

    await homePage.open();

    const productName = userCredentials.products.slipJointPliers.name;
    const productPrice = userCredentials.products.slipJointPliers.price;
    const successMsg = userCredentials.products.slipJointPliers.successMessage;

    await homePage.clickProductByName(productName);
    
    await expect(page).toHaveURL(/.*product/);
    await expect(productPage.productName).toHaveText(productName);
    await expect(productPage.productPrice).toHaveText(productPrice);

    const responsePromise = page.waitForResponse(r => r.url().includes('/carts') && r.status() === 200);
    await productPage.addToCart();
    await responsePromise;

    await expect(productPage.alert).toBeVisible();
    await expect(productPage.alert).toContainText(successMsg);
    await expect(homePage.header.cartQuantity).toHaveText('1');

    await homePage.header.cartIcon.click();

    await expect(page).toHaveURL(/.*checkout/);
    await expect(productPage.cartRows).toHaveCount(1);
    await expect(productPage.cartProductTitle).toHaveText(productName);
    await expect(productPage.proceedToCheckoutBtn).toBeVisible();
});