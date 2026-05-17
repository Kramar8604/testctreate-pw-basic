import { Page, Locator } from "@playwright/test";

export class HeaderFragment {
    page: Page;
    navbar: Locator;
    cartIcon: Locator;
    cartQuantity: Locator;

    constructor(page: Page) {
        this.page = page;
        this.navbar = this.page.locator(".navbar");
        this.cartIcon = this.page.getByTestId("nav-cart");
        this.cartQuantity = this.page.getByTestId("cart-quantity");
    }

    async getUserName(): Promise<string> {
        return await this.navbar.innerText();
    }
}