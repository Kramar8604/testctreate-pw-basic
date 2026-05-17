import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class HomePage extends BasePage {
    sortDropdown: Locator;
    productPrices: Locator;
    productNames: Locator;

    constructor(page: Page) {
        super(page);
        this.sortDropdown = this.page.getByTestId("sort");
        this.productPrices = this.page.getByTestId("product-price");
        this.productNames = this.page.getByTestId("product-name");
    }

    async open(): Promise<void> {
        await this.page.goto("/");
    }

    async selectSort(value: string): Promise<void> {
        await this.sortDropdown.selectOption(value);
    }

    async getProductPrices(): Promise<number[]> {
        const priceTexts = await this.productPrices.allInnerTexts();
        return priceTexts.map(text => parseFloat(text.replace("$", "")));
    }

    async getProductNames(): Promise<string[]> {
        return await this.productNames.allTextContents();
    }

    async clickProduct(name: string): Promise<void> {
        await this.page.locator(".card").filter({ hasText: name }).click();
    }

    async filterByCheckbox(name: string): Promise<void> {
        await this.page.getByLabel(name).check();
    }
}
