import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export enum HandTools {
    Hammer = 'Hammer',
    Pliers = 'Pliers'
}

export enum PowerTools {
    Sander = 'Sander',
    Grinder = 'Grinder'
}

export enum Other {
    Rent = 'Rent'
}

export enum PriceSorting {
    HighToLow = 'price,desc',
    LowToHigh = 'price,asc'
}

export enum NameSorting {
    AtoZ = 'name,asc',
    ZtoA = 'name,desc'
}

export class HomePage extends BasePage {
    sortDropdown: Locator;
    productPrices: Locator;
    productNames: Locator;
    categoryCheckbox: (name: string) => Locator;

    constructor(page: Page) {
        super(page);
        this.sortDropdown = page.getByTestId("sort");
        this.productPrices = page.getByTestId("product-price");
        this.productNames = page.locator(".card-title");
        this.categoryCheckbox = (name: string) => page.getByLabel(name);
    }

    async open(): Promise<void> {
        await this.page.goto("/");
    }

    async selectFirstProduct(): Promise<void> {
        const firstCard = this.page.locator('.card').first();
        await firstCard.locator('.card-title').waitFor({ state: 'visible' });
        await firstCard.click();
    }

    async addProductToCart(): Promise<void> {
        await this.page.locator('//button[contains(text(), "Add to Cart")]').click();
    }

    async clickProductByName(name: string): Promise<void> {
        await this.page.locator('.card-title', { hasText: name }).click();
    }

    async getProductNames(): Promise<string[]> {
        const names = await this.productNames.allTextContents();
        return names.map(name => name.trim());
    }

    async getProductPrices(): Promise<number[]> {
        const prices = await this.productPrices.allInnerTexts();
        return prices.map(p => parseFloat(p.replace("$", "")));
    }

    async waitForPricesLoad(): Promise<void> {
        await this.productPrices.first().waitFor();
    }

    async filterByCheckbox(name: string): Promise<void> {
        await this.categoryCheckbox(name).check();
        await this.page.waitForResponse(r => r.url().includes("/products") && r.status() === 200);
    }

    async changeSorting(option: PriceSorting): Promise<void> {
        await this.sortDropdown.selectOption(option);
        await this.page.waitForResponse(r => r.url().includes("/products") && r.status() === 200);
    }

    async changeNameSorting(option: NameSorting): Promise<void> {
        await this.sortDropdown.selectOption(option);
        await this.page.waitForResponse(r => r.url().includes("/products") && r.status() === 200);
    }
}
