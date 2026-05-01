import { test, expect } from "@playwright/test";
import { HomePage } from "../page_objects/home.page";
import { ProductPage } from "../page_objects/product.page";

test('Verify user can view product details', async ({ page }) => {
  const homePage = new HomePage(page);
  const productPage = new ProductPage(page);

  await homePage.open();
  await homePage.clickOnPliers();
  await expect(page).toHaveURL(/.*product/);
  await expect(productPage.productName).toHaveText('Combination Pliers');
  await expect(productPage.productPrice).toHaveText('14.15');
  await expect(productPage.addToCartBtn).toBeVisible();
  await expect(productPage.addToFavoritesBtn).toBeVisible();
});
