import { test, expect } from "../fixtures";

test('Verify user can complete checkout', async ({ loggedInApp, page }) => {
    const app = loggedInApp;

    await app.homePage.open();
    await app.homePage.selectFirstProduct();
    await app.homePage.addProductToCart();

    await page.goto('/checkout');

    await app.checkoutPage.fillBillingAddress({
        postcode: '12345',
        houseNumber: '42',
        street: 'Test street',
        city: 'Frankfurt',
        state: 'Hessen'
    });
    
    await page.getByTestId('proceed-to-payment').click();

    await app.checkoutPage.fillPaymentDetails({
        number: '1111-1111-1111-1111',
        expiration: '12/26',
        cvv: '111',
        name: 'John Doe'
    });

    await expect(app.checkoutPage.successAlert).toBeVisible();
    await expect(app.checkoutPage.successAlert).toContainText('Payment was successful');
});