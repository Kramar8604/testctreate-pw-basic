import { test, expect } from "../fixtures";
import testData from "../test_data/test.data.json";

test("Verify logged in user can complete a purchase", async ({ loggedInApp }) => {
    await loggedInApp.homePage.open();
    await loggedInApp.homePage.waitForPricesLoad();

    const productNames = await loggedInApp.homePage.getProductNames();
    const productPrices = await loggedInApp.homePage.getProductPrices();

    const firstProductName = productNames[0];
    const firstProductPrice = productPrices[0];

    await loggedInApp.homePage.clickProductByName(firstProductName);
    await loggedInApp.productPage.addToCart();
    await expect(loggedInApp.productPage.alert).toBeVisible();

    await loggedInApp.homePage.header.cartIcon.click();

    const cartTitle = await loggedInApp.cartPage.getProductTitle();
    const cartPrice = await loggedInApp.cartPage.getProductPrice();
    const cartTotal = await loggedInApp.cartPage.getTotalPrice();

    expect(cartTitle).toBe(firstProductName);
    expect(cartPrice).toContain(firstProductPrice.toFixed(2));
    expect(cartTotal).toContain(firstProductPrice.toFixed(2));

    await loggedInApp.cartPage.proceedToCheckout();

    await expect(loggedInApp.checkoutPage.proceedToCheckoutBtn2).toBeVisible();
    await loggedInApp.checkoutPage.proceedAsLoggedIn();

    await loggedInApp.checkoutPage.fillBillingAddress(
        testData.billingAddress.country,
        testData.billingAddress.postcode,
        testData.billingAddress.houseNumber,
        testData.billingAddress.street,
        testData.billingAddress.city,
        testData.billingAddress.state
    );

    const today = new Date();
    today.setMonth(today.getMonth() + 3);
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = String(today.getFullYear());
    const expirationDate = `${month}/${year}`;

    await loggedInApp.checkoutPage.payByCreditCard(
        testData.creditCard.number,
        expirationDate,
        testData.creditCard.cvv,
        testData.creditCard.holderName
    );

    await expect(loggedInApp.checkoutPage.paymentSuccessAlert).toBeVisible();
    await expect(loggedInApp.checkoutPage.paymentSuccessAlert).toContainText("Payment was successful");
});