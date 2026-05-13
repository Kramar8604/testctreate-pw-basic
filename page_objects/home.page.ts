import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    combinationPliers = this.page.locator('.card', { hasText: 'Combination Pliers' });
    sortDropdown = this.page.locator('[data-test="sort"]');
    productPrices = this.page.locator('[data-test="product-price"]');
  async open() {
    await this.page.goto('/');
  }
  async clickOnPliers() {
    await this.combinationPliers.click();
  }
  async filterByCheckbox(name: string) {
    const checkbox = this.page.getByRole('checkbox', { name });
    await checkbox.waitFor({ state: 'visible' });
    await checkbox.check();
  } 
  async getProductNames() {
    return await this.page.locator('[data-test="product-name"]').allTextContents();
  } 
  async getProductPrices() {
    const priceTexts = await this.productPrices.allTextContents();
    return priceTexts.map(text => {
      return parseFloat(text.replace('$', '').trim());
    });
  }
  async selectSort(value: string) {
    await this.sortDropdown.selectOption(value);
  }
}
