import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";

export class CartPage extends BasePage {
    cartRows: Locator;
    cartProductTitle: Locator;
    cartProductPrice: Locator;
    cartTotalPrice: Locator;
    proceedToCheckoutBtn: Locator;

    constructor(page: Page) {
        super(page);
        this.cartRows = page.locator("table.table tbody tr");
        this.cartProductTitle = page.getByTestId("product-title");
        this.cartProductPrice = page.getByTestId("product-price");
        this.cartTotalPrice = page.getByTestId("cart-total");
        this.proceedToCheckoutBtn = page.getByTestId("proceed-1");
    }

    async open(): Promise<void> {
        await this.page.goto("/checkout");
    }

    async proceedToCheckout(): Promise<void> {
        await this.proceedToCheckoutBtn.click();
    }

    async getProductTitle(): Promise<string> {
    return (await this.cartProductTitle.innerText()).trim();
    }

    async getProductPrice(): Promise<string> {
        return await this.cartProductPrice.innerText();
    }

    async getTotalPrice(): Promise<string> {
        return await this.cartTotalPrice.innerText();
    }
}