import { test, expect } from "@playwright/test";
import userCredentials from "../test_data/test.data.json";

test('Verify user can add product to cart', async ({ page }) => {
    await page.goto('/');
    
    await expect(page.getByTestId('nav-menu')).toBeVisible();

    const productName = userCredentials.products.slipJointPliers.name;
    
    await page.locator('.card').filter({ hasText: productName }).click();
    await page.waitForURL(/.*product/);

    await page.getByTestId('add-to-cart').click();

    const alert = page.getByRole('alert');
    await expect(alert).toContainText(userCredentials.products.slipJointPliers.successMessage);
    await expect(page.getByTestId('cart-quantity')).toHaveText('1');
});