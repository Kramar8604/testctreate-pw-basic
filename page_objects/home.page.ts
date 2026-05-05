import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    combinationPliers = this.page.locator('.card', { hasText: 'Combination Pliers' });
  async open() {
    await this.page.goto('/');
  }
  async clickOnPliers() {
    await this.combinationPliers.click();
  }
}
