import { test, expect } from "@playwright/test";
import userCredentials from "../test_data/test.data.json";

test('Verify user can add product to cart', async ({ page }) => {
    await page.goto('/');

    const productName = userCredentials.products.slipJointPliers.name;
    const productPrice = userCredentials.products.slipJointPliers.price;
    await page.locator('.card').filter({ hasText: productName }).click();
    await page.waitForURL(/.*product/);
    const nameLocator = page.getByTestId('product-name');
    await expect(nameLocator).toHaveText(productName);
    await expect(page.getByText(productPrice).first()).toBeVisible();
    await page.getByTestId('add-to-cart').click();
    const alert = page.getByRole('alert');
    await expect(alert).toContainText(userCredentials.products.slipJointPliers.successMessage);
    await expect(page.getByTestId('cart-quantity')).toHaveText('1');
});