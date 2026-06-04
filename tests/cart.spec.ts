import { test, expect } from "../fixtures";
import testData from "../test_data/test.data.json";

test("Verify user can add product to cart", async ({ app }) => {
    const productName = testData.products.slipJointPliers.name;
    const productPrice = testData.products.slipJointPliers.price;
    const successMsg = testData.products.slipJointPliers.successMessage;

    await app.homePage.open();
    await app.homePage.clickProductByName(productName);

    await expect(app.productPage.productName).toHaveText(productName);
    await expect(app.productPage.productPrice).toHaveText(productPrice);

    await app.productPage.addToCart();

    await expect(app.productPage.alert).toBeVisible();
    await expect(app.productPage.alert).toContainText(successMsg);
    await expect(app.homePage.header.cartQuantity).toHaveText("1");

    await app.homePage.header.cartIcon.click();

    await expect(app.cartPage.cartRows).toHaveCount(1);
    await expect(app.cartPage.cartProductTitle).toHaveText(productName);
    await expect(app.cartPage.proceedToCheckoutBtn).toBeVisible();
});